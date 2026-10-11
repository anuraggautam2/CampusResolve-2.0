'use client';

import { 
  Complaint, 
  Status, 
  Priority, 
  Category, 
  TargetAuthority, 
  EscalationLevel,
  TimelineEvent 
} from '@/types/complaint';
import { INITIAL_COMPLAINTS } from './mock-data';
import { getAuthority } from './authorities';

const STORAGE_KEY = 'campus_resolve_2_complaints_v1';

export function getStoredComplaints(): Complaint[] {
  if (typeof window === 'undefined') {
    return INITIAL_COMPLAINTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMPLAINTS));
      return INITIAL_COMPLAINTS;
    }
    return JSON.parse(raw) as Complaint[];
  } catch (err) {
    console.error('Failed to parse stored complaints', err);
    return INITIAL_COMPLAINTS;
  }
}

export function saveStoredComplaints(complaints: Complaint[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    window.dispatchEvent(new Event('campus_resolve_storage_update'));
  } catch (err) {
    console.error('Failed to save complaints to localStorage', err);
  }
}

export function resetDemoData(): Complaint[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMPLAINTS));
    window.dispatchEvent(new Event('campus_resolve_storage_update'));
  }
  return INITIAL_COMPLAINTS;
}

export interface CreateComplaintInput {
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  targetAuthority: TargetAuthority;
  whyChosenAuthority: string;
  isAnonymous: boolean;
  studentName?: string;
  studentRollNo?: string;
  studentEmail?: string;
  studentDepartment?: string;
}

