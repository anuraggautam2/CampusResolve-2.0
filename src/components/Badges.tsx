import React from 'react';
import { Priority, Status, EscalationLevel } from '@/types/complaint';
import { ShieldAlert, AlertTriangle, Clock, CheckCircle2, XCircle, ArrowUpRight, Building2, ShieldCheck } from 'lucide-react';

export function PriorityBadge({ priority }: { priority: Priority }) {
  switch (priority) {
    case 'CRITICAL':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          CRITICAL SLA (6h)
        </span>
      );
    case 'HIGH':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          High Priority (24h)
        </span>
      );
    case 'MEDIUM':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          <Clock className="w-3.5 h-3.5 text-blue-500" />
          Medium Priority (48h)
        </span>
      );
    case 'LOW':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-750 border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          Low Priority (3-5d)
        </span>
      );
  }
}

export function StatusBadge({ status }: { status: Status }) {
  switch (status) {
    case 'PENDING_COLLEGE_REVIEW':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-yellow-50 text-yellow-800 border border-yellow-200">
          <Clock className="w-3 h-3 text-yellow-600" />
          Pending College Review
        </span>
      );
    case 'IN_PROGRESS_COLLEGE':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-sky-50 text-sky-800 border border-sky-200">
          <Building2 className="w-3 h-3 text-sky-600" />
          In Progress (College)
        </span>
      );
    case 'ESCALATED_TO_SUPER_ADMIN':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-800 border border-purple-300">
          <ArrowUpRight className="w-3 h-3 text-purple-600" />
          Escalated to Super Admin
        </span>
      );
    case 'IN_REVIEW_SUPER_ADMIN':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-300">
          <ShieldCheck className="w-3 h-3 text-indigo-600" />
          Apex Tribunal Review
        </span>
      );
    case 'RESOLVED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Resolved
        </span>
      );
    case 'REJECTED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200">
          <XCircle className="w-3 h-3 text-rose-600" />
          Dismissed / Closed
        </span>
      );
    default:
      return <span className="text-xs text-slate-500">{status}</span>;
  }
}

export function LevelBadge({ level }: { level: EscalationLevel }) {
  if (level === 'SUPER_ADMIN_LEVEL') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-purple-900 text-purple-100 shadow-xs">
        <ShieldCheck className="w-3 h-3 text-purple-300" />
        Tier 2: Super Admin / Org
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-slate-800 text-slate-100">
      <Building2 className="w-3 h-3 text-slate-300" />
      Tier 1: College Admin
    </span>
  );
}
