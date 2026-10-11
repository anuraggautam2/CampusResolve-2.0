'use client';

import React, { useState, useEffect } from 'react';
import { Complaint, UserRole, Status } from '@/types/complaint';
import { 
  getStoredComplaints, 
  createNewComplaint, 
  updateComplaintStatus, 
  escalateComplaintToSuperAdmin, 
  resolveComplaint, 
  submitStudentRating, 
  resetDemoData, 
  CreateComplaintInput 
} from '@/lib/storage';
import { Navbar } from '@/components/Navbar';
import { StudentPortal } from '@/components/StudentPortal';
import { CollegeAdminPortal } from '@/components/CollegeAdminPortal';
import { SuperAdminPortal } from '@/components/SuperAdminPortal';
import { NewComplaintModal } from '@/components/NewComplaintModal';
import { ComplaintDetailModal } from '@/components/ComplaintDetailModal';
import { ShieldCheck, GitBranch, Sparkles, Building2, ExternalLink } from 'lucide-react';

export default function Home() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [currentRole, setCurrentRole] = useState<UserRole>('STUDENT');
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const refreshData = () => {
    setComplaints(getStoredComplaints());
  };

  useEffect(() => {
    refreshData();

    const handleUpdate = () => {
      refreshData();
    };

    window.addEventListener('campus_resolve_storage_update', handleUpdate);
    return () => {
      window.removeEventListener('campus_resolve_storage_update', handleUpdate);
    };
  }, []);

  // Sync selectedComplaint if modified in store
  useEffect(() => {
    if (selectedComplaint) {
      const updated = complaints.find(c => c.id === selectedComplaint.id);
      if (updated) {
        setSelectedComplaint(updated);
      }
    }
  }, [complaints, selectedComplaint]);

  // Handlers
  const handleCreateComplaint = (input: CreateComplaintInput) => {
    const created = createNewComplaint(input);
    refreshData();
    setSelectedComplaint(created);
  };

  const handleUpdateStatus = (id: string, status: Status, note: string) => {
    const actorRole = currentRole === 'COLLEGE_ADMIN' ? 'College Admin' : 'Super Admin';
    const actorName = currentRole === 'COLLEGE_ADMIN' ? 'Dean of Student Affairs' : 'Chief University Ombudsman';
    updateComplaintStatus(id, status, note, actorName, actorRole);
    refreshData();
  };

  const handleEscalate = (id: string, reason: string) => {
    const actorRole = currentRole === 'STUDENT' ? 'Student' : 'College Admin';
    const actorName = currentRole === 'STUDENT' ? 'Student / Complainant' : 'College Triage Admin';
    escalateComplaintToSuperAdmin(id, reason, actorName, actorRole);
    refreshData();
  };

  const handleResolve = (id: string, summary: string) => {
    const actorRole = currentRole === 'COLLEGE_ADMIN' ? 'College Admin' : 'Super Admin';
    const actorName = currentRole === 'COLLEGE_ADMIN' ? 'College Action Board' : 'Supreme Ombudsman Council';
    resolveComplaint(id, summary, actorName, actorRole);
    refreshData();
  };

  const handleRate = (id: string, rating: number, feedback: string) => {
    submitStudentRating(id, rating, feedback, 'Student Complainant');
    refreshData();
  };

  const handleResetData = () => {
    if (confirm('Reset portal data to initial demo cases?')) {
      resetDemoData();
      refreshData();
      setSelectedComplaint(null);
    }
  };

  const criticalCount = complaints.filter(c => c.priority === 'CRITICAL' && c.status !== 'RESOLVED').length;
  const escalatedCount = complaints.filter(c => c.currentLevel === 'SUPER_ADMIN_LEVEL' && c.status !== 'RESOLVED').length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navigation with Role Switcher */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onOpenNewComplaint={() => setIsNewComplaintOpen(true)}
        onResetData={handleResetData}
        totalComplaints={complaints.length}
        criticalCount={criticalCount}
        escalatedCount={escalatedCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dynamic Role View */}
        {currentRole === 'STUDENT' && (
          <StudentPortal
            complaints={complaints}
            onOpenNewComplaint={() => setIsNewComplaintOpen(true)}
            onSelectComplaint={setSelectedComplaint}
          />
        )}

        {currentRole === 'COLLEGE_ADMIN' && (
          <CollegeAdminPortal
            complaints={complaints}
            onSelectComplaint={setSelectedComplaint}
            onUpdateStatus={handleUpdateStatus}
            onEscalate={handleEscalate}
          />
        )}

        {currentRole === 'SUPER_ADMIN' && (
          <SuperAdminPortal
            complaints={complaints}
            onSelectComplaint={setSelectedComplaint}
            onUpdateStatus={handleUpdateStatus}
            onResolve={handleResolve}
          />
        )}

      </main>

      {/* Detail / Action Modal */}
      <ComplaintDetailModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        currentRole={currentRole}
        onUpdateStatus={handleUpdateStatus}
        onEscalate={handleEscalate}
        onResolve={handleResolve}
        onRate={handleRate}
      />

      {/* New Complaint Modal */}
      <NewComplaintModal
        isOpen={isNewComplaintOpen}
        onClose={() => setIsNewComplaintOpen(false)}
        onSubmit={handleCreateComplaint}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-[10px]">
                CR
              </div>
              <span className="font-semibold text-slate-800">Campus Resolve 2.0</span>
              <span>• Multi-Tier Student Grievance & Statutory Escalation System</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Ready for GitHub & Vercel
              </span>
              <span>Role Switching Active (Student / College Admin / Super Admin)</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
