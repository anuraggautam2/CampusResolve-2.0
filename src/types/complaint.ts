export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type Status = 
  | 'PENDING_COLLEGE_REVIEW' 
  | 'IN_PROGRESS_COLLEGE' 
  | 'ESCALATED_TO_SUPER_ADMIN' 
  | 'IN_REVIEW_SUPER_ADMIN' 
  | 'RESOLVED' 
  | 'REJECTED';

export type EscalationLevel = 'COLLEGE_LEVEL' | 'SUPER_ADMIN_LEVEL';

export type TargetAuthority = 
  // College Level Authorities
  | 'HOD_COMPUTER_SCIENCE'
  | 'HOD_MECHANICAL'
  | 'HOD_ELECTRICAL'
  | 'HOSTEL_WARDEN'
  | 'EXAM_CELL_CONTROLLER'
  | 'MESS_COMMITTEE'
  | 'CAMPUS_SECURITY_CHIEF'
  | 'LIBRARY_ADMIN'
  // Super Admin / Higher Organization Authorities
  | 'UNIVERSITY_VICE_CHANCELLOR'
  | 'CENTRAL_ANTI_RAGGING_COUNCIL'
  | 'BOARD_OF_OMBUDSMAN'
  | 'EXTERNAL_ETHICS_COMMITTEE'
  | 'HIGHER_EDUCATION_DIRECTORATE';

export interface AuthorityMeta {
  id: TargetAuthority;
  name: string;
  level: EscalationLevel;
  department: string;
  description: string;
  typicalResponseHours: number;
}

export type Category = 
  | 'Academic & Grading'
  | 'Hostel & Residential'
  | 'Ragging & Harassment'
  | 'Sanitation & Food Quality'
  | 'Campus Infrastructure & IT'
  | 'Fee & Financial Discrepancy'
  | 'Discrimination & Code of Conduct';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: 'Student' | 'College Admin' | 'Super Admin' | 'System';
  action: string;
  note?: string;
  level: EscalationLevel;
}

export interface Complaint {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: Status;
  currentLevel: EscalationLevel;
  
  // Student Context
  isAnonymous: boolean;
  studentName?: string;
  studentRollNo?: string;
  studentEmail?: string;
  studentDepartment?: string;
  
  // Targeting
  targetAuthority: TargetAuthority;
  whyChosenAuthority: string; // "Why student chose this specific authority"
  
  // Escalation Metadata
  escalationReason?: string;
  escalatedAt?: string;
  escalatedBy?: string;
  
  // Resolution & Feedback
  resolutionSummary?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  studentRating?: number; // 1 to 5
  studentFeedback?: string;
  
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
}

export type UserRole = 'STUDENT' | 'COLLEGE_ADMIN' | 'SUPER_ADMIN';
