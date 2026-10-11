import { Complaint } from '@/types/complaint';

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'cmp-101',
    ticketNumber: 'CR-2026-0891',
    title: 'Severe Ragging & Late Night Coercion in Block-D Hostel',
    description: 'Senior students from 4th year are forcing 1st-year students to assemble at Block D terrace past 1:00 AM under threat of academic retaliation. The local floor guard was notified twice but dismissed it as "orientation bonding". This is a direct violation of university zero-tolerance anti-ragging policy.',
    category: 'Ragging & Harassment',
    priority: 'CRITICAL',
    status: 'IN_REVIEW_SUPER_ADMIN',
    currentLevel: 'SUPER_ADMIN_LEVEL',
    isAnonymous: true,
    targetAuthority: 'CENTRAL_ANTI_RAGGING_COUNCIL',
    whyChosenAuthority: 'Directly bypassed college hostel staff because local warden failed to act after 2 prior oral notices, and confidentiality is mandatory to protect junior students.',
    createdAt: '2026-10-10T14:30:00.000Z',
    updatedAt: '2026-10-11T09:15:00.000Z',
    timeline: [
      {
        id: 't-1',
        timestamp: '2026-10-10T14:30:00.000Z',
        actor: 'Anonymous Student (Roll #ANON-3091)',
        actorRole: 'Student',
        action: 'Complaint Filed',
        note: 'Submitted directly to University Anti-Ragging Council under Anonymous Protection Protocol.',
        level: 'SUPER_ADMIN_LEVEL'
      },
      {
        id: 't-2',
        timestamp: '2026-10-10T14:31:00.000Z',
        actor: 'Campus Resolve Dispatch Engine',
        actorRole: 'System',
        action: 'Automated Critical SLA Alert',
        note: 'High-priority notification dispatched to Chief Ombudsman and Apex Disciplinary Council (6-hour SLA triggered).',
        level: 'SUPER_ADMIN_LEVEL'
      },
      {
        id: 't-3',
        timestamp: '2026-10-10T16:45:00.000Z',
        actor: 'Dr. Evelyn Vance (Chief Anti-Ragging Officer)',
        actorRole: 'Super Admin',
        action: 'Formal Inquiry Opened & Security Lockdown Ordered',
        note: 'Dispatched autonomous inspection team. Warden summoned for urgent statutory explanation.',
        level: 'SUPER_ADMIN_LEVEL'
      }
    ]
  },
  {
    id: 'cmp-102',
    ticketNumber: 'CR-2026-0842',
    title: 'Unexplained 30% Marks Deduction in Discrete Mathematics Midterm',
    description: 'Whole Section C experienced a flat 30% marks reduction due to an alleged coding script error in the automated evaluation portal. Despite submitting manual re-verification proof showing correct solutions, the department coordinator refused re-evaluation without payment of an unofficial verification fee.',
    category: 'Academic & Grading',
    priority: 'HIGH',
    status: 'ESCALATED_TO_SUPER_ADMIN',
    currentLevel: 'SUPER_ADMIN_LEVEL',
    isAnonymous: false,
    studentName: 'Aarav Sharma',
    studentRollNo: 'CS23B1044',
    studentEmail: 'aarav.sharma@campus.edu',
    studentDepartment: 'Computer Science & Engineering',
    targetAuthority: 'EXAM_CELL_CONTROLLER',
    whyChosenAuthority: 'Originally submitted to College Examination Cell for recalculation. Now escalated because College Admin sat on it for 10 days with no tangible response.',
    escalationReason: 'College Exam Cell exceeded 7-day SLA without written response; student invoked Ombudsman Escalation Clause.',
    escalatedAt: '2026-10-10T11:20:00.000Z',
    escalatedBy: 'College Admin / Auto-SLA Trigger',
    createdAt: '2026-09-30T10:00:00.000Z',
    updatedAt: '2026-10-10T11:20:00.000Z',
    timeline: [
      {
        id: 't-201',
        timestamp: '2026-09-30T10:00:00.000Z',
        actor: 'Aarav Sharma (CS23B1044)',
        actorRole: 'Student',
        action: 'Ticket Created',
        note: 'Submitted to College Exam Controller with attached answer script PDFs.',
        level: 'COLLEGE_LEVEL'
      },
      {
        id: 't-202',
        timestamp: '2026-10-02T11:00:00.000Z',
        actor: 'Prof. K. Verma (Exam Cell Admin)',
        actorRole: 'College Admin',
        action: 'Under Department Scrutiny',
        note: 'Forwarded to evaluating instructor for review.',
        level: 'COLLEGE_LEVEL'
      },
      {
        id: 't-203',
        timestamp: '2026-10-10T11:20:00.000Z',
        actor: 'System Automated Monitor',
        actorRole: 'System',
        action: 'Escalated to Super Admin Level (Ombudsman)',
        note: 'Ticket breached College Level 7-day SLA resolution window. Case automatically reassigned to State Ombudsman Tribunal.',
        level: 'SUPER_ADMIN_LEVEL'
      }
    ]
  },
  {
    id: 'cmp-103',
    ticketNumber: 'CR-2026-0790',
    title: 'Severe Drinking Water Contamination in Aryabhata Hostel 2',
    description: 'The reverse-osmosis water cooler on 2nd floor has been dispensing turbid, foul-smelling water for 4 days. Three students have reported severe stomach infection. The filter replacement log indicates last maintenance was 14 months ago.',
    category: 'Hostel & Residential',
    priority: 'HIGH',
    status: 'IN_PROGRESS_COLLEGE',
    currentLevel: 'COLLEGE_LEVEL',
    isAnonymous: false,
    studentName: 'Priya Nambiar',
    studentRollNo: 'EE22B088',
    studentEmail: 'priya.n@campus.edu',
    studentDepartment: 'Electrical Engineering',
    targetAuthority: 'HOSTEL_WARDEN',
    whyChosenAuthority: 'Hostel Warden has direct budget sanction power for hostel maintenance and emergency water filter replacement.',
    createdAt: '2026-10-09T08:15:00.000Z',
    updatedAt: '2026-10-10T16:00:00.000Z',
    timeline: [
      {
        id: 't-301',
        timestamp: '2026-10-09T08:15:00.000Z',
        actor: 'Priya Nambiar (EE22B088)',
        actorRole: 'Student',
        action: 'Ticket Created',
        note: 'Attached photos of turbid water sample and clinic prescription.',
        level: 'COLLEGE_LEVEL'
      },
      {
        id: 't-302',
        timestamp: '2026-10-09T14:30:00.000Z',
        actor: 'Col. R. Menon (Chief Hostel Warden)',
        actorRole: 'College Admin',
        action: 'Investigation In Progress',
        note: 'Emergency maintenance vendor dispatched. Mineral water jars deployed on floor 2 as interim relief.',
        level: 'COLLEGE_LEVEL'
      }
    ]
  },
  {
    id: 'cmp-104',
    ticketNumber: 'CR-2026-0655',
    title: 'Digital Library IEEE Xplore & ACM Portal Credential Invalidation',
    description: 'Postgraduate research students are unable to log into the institutional proxy for IEEE Xplore and ACM Digital Library. Due dates for conference paper submissions are in 3 days.',
    category: 'Campus Infrastructure & IT',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    currentLevel: 'COLLEGE_LEVEL',
    isAnonymous: false,
    studentName: 'Vikramaditya Rao',
    studentRollNo: 'CS24M012',
    studentEmail: 'vikram.rao@campus.edu',
    studentDepartment: 'Computer Science & Engineering',
    targetAuthority: 'LIBRARY_ADMIN',
    whyChosenAuthority: 'Chief Librarian manages the university IP subnet proxy and external database institutional subscription keys.',
    resolutionSummary: 'Institutional Shibboleth SSO token updated and IP whitelist re-synchronized with IEEE technical team. Access verified operational.',
    resolvedAt: '2026-10-08T17:00:00.000Z',
    resolvedBy: 'Dr. S. Kulkarni (Chief Librarian)',
    studentRating: 5,
    studentFeedback: 'Extremely quick resolution! Was able to download conference papers within 4 hours. Thank you for the swift help.',
    createdAt: '2026-10-08T09:00:00.000Z',
    updatedAt: '2026-10-08T18:30:00.000Z',
    timeline: [
      {
        id: 't-401',
        timestamp: '2026-10-08T09:00:00.000Z',
        actor: 'Vikramaditya Rao (CS24M012)',
        actorRole: 'Student',
        action: 'Ticket Created',
        level: 'COLLEGE_LEVEL'
      },
      {
        id: 't-402',
        timestamp: '2026-10-08T17:00:00.000Z',
        actor: 'Dr. S. Kulkarni (Chief Librarian)',
        actorRole: 'College Admin',
        action: 'Resolved',
        note: 'Re-synchronized proxy keys with publisher. Validated remote login.',
        level: 'COLLEGE_LEVEL'
      },
      {
        id: 't-403',
        timestamp: '2026-10-08T18:30:00.000Z',
        actor: 'Vikramaditya Rao',
        actorRole: 'Student',
        action: 'Resolution Accepted & Rated 5/5',
        note: 'Student marked ticket as satisfied.',
        level: 'COLLEGE_LEVEL'
      }
    ]
  },
  {
    id: 'cmp-105',
    ticketNumber: 'CR-2026-0912',
    title: 'Spoiled Food Served at South Mess Dinner and Hygiene Violations',
    description: 'Dinner served on 10th October had expired paneer with noticeable sour smell. Multiple students experienced nausea. Kitchen staff did not wear hairnets or gloves.',
    category: 'Sanitation & Food Quality',
    priority: 'HIGH',
    status: 'PENDING_COLLEGE_REVIEW',
    currentLevel: 'COLLEGE_LEVEL',
    isAnonymous: false,
    studentName: 'Ananya Deshmukh',
    studentRollNo: 'ME23B045',
    studentEmail: 'ananya.d@campus.edu',
    studentDepartment: 'Mechanical Engineering',
    targetAuthority: 'MESS_COMMITTEE',
    whyChosenAuthority: 'Mess Committee convenes weekly kitchen inspections and holds vendor penalty contractual rights.',
    createdAt: '2026-10-11T07:45:00.000Z',
    updatedAt: '2026-10-11T07:45:00.000Z',
    timeline: [
      {
        id: 't-501',
        timestamp: '2026-10-11T07:45:00.000Z',
        actor: 'Ananya Deshmukh (ME23B045)',
        actorRole: 'Student',
        action: 'Ticket Created',
        note: 'Queued for College Level Mess Committee review.',
        level: 'COLLEGE_LEVEL'
      }
    ]
  }
];
