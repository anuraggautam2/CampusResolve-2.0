import { AuthorityMeta, TargetAuthority } from '@/types/complaint';

export const AUTHORITIES_DIRECTORY: AuthorityMeta[] = [
  // College Level
  {
    id: 'HOD_COMPUTER_SCIENCE',
    name: 'Head of Department (Computer Science & Eng)',
    level: 'COLLEGE_LEVEL',
    department: 'Department of CSE',
    description: 'Handles lab equipment, academic scheduling, faculty inquiries, and departmental curriculum issues.',
    typicalResponseHours: 48
  },
  {
    id: 'HOD_MECHANICAL',
    name: 'Head of Department (Mechanical Eng)',
    level: 'COLLEGE_LEVEL',
    department: 'Department of ME',
    description: 'Handles workshop safety, lab access, departmental evaluation, and student project allocations.',
    typicalResponseHours: 48
  },
  {
    id: 'HOD_ELECTRICAL',
    name: 'Head of Department (Electrical Eng)',
    level: 'COLLEGE_LEVEL',
    department: 'Department of EE',
    description: 'Handles laboratory resources, academic advisement, and internal department queries.',
    typicalResponseHours: 48
  },
  {
    id: 'HOSTEL_WARDEN',
    name: 'Chief Hostel Warden & Residential Office',
    level: 'COLLEGE_LEVEL',
    department: 'Hostel Administration',
    description: 'Handles room maintenance, water/electricity utilities, security curfew, and room mate conflicts.',
    typicalResponseHours: 24
  },
  {
    id: 'EXAM_CELL_CONTROLLER',
    name: 'Controller of Examinations (College Level)',
    level: 'COLLEGE_LEVEL',
    department: 'Examination Office',
    description: 'Handles internal mark disputes, exam hall seating, admit cards, and supplementary test scheduling.',
    typicalResponseHours: 36
  },
  {
    id: 'MESS_COMMITTEE',
    name: 'Dining & Mess Hygiene Committee',
    level: 'COLLEGE_LEVEL',
    department: 'Food Services',
    description: 'Handles food quality, dietary sanitation, mess billing, and meal schedule disputes.',
    typicalResponseHours: 24
  },
  {
    id: 'LIBRARY_ADMIN',
    name: 'Chief Librarian & Digital Resources Head',
    level: 'COLLEGE_LEVEL',
    department: 'Central Library',
    description: 'Handles library access, book overdue fines disputes, digital portal access, and study room noise.',
    typicalResponseHours: 48
  },
  {
    id: 'CAMPUS_SECURITY_CHIEF',
    name: 'Campus Proctor & Security Chief',
    level: 'COLLEGE_LEVEL',
    department: 'Campus Security',
    description: 'Handles lost property, parking permits, ID verification, and on-ground safety issues.',
    typicalResponseHours: 12
  },

  // Super Admin / Higher Organization Level
  {
    id: 'CENTRAL_ANTI_RAGGING_COUNCIL',
    name: 'University Central Anti-Ragging & Safety Council',
    level: 'SUPER_ADMIN_LEVEL',
    department: 'Autonomous Apex Safety Council',
    description: 'High-level statutory body handling ragging, physical intimidation, severe harassment, and safety violations. Bypasses college staff.',
    typicalResponseHours: 6
  },
  {
    id: 'BOARD_OF_OMBUDSMAN',
    name: 'State University Ombudsman & Appellate Tribunal',
    level: 'SUPER_ADMIN_LEVEL',
    department: 'Office of the University Ombudsman',
    description: 'Independent appellate authority for unresolved college grievances, corruption, bias, or administrative inaction.',
    typicalResponseHours: 48
  },
  {
    id: 'UNIVERSITY_VICE_CHANCELLOR',
    name: 'Vice Chancellor & Board of Governors Secretariat',
    level: 'SUPER_ADMIN_LEVEL',
    department: 'Executive Governance',
    description: 'Highest executive oversight. Handles institutional policy violations, widespread faculty malpractice, and critical systemic failures.',
    typicalResponseHours: 72
  },
  {
    id: 'EXTERNAL_ETHICS_COMMITTEE',
    name: 'Independent Internal Complaints Committee (ICC)',
    level: 'SUPER_ADMIN_LEVEL',
    department: 'Gender Sensitization & Ethics',
    description: 'Autonomous committee for sexual harassment, gender discrimination, and human rights violations.',
    typicalResponseHours: 12
  },
  {
    id: 'HIGHER_EDUCATION_DIRECTORATE',
    name: 'State Directorate of Technical & Higher Education',
    level: 'SUPER_ADMIN_LEVEL',
    department: 'External Regulatory Board',
    description: 'External governmental regulator for tuition fee extortion, non-accreditation violations, and legal compliance.',
    typicalResponseHours: 96
  }
];

export function getAuthority(id: TargetAuthority): AuthorityMeta {
  const found = AUTHORITIES_DIRECTORY.find(a => a.id === id);
  if (!found) {
    return {
      id,
      name: id,
      level: 'COLLEGE_LEVEL',
      department: 'General Administration',
      description: 'Campus administrative authority',
      typicalResponseHours: 48
    };
  }
  return found;
}
