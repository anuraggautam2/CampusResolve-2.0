'use client';

import React, { useState } from 'react';
import { Complaint, Status } from '@/types/complaint';
import { PriorityBadge, StatusBadge, LevelBadge } from './Badges';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ArrowUpRight, 
  FileCheck, 
  Gavel, 
  Download, 
  Clock, 
  Search, 
  AlertTriangle,
  Building,
  CheckCircle2,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

interface SuperAdminPortalProps {
  complaints: Complaint[];
  onSelectComplaint: (complaint: Complaint) => void;
  onUpdateStatus: (id: string, status: Status, note: string) => void;
  onResolve: (id: string, summary: string) => void;
}

export function SuperAdminPortal({
  complaints,
  onSelectComplaint,
  onUpdateStatus,
  onResolve
}: SuperAdminPortalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'CRITICAL_CASES' | 'ALL_ESCALATIONS' | 'AUDIT_METRICS'>('CRITICAL_CASES');

  // Super Admin view focuses on Tier 2 cases + high priority
  const superAdminCases = complaints.filter(c => c.currentLevel === 'SUPER_ADMIN_LEVEL');
  const criticalCases = superAdminCases.filter(c => c.priority === 'CRITICAL' || c.category === 'Ragging & Harassment');
  const escalatedFromCollege = superAdminCases.filter(c => c.escalationReason !== undefined);
  const resolvedApex = superAdminCases.filter(c => c.status === 'RESOLVED');

  const exportAuditLog = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(superAdminCases, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `campus_resolve_super_admin_audit_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const currentDisplayList = activeTab === 'CRITICAL_CASES'
    ? criticalCases
    : superAdminCases;

  const filtered = currentDisplayList.filter(c => {
    return (
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.targetAuthority.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Super Admin Apex Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-purple-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold border border-purple-400/40">
              <Gavel className="w-3.5 h-3.5 text-purple-300" />
              Apex Governance & Ombudsman Directorate (Tier 2)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Higher Organization Grievance Command
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Autonomous oversight jurisdiction handling high-consequence statutory cases (Anti-Ragging, Institutional Malpractice, Ethics Violations) and unresolved college escalations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportAuditLog}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Statutory Dossier</span>
            </button>
          </div>
        </div>

        {/* Apex KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-purple-800/50">
          <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-700/50">
            <div className="text-purple-300 text-xs font-medium flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Critical Apex Alerts
            </div>
            <div className="text-2xl font-black mt-1 text-rose-400">{criticalCases.length}</div>
          </div>

          <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-700/50">
            <div className="text-purple-300 text-xs font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              College Escalations
            </div>
            <div className="text-2xl font-black mt-1 text-amber-300">{escalatedFromCollege.length}</div>
          </div>

          <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-700/50">
            <div className="text-purple-300 text-xs font-medium">Total Apex Jurisdiction</div>
            <div className="text-2xl font-black mt-1 text-white">{superAdminCases.length}</div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/50">
            <div className="text-emerald-300 text-xs font-medium flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              Apex Resolutions
            </div>
            <div className="text-2xl font-black mt-1 text-emerald-300">{resolvedApex.length}</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('CRITICAL_CASES')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'CRITICAL_CASES'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>High Severity & Anti-Ragging Docket</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
            {criticalCases.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ALL_ESCALATIONS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ALL_ESCALATIONS'
              ? 'bg-purple-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Gavel className="w-4 h-4" />
          <span>All Super Admin Cases</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
            {superAdminCases.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('AUDIT_METRICS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'AUDIT_METRICS'
              ? 'bg-indigo-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Institutional Compliance & Health</span>
        </button>
      </div>

      {activeTab === 'AUDIT_METRICS' ? (
        /* Analytics / Compliance Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-600" />
              College Department Bottleneck Analysis
            </h3>
            <p className="text-xs text-slate-500">
              Cross-department escalation rates indicating local administrative delays:
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Examination Cell (Mark Disputes)</span>
                  <span className="text-rose-600 font-bold">1 Escalation / High Latency</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Hostel & Living Utilities</span>
                  <span className="text-amber-600 font-bold">Resolved within 24h</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Digital Library Services</span>
                  <span className="text-emerald-600 font-bold">100% Satisfaction Rate</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              Statutory Compliance & Whistleblower Shield
            </h3>
            <p className="text-xs text-slate-500">
              Autonomous legal safeguards enforced across university premises:
            </p>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900">UGC Anti-Ragging Mandate 2009</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Direct whistleblower channel enabled. 6-Hour Emergency SLA enforced on all ragging reports.
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900">University Ombudsman Regulation</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Automated escalation triggers if College Level administration fails to provide written disposition within 7 business days.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Case Docket List */
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search apex docket by ticket #, authority, keyword..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <span className="text-xs text-purple-900 font-bold bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
              Showing {filtered.length} Apex Cases
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No cases currently in this docket</h3>
              <p className="text-xs text-slate-500 mt-1">
                All high-severity and escalated tickets have been reviewed.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(item => {
                const isCritical = item.priority === 'CRITICAL';
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectComplaint(item)}
                    className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer hover:shadow-lg ${
                      isCritical
                        ? 'border-rose-300 bg-rose-50/20 hover:border-rose-500'
                        : 'border-purple-200 hover:border-purple-400'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                          {item.ticketNumber}
                        </span>
                        <PriorityBadge priority={item.priority} />
                        <StatusBadge status={item.status} />
                        <LevelBadge level={item.currentLevel} />
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Incident: {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Escalation or Direct Target Context */}
                    <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-bold text-purple-900">Apex Authority: </span>
                        <span className="text-slate-700">{item.targetAuthority.replace(/_/g, ' ')}</span>
                      </div>

                      <div className="text-indigo-800">
                        <span className="font-bold text-slate-700">Reason for Selection: </span>
                        <span className="italic truncate">&ldquo;{item.whyChosenAuthority}&rdquo;</span>
                      </div>
                    </div>

                    {item.escalationReason && (
                      <div className="mt-2.5 p-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                        <strong>College Escalation Reason:</strong> {item.escalationReason}
                      </div>
                    )}

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        Click to convene tribunal review or execute statutory order
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-800">
                        <span>Adjudicate Case</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
