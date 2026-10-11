'use client';

import React from 'react';
import { UserRole } from '@/types/complaint';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  RotateCcw, 
  PlusCircle, 
  ShieldAlert,
  GitBranch
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenNewComplaint: () => void;
  onResetData: () => void;
  totalComplaints: number;
  criticalCount: number;
  escalatedCount: number;
}

export function Navbar({
  currentRole,
  onRoleChange,
  onOpenNewComplaint,
  onResetData,
  criticalCount,
  escalatedCount,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">Campus Resolve</span>
                <span className="px-1.5 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-100 text-indigo-700 tracking-wider">2.0</span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Multi-Tier Grievance & Escalation Resolution Network
              </p>
            </div>
          </div>

          {/* Role Switcher Pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onRoleChange('STUDENT')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'STUDENT'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Portal</span>
            </button>

            <button
              onClick={() => onRoleChange('COLLEGE_ADMIN')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'COLLEGE_ADMIN'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>College Admin</span>
              <span className="hidden md:inline text-[10px] text-slate-400 font-normal">(Tier 1)</span>
            </button>

            <button
              onClick={() => onRoleChange('SUPER_ADMIN')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                currentRole === 'SUPER_ADMIN'
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Super Admin</span>
              <span className="hidden md:inline text-[10px] opacity-80 font-normal">(Apex Org)</span>
              {(criticalCount > 0 || escalatedCount > 0) && (
                <span className="ml-1 w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
              )}
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            {currentRole === 'STUDENT' && (
              <button
                onClick={onOpenNewComplaint}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">File Grievance</span>
                <span className="sm:hidden">File</span>
              </button>
            )}

            <button
              onClick={onResetData}
              title="Reset Demo Data"
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Alert Banner for Super Admin Cases */}
        {(criticalCount > 0 || escalatedCount > 0) && (
          <div className="py-1 px-3 bg-amber-50/80 border-t border-amber-200 text-amber-900 text-xs flex items-center justify-between rounded-b-md">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                <strong>System Notice:</strong> {criticalCount} Critical Emergency case(s) and {escalatedCount} Escalated Ombudsman case(s) active.
              </span>
            </div>
            {currentRole !== 'SUPER_ADMIN' && (
              <button
                onClick={() => onRoleChange('SUPER_ADMIN')}
                className="font-bold underline hover:text-amber-800 text-[11px]"
              >
                Inspect Super Admin View →
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
