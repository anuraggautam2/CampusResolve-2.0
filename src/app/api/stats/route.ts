import { NextResponse } from 'next/server';
import { INITIAL_COMPLAINTS } from '@/lib/mock-data';

export async function GET() {
  const total = INITIAL_COMPLAINTS.length;
  const critical = INITIAL_COMPLAINTS.filter(c => c.priority === 'CRITICAL').length;
  const high = INITIAL_COMPLAINTS.filter(c => c.priority === 'HIGH').length;
  const collegeLevel = INITIAL_COMPLAINTS.filter(c => c.currentLevel === 'COLLEGE_LEVEL').length;
  const superAdminLevel = INITIAL_COMPLAINTS.filter(c => c.currentLevel === 'SUPER_ADMIN_LEVEL').length;
  const resolved = INITIAL_COMPLAINTS.filter(c => c.status === 'RESOLVED').length;

  return NextResponse.json({
    success: true,
    data: {
      totalComplaints: total,
      criticalUrgency: critical,
      highUrgency: high,
      tier1CollegeQueue: collegeLevel,
      tier2SuperAdminQueue: superAdminLevel,
      resolvedComplaints: resolved
    }
  });
}