export function createNewComplaint(input: CreateComplaintInput): Complaint {
  const current = getStoredComplaints();
  const authority = getAuthority(input.targetAuthority);
  const isDirectSuperAdmin = authority.level === 'SUPER_ADMIN_LEVEL';

  const ticketNumber = `CR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const initialTimeline: TimelineEvent[] = [
    {
      id: `tl-${Date.now()}-1`,
      timestamp: now,
      actor: input.isAnonymous ? `Anonymous Student (${ticketNumber})` : `${input.studentName} (${input.studentRollNo})`,
      actorRole: 'Student',
      action: 'Complaint Submitted',
      note: `Routed to ${authority.name} (${authority.level === 'SUPER_ADMIN_LEVEL' ? 'Super Admin / Apex Org' : 'College Level'}). Reason: "${input.whyChosenAuthority}"`,
      level: isDirectSuperAdmin ? 'SUPER_ADMIN_LEVEL' : 'COLLEGE_LEVEL'
    },
    {
      id: `tl-${Date.now()}-2`,
      timestamp: new Date(Date.now() + 1000).toISOString(),
      actor: 'Campus Resolve Dispatch',
      actorRole: 'System',
      action: isDirectSuperAdmin ? 'Apex Priority Escalation Dispatched' : 'Standard College Intake Assigned',
      note: `Tracking code generated. SLA target: ${authority.typicalResponseHours} hours response time.`,
      level: isDirectSuperAdmin ? 'SUPER_ADMIN_LEVEL' : 'COLLEGE_LEVEL'
    }
  ];

  const newTicket: Complaint = {
    id: `cmp-${Date.now()}`,
    ticketNumber,
    title: input.title,
    description: input.description,
    category: input.category,
    priority: input.priority,
    status: isDirectSuperAdmin ? 'IN_REVIEW_SUPER_ADMIN' : 'PENDING_COLLEGE_REVIEW',
    currentLevel: isDirectSuperAdmin ? 'SUPER_ADMIN_LEVEL' : 'COLLEGE_LEVEL',
    isAnonymous: input.isAnonymous,
    studentName: input.isAnonymous ? undefined : input.studentName,
    studentRollNo: input.isAnonymous ? undefined : input.studentRollNo,
    studentEmail: input.isAnonymous ? undefined : input.studentEmail,
    studentDepartment: input.isAnonymous ? 'Confidential' : input.studentDepartment,
    targetAuthority: input.targetAuthority,
    whyChosenAuthority: input.whyChosenAuthority,
    createdAt: now,
    updatedAt: now,
    timeline: initialTimeline
  };

  const updated: Complaint[] = [newTicket, ...current];
  saveStoredComplaints(updated);
  return newTicket;
}

export function updateComplaintStatus(
  id: string,
  newStatus: Status,
  note: string,
  actor: string,
  actorRole: 'College Admin' | 'Super Admin' | 'Student'
): Complaint[] {
  const current = getStoredComplaints();
  const updated: Complaint[] = current.map(item => {
    if (item.id !== id) return item;

    const now = new Date().toISOString();
    const event: TimelineEvent = {
      id: `tl-${Date.now()}`,
      timestamp: now,
      actor,
      actorRole,
      action: `Status changed to ${newStatus.replace(/_/g, ' ')}`,
      note,
      level: item.currentLevel
    };

    return {
      ...item,
      status: newStatus,
      updatedAt: now,
      timeline: [...item.timeline, event]
    };
  });

  saveStoredComplaints(updated);
  return updated;
}

export function escalateComplaintToSuperAdmin(
  id: string,
  escalationReason: string,
  actor: string,
  actorRole: 'College Admin' | 'Student'
): Complaint[] {
  const current = getStoredComplaints();
  const updated: Complaint[] = current.map(item => {
    if (item.id !== id) return item;

    const now = new Date().toISOString();
    const event: TimelineEvent = {
      id: `tl-${Date.now()}`,
      timestamp: now,
      actor,
      actorRole,
      action: 'Escalated to Super Admin / Higher Organization',
      note: `Case transferred to Level 2 Apex Authority. Reason: ${escalationReason}`,
      level: 'SUPER_ADMIN_LEVEL'
    };

    return {
      ...item,
      status: 'ESCALATED_TO_SUPER_ADMIN',
      currentLevel: 'SUPER_ADMIN_LEVEL',
      escalationReason,
      escalatedAt: now,
      escalatedBy: `${actor} (${actorRole})`,
      updatedAt: now,
      timeline: [...item.timeline, event]
    };
  });

  saveStoredComplaints(updated);
  return updated;
}

export function resolveComplaint(
  id: string,
  resolutionSummary: string,
  resolvedBy: string,
  actorRole: 'College Admin' | 'Super Admin'
): Complaint[] {
  const current = getStoredComplaints();
  const updated: Complaint[] = current.map(item => {
    if (item.id !== id) return item;

    const now = new Date().toISOString();
    const event: TimelineEvent = {
      id: `tl-${Date.now()}`,
      timestamp: now,
      actor: resolvedBy,
      actorRole,
      action: 'Marked Resolved',
      note: `Resolution Details: ${resolutionSummary}`,
      level: item.currentLevel
    };

    return {
      ...item,
      status: 'RESOLVED',
      resolutionSummary,
      resolvedAt: now,
      resolvedBy: `${resolvedBy} (${actorRole})`,
      updatedAt: now,
      timeline: [...item.timeline, event]
    };
  });

  saveStoredComplaints(updated);
  return updated;
}

export function submitStudentRating(
  id: string,
  rating: number,
  feedback: string,
  studentName: string
): Complaint[] {
  const current = getStoredComplaints();
  const updated: Complaint[] = current.map(item => {
    if (item.id !== id) return item;

    const now = new Date().toISOString();
    const event: TimelineEvent = {
      id: `tl-${Date.now()}`,
      timestamp: now,
      actor: studentName,
      actorRole: 'Student',
      action: `Student Satisfaction Rated ${rating}/5 Stars`,
      note: feedback ? `Review: "${feedback}"` : 'Rating recorded without additional commentary.',
      level: item.currentLevel
    };

    return {
      ...item,
      studentRating: rating,
      studentFeedback: feedback,
      updatedAt: now,
      timeline: [...item.timeline, event]
    };
  });

  saveStoredComplaints(updated);
  return updated;
}
