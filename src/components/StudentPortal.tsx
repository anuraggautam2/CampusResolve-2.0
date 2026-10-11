'use client';

import React, { useState } from 'react';
import { Complaint, Priority } from '@/types/complaint';
import { PriorityBadge, StatusBadge, LevelBadge } from './Badges';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  Building2, 
  ChevronRight,
  ShieldCheck,
  FileQuestion,
  Star
} from 'lucide-react';

interface StudentPortalProps {
  complaints: Complaint[];
  onOpenNewComplaint: () => void;
  onSelectComplaint: (complaint: Complaint) => void;
}

export function StudentPortal({
  complaints,
  onOpenNewComplaint,
  onSelectComplaint
}: StudentPortalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterTier, setFilterTier] = useState<string>('ALL');

  // Metrics
  const total = complaints.length;
  const activeCount = complaints.filter(c => c.status !== 'RESOLVED' && c.status !== 'REJECTED').length;
  const escalatedCount = complaints.filter(c => c.currentLevel === 'SUPER_ADMIN_LEVEL').length;
  const resolvedCount = complaints.filter(c => c.status === 'RESOLVED').length;

  // Filter complaints
  const filtered = complaints.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.whyChosenAuthority.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = filterPriority === 'ALL' || c.priority === filterPriority;
    const matchesTier = filterTier === 'ALL' || c.currentLevel === filterTier;
    
    let matchesStatus = true;
    if (filterStatus === 'ACTIVE') {
      matchesStatus = c.status !== 'RESOLVED' && c.status !== 'REJECTED';
    } else if (filterStatus === 'RESOLVED') {
      matchesStatus = c.status === 'RESOLVED';
    } else if (filterStatus === 'ESCALATED') {
      matchesStatus = c.currentLevel === 'SUPER_ADMIN_LEVEL';
    }

    return matchesSearch && matchesPriority && matchesTier && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Student Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold border border-indigo-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Statutory Student Grievance Redressal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Student Grievance & Escalation Portal
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              File complaints to specific college authorities, prioritize urgency, or escalate directly to the Apex University Ombudsman if local college channels fail.
            </p>
          </div>

          <button
            onClick={onOpenNewComplaint}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-indigo-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all shrink-0"
          >
            <PlusCircle className="w-5 h-5 text-indigo-600" />
            File New Grievance
          </button>
        </div>

        {/* Quick KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-indigo-700/50">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-slate-300 text-xs font-medium">Total Filed</div>
            <div className="text-2xl font-black mt-1">{total}</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-sky-300 text-xs font-medium">Active In-Progress</div>
            <div className="text-2xl font-black mt-1 text-sky-400">{activeCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/30">
            <div className="text-purple-200 text-xs font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              Apex Escalations
            </div>
            <div className="text-2xl font-black mt-1 text-purple-300">{escalatedCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30">
            <div className="text-emerald-200 text-xs font-medium">Resolved</div>
            <div className="text-2xl font-black mt-1 text-emerald-300">{resolvedCount}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ticket #, issue title, keywords, or authority reason..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Priority filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50 focus:outline-hidden"
          >
            <option value="ALL">All Priorities</option>
            <option value="CRITICAL">Critical (6h SLA)</option>
            <option value="HIGH">High (24h SLA)</option>
            <option value="MEDIUM">Medium (48h SLA)</option>
            <option value="LOW">Low (3-5d SLA)</option>
          </select>

          {/* Tier filter */}
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50 focus:outline-hidden"
          >
            <option value="ALL">All Authority Tiers</option>
            <option value="COLLEGE_LEVEL">Tier 1: College Admin</option>
            <option value="SUPER_ADMIN_LEVEL">Tier 2: Super Admin / Org</option>
          </select>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50 focus:outline-hidden"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Cases</option>
            <option value="ESCALATED">Escalated to Super Admin</option>
            <option value="RESOLVED">Resolved Cases</option>
          </select>
        </div>
      </div>

      {/* Complaint Cards Grid / List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <FileQuestion className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No grievances found matching criteria</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or filters, or file a new grievance ticket.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const isSuper = item.currentLevel === 'SUPER_ADMIN_LEVEL';
            return (
              <div
                key={item.id}
                onClick={() => onSelectComplaint(item)}
                className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer hover:shadow-md ${
                  isSuper
                    ? 'border-purple-300 hover:border-purple-400 bg-gradient-to-r from-purple-50/20 to-white'
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
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
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Updated: {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-1">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Target & Reason Highlight */}
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="font-semibold text-slate-700">Recipient:</span>
                    <span className="truncate">{item.targetAuthority.replace(/_/g, ' ')}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-indigo-700 font-medium">
                    <span className="font-semibold text-slate-700">Why Chosen:</span>
                    <span className="truncate italic">&ldquo;{item.whyChosenAuthority}&rdquo;</span>
                  </div>
                </div>

                {/* Rating if resolved */}
                {item.studentRating && (
                  <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Rated {item.studentRating}/5 by student</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
