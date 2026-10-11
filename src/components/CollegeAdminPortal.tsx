'use client';

import React, { useState } from 'react';
import { Complaint, Status } from '@/types/complaint';
import { PriorityBadge, StatusBadge, LevelBadge } from './Badges';
import { 
  Building2, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Search, 
  AlertTriangle, 
  ShieldAlert, 
  Users, 
  FileText,
  ChevronRight,
  TrendingUp,
  Inbox
} from 'lucide-react';

interface CollegeAdminPortalProps {
  complaints: Complaint[];
  onSelectComplaint: (complaint: Complaint) => void;
  onUpdateStatus: (id: string, status: Status, note: string) => void;
  onEscalate: (id: string, reason: string) => void;
}

export function CollegeAdminPortal({
  complaints,
  onSelectComplaint,
  onUpdateStatus,
  onEscalate
}: CollegeAdminPortalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');
  const [tabFilter, setTabFilter] = useState<'LOCAL_QUEUE' | 'ESCALATED' | 'RESOLVED'>('LOCAL_QUEUE');

  // Segregate college-level vs escalated
  const collegeComplaints = complaints.filter(c => c.currentLevel === 'COLLEGE_LEVEL');
  const escalatedToSuperAdmin = complaints.filter(c => c.currentLevel === 'SUPER_ADMIN_LEVEL');
  
  const pendingCount = collegeComplaints.filter(c => c.status === 'PENDING_COLLEGE_REVIEW').length;
  const inProgressCount = collegeComplaints.filter(c => c.status === 'IN_PROGRESS_COLLEGE').length;
  const resolvedCollegeCount = collegeComplaints.filter(c => c.status === 'RESOLVED').length;
  const criticalLocalCount = collegeComplaints.filter(c => c.priority === 'CRITICAL' || c.priority === 'HIGH').length;

  const currentList = tabFilter === 'LOCAL_QUEUE' 
    ? collegeComplaints.filter(c => c.status !== 'RESOLVED' && c.status !== 'REJECTED')
    : tabFilter === 'ESCALATED'
    ? escalatedToSuperAdmin
    : collegeComplaints.filter(c => c.status === 'RESOLVED');

  const filtered = currentList.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.studentName && c.studentName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept = selectedDeptFilter === 'ALL' || c.targetAuthority === selectedDeptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      
      {/* College Admin Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold border border-blue-400/30">
              <Building2 className="w-3.5 h-3.5" />
              Level 1: College Administrative Triage
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              College Grievance Operations Desk
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
              First-response administrative tier for all academic, hostel, and facility complaints. Triage issues swiftly or escalate complex statutory violations to Super Admin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-mono">
              College Admin Session: Active
            </span>
          </div>
        </div>

        {/* Operational Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-blue-900/50">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-slate-300 text-xs font-medium">Pending Review</div>
            <div className="text-2xl font-black mt-1 text-yellow-400">{pendingCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-slate-300 text-xs font-medium">In Investigation</div>
            <div className="text-2xl font-black mt-1 text-sky-400">{inProgressCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/30">
            <div className="text-rose-200 text-xs font-medium flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              High / Urgent SLAs
            </div>
            <div className="text-2xl font-black mt-1 text-rose-300">{criticalLocalCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/30">
            <div className="text-purple-200 text-xs font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              Escalated to Apex Org
            </div>
            <div className="text-2xl font-black mt-1 text-purple-300">{escalatedToSuperAdmin.length}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setTabFilter('LOCAL_QUEUE')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabFilter === 'LOCAL_QUEUE'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Active College Queue</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
            {pendingCount + inProgressCount}
          </span>
        </button>

        <button
          onClick={() => setTabFilter('ESCALATED')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabFilter === 'ESCALATED'
              ? 'bg-purple-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Escalated to Super Admin</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
            {escalatedToSuperAdmin.length}
          </span>
        </button>

        <button
          onClick={() => setTabFilter('RESOLVED')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabFilter === 'RESOLVED'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Resolved by College</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
            {resolvedCollegeCount}
          </span>
        </button>
      </div>

      {/* Search and Department Filter */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tickets, complainant student name, keyword..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-hidden"
          >
            <option value="ALL">All College Departments</option>
            <option value="HOD_COMPUTER_SCIENCE">Dept of CSE</option>
            <option value="HOD_MECHANICAL">Dept of ME</option>
            <option value="HOD_ELECTRICAL">Dept of EE</option>
            <option value="HOSTEL_WARDEN">Hostel Administration</option>
            <option value="EXAM_CELL_CONTROLLER">Examination Cell</option>
            <option value="MESS_COMMITTEE">Mess Committee</option>
            <option value="LIBRARY_ADMIN">Central Library</option>
            <option value="CAMPUS_SECURITY_CHIEF">Campus Security</option>
          </select>
        </div>
      </div>

      {/* Complaints Table / List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No complaints in this queue</h3>
          <p className="text-xs text-slate-500 mt-1">
            All tickets in this view have been processed or moved.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => {
            return (
              <div
                key={item.id}
                onClick={() => onSelectComplaint(item)}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all cursor-pointer hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {item.ticketNumber}
                    </span>
                    <PriorityBadge priority={item.priority} />
                    <StatusBadge status={item.status} />
                    <LevelBadge level={item.currentLevel} />
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Logged: {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-1">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Complainant & Why Reason */}
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="text-slate-600">
                    <span className="font-semibold text-slate-700">Complainant: </span>
                    {item.isAnonymous ? (
                      <span className="text-purple-700 font-semibold italic">Confidential / Anonymous</span>
                    ) : (
                      <span>{item.studentName} ({item.studentRollNo}) • {item.studentDepartment}</span>
                    )}
                  </div>

                  <div className="text-indigo-700 font-medium">
                    <span className="font-semibold text-slate-700">Student&apos;s Reason for Authority: </span>
                    <span className="italic truncate">&ldquo;{item.whyChosenAuthority}&rdquo;</span>
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Click to review audit timeline and take action
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                    <span>Manage Case</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
