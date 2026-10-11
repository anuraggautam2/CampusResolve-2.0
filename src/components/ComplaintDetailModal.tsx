'use client';

import React, { useState } from 'react';
import { Complaint, UserRole, Status } from '@/types/complaint';
import { getAuthority } from '@/lib/authorities';
import { PriorityBadge, StatusBadge, LevelBadge } from './Badges';
import { 
  X, 
  ArrowUpRight, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Star, 
  History, 
  User, 
  FileText, 
  AlertTriangle,
  Send,
  Calendar,
  Lock
} from 'lucide-react';

interface ComplaintDetailModalProps {
  complaint: Complaint | null;
  onClose: () => void;
  currentRole: UserRole;
  onUpdateStatus: (id: string, status: Status, note: string) => void;
  onEscalate: (id: string, reason: string) => void;
  onResolve: (id: string, summary: string) => void;
  onRate: (id: string, rating: number, feedback: string) => void;
}

export function ComplaintDetailModal({
  complaint,
  onClose,
  currentRole,
  onUpdateStatus,
  onEscalate,
  onResolve,
  onRate
}: ComplaintDetailModalProps) {
  const [escalateReason, setEscalateReason] = useState('');
  const [showEscalateForm, setShowEscalateForm] = useState(false);
  const [resolveSummary, setResolveSummary] = useState('');
  const [showResolveForm, setShowResolveForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [adminNote, setAdminNote] = useState('');

  if (!complaint) return null;

  const authority = getAuthority(complaint.targetAuthority);
  const isCollegeLevel = complaint.currentLevel === 'COLLEGE_LEVEL';
  const isSuperAdminLevel = complaint.currentLevel === 'SUPER_ADMIN_LEVEL';
  const isResolved = complaint.status === 'RESOLVED';

  const handleEscalateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!escalateReason.trim()) return;
    onEscalate(complaint.id, escalateReason);
    setShowEscalateForm(false);
    setEscalateReason('');
  };

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolveSummary.trim()) return;
    onResolve(complaint.id, resolveSummary);
    setShowResolveForm(false);
    setResolveSummary('');
  };

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRate(complaint.id, selectedRating, feedbackText);
    setFeedbackText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
              {complaint.ticketNumber}
            </span>
            <LevelBadge level={complaint.currentLevel} />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[82vh] overflow-y-auto space-y-6">
          
          {/* Title & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <PriorityBadge priority={complaint.priority} />
              <StatusBadge status={complaint.status} />
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                {complaint.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(complaint.createdAt).toLocaleString()}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 leading-snug">
              {complaint.title}
            </h1>
          </div>

          {/* Grievance Target & Why Chosen Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                {isSuperAdminLevel ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                ) : (
                  <Building2 className="w-3.5 h-3.5 text-slate-600" />
                )}
                Target Authority (Designated Recipient)
              </div>
              <div className="font-bold text-slate-800 text-sm">
                {authority.name}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {authority.department} • Standard SLA: {authority.typicalResponseHours}h
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                Why Student Chose This Authority
              </div>
              <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed italic">
                &ldquo;{complaint.whyChosenAuthority}&rdquo;
              </p>
            </div>
          </div>

          {/* Description Facts */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Incident Facts & Narrative
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
              {complaint.description}
            </div>
          </div>

          {/* Complainant Identity */}
          <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {complaint.isAnonymous ? (
                <>
                  <Lock className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-purple-900">
                    Confidential Whistleblower Protocol
                  </span>
                  <span className="text-slate-500">
                    (Student identity legally masked under Anti-Retaliation Policy)
                  </span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-slate-600" />
                  <span className="font-semibold text-slate-800">
                    Complainant: {complaint.studentName} ({complaint.studentRollNo})
                  </span>
                  <span className="text-slate-500">
                    • {complaint.studentDepartment}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Escalation Information Banner if Escalated */}
          {complaint.escalationReason && (
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs">
              <div className="font-bold text-purple-900 flex items-center gap-2 mb-1">
                <ArrowUpRight className="w-4 h-4 text-purple-600" />
                Escalated to Super Admin / Higher Organization
              </div>
              <div className="text-purple-800">
                <strong>Escalation Reason:</strong> {complaint.escalationReason}
              </div>
              <div className="text-purple-600 text-[11px] mt-1">
                Escalated by {complaint.escalatedBy || 'Administrator'} on {complaint.escalatedAt ? new Date(complaint.escalatedAt).toLocaleString() : 'N/A'}
              </div>
            </div>
          )}

          {/* Resolution Summary Banner if Resolved */}
          {complaint.resolutionSummary && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
              <div className="font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Official Resolution Statement
              </div>
              <div className="text-emerald-800 leading-relaxed bg-white/70 p-2.5 rounded-lg border border-emerald-200">
                {complaint.resolutionSummary}
              </div>
              <div className="text-emerald-700 text-[11px]">
                Closed by {complaint.resolvedBy} on {complaint.resolvedAt ? new Date(complaint.resolvedAt).toLocaleString() : 'N/A'}
              </div>

              {/* Student Feedback if provided */}
              {complaint.studentRating && (
                <div className="mt-2 pt-2 border-t border-emerald-200 flex items-center gap-2">
                  <span className="font-semibold text-emerald-900">Student Satisfaction:</span>
                  <div className="flex items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= (complaint.studentRating || 0) ? 'fill-current' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  {complaint.studentFeedback && (
                    <span className="text-emerald-800 italic ml-2">&ldquo;{complaint.studentFeedback}&rdquo;</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Interactive Role-Based Actions */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Actions Available as: {currentRole.replace(/_/g, ' ')}
              </span>
              <span className="text-[11px] text-slate-400">
                Current Tier: {complaint.currentLevel === 'SUPER_ADMIN_LEVEL' ? 'Super Admin / Apex Org' : 'College Admin'}
              </span>
            </div>

            {/* Student Actions */}
            {currentRole === 'STUDENT' && (
              <div className="space-y-3">
                {isResolved && !complaint.studentRating && (
                  <form onSubmit={handleRateSubmit} className="p-3 bg-white/10 rounded-xl space-y-2.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-400" />
                      Rate Your Resolution Experience
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-300">Score:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setSelectedRating(star)}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= selectedRating ? 'fill-current' : 'text-slate-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-amber-400">({selectedRating}/5 Stars)</span>
                    </div>
                    <input
                      type="text"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Add brief satisfaction remarks or confirmation..."
                      className="w-full text-xs bg-black/40 border border-white/20 rounded-lg p-2.5 text-white placeholder-slate-400 focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs rounded-lg transition-colors"
                    >
                      Submit Satisfaction Review
                    </button>
                  </form>
                )}

                {/* Student Escalation Button (if unresolved at college level) */}
                {!isResolved && isCollegeLevel && (
                  <div>
                    {!showEscalateForm ? (
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <div className="text-xs font-bold text-amber-300">
                            Dissatisfied or Facing Delays from College Staff?
                          </div>
                          <div className="text-[11px] text-slate-300">
                            You have the statutory right to escalate directly to the University Ombudsman or Apex Board.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowEscalateForm(true)}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          Escalate to Super Admin
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleEscalateSubmit} className="p-3 bg-white/10 rounded-xl space-y-2">
                        <div className="text-xs font-bold text-amber-300">
                          File Escalation to University Super Admin
                        </div>
                        <textarea
                          required
                          rows={2}
                          value={escalateReason}
                          onChange={(e) => setEscalateReason(e.target.value)}
                          placeholder="State why the college response is unsatisfactory or delayed..."
                          className="w-full text-xs bg-black/40 border border-white/20 rounded-lg p-2.5 text-white placeholder-slate-400 focus:outline-hidden"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="submit"
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-bold rounded-lg transition-colors"
                          >
                            Confirm Escalation
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowEscalateForm(false)}
                            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* College Admin Actions (Tier 1) */}
            {currentRole === 'COLLEGE_ADMIN' && (
              <div className="space-y-3">
                {isCollegeLevel && !isResolved ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => onUpdateStatus(complaint.id, 'IN_PROGRESS_COLLEGE', 'Department commenced active inquiry.')}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-xs font-bold rounded-lg transition-colors"
                    >
                      Mark In Progress
                    </button>

                    <button
                      onClick={() => setShowResolveForm(true)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Resolve Complaint
                    </button>

                    <button
                      onClick={() => setShowEscalateForm(true)}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      Escalate to Super Admin
                    </button>
                  </div>
                ) : isSuperAdminLevel ? (
                  <div className="text-xs text-purple-200 bg-purple-950/60 p-3 rounded-xl border border-purple-800">
                    This grievance has been transferred to Level 2 (Super Admin / Higher Org). College Admin has view-only audit rights.
                  </div>
                ) : (
                  <div className="text-xs text-emerald-300">
                    This ticket has been officially resolved.
                  </div>
                )}

                {/* College Admin Escalation Form */}
                {showEscalateForm && (
                  <form onSubmit={handleEscalateSubmit} className="p-3 bg-white/10 rounded-xl space-y-2 mt-2">
                    <div className="text-xs font-bold text-purple-300">
                      Escalate Case to Super Admin (Apex Org Level)
                    </div>
                    <textarea
                      required
                      rows={2}
                      value={escalateReason}
                      onChange={(e) => setEscalateReason(e.target.value)}
                      placeholder="e.g., Exceeds college financial limits, requires university syndicate sanction, or involves inter-college jurisdiction..."
                      className="w-full text-xs bg-black/40 border border-white/20 rounded-lg p-2.5 text-white placeholder-slate-400 focus:outline-hidden"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-xs font-bold rounded-lg transition-colors"
                      >
                        Submit Case to Super Admin
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEscalateForm(false)}
                        className="px-3 py-1.5 text-xs text-slate-300 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* College Admin Resolve Form */}
                {showResolveForm && (
                  <form onSubmit={handleResolveSubmit} className="p-3 bg-white/10 rounded-xl space-y-2 mt-2">
                    <div className="text-xs font-bold text-emerald-300">
                      Official College Resolution Entry
                    </div>
                    <textarea
                      required
                      rows={2}
                      value={resolveSummary}
                      onChange={(e) => setResolveSummary(e.target.value)}
                      placeholder="Detail the remedial actions taken, work orders issued, or outcome reached..."
                      className="w-full text-xs bg-black/40 border border-white/20 rounded-lg p-2.5 text-white placeholder-slate-400 focus:outline-hidden"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold rounded-lg transition-colors"
                      >
                        Publish Resolution & Close
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResolveForm(false)}
                        className="px-3 py-1.5 text-xs text-slate-300 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Super Admin Actions (Tier 2 / Apex Org) */}
            {currentRole === 'SUPER_ADMIN' && (
              <div className="space-y-3">
                {!isResolved ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {complaint.status !== 'IN_REVIEW_SUPER_ADMIN' && (
                        <button
                          onClick={() => onUpdateStatus(complaint.id, 'IN_REVIEW_SUPER_ADMIN', 'Apex Disciplinary Tribunal opened formal review.')}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-lg transition-colors"
                        >
                          Open Apex Tribunal Review
                        </button>
                      )}

                      <button
                        onClick={() => setShowResolveForm(true)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Issue Apex Ruling & Resolve
                      </button>

                      <button
                        onClick={() => onUpdateStatus(complaint.id, 'REJECTED', 'Dismissed after review by Apex Regulatory Board.')}
                        className="px-3 py-1.5 bg-rose-700 hover:bg-rose-600 text-xs font-bold rounded-lg transition-colors"
                      >
                        Dismiss Case
                      </button>
                    </div>

                    {showResolveForm && (
                      <form onSubmit={handleResolveSubmit} className="p-3 bg-white/10 rounded-xl space-y-2 mt-2">
                        <div className="text-xs font-bold text-emerald-300">
                          Issue Final Statutory Order & Directive
                        </div>
                        <textarea
                          required
                          rows={3}
                          value={resolveSummary}
                          onChange={(e) => setResolveSummary(e.target.value)}
                          placeholder="State final executive resolution, administrative sanction, disciplinary ruling, or policy amendment..."
                          className="w-full text-xs bg-black/40 border border-white/20 rounded-lg p-2.5 text-white placeholder-slate-400 focus:outline-hidden"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="submit"
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold rounded-lg transition-colors"
                          >
                            Execute Directive & Close Case
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowResolveForm(false)}
                            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-emerald-300">
                    This case was concluded under Apex Authority jurisdiction.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Audit Timeline */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <History className="w-4 h-4 text-slate-500" />
                Immutable Resolution Timeline & Audit Log
              </h3>
              <span className="text-[11px] text-slate-400">
                {complaint.timeline.length} Recorded Milestone(s)
              </span>
            </div>

            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
              {complaint.timeline.map((event, idx) => {
                const isSuper = event.level === 'SUPER_ADMIN_LEVEL';
                return (
                  <div key={event.id || idx} className="relative flex items-start gap-3 pl-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white z-10 text-[10px] font-bold shadow-xs ${
                      isSuper ? 'bg-purple-700 ring-2 ring-purple-200' : 'bg-slate-800 ring-2 ring-slate-200'
                    }`}>
                      {idx + 1}
                    </div>

                    <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{event.action}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.2 rounded ${
                            event.actorRole === 'Super Admin'
                              ? 'bg-purple-100 text-purple-800'
                              : event.actorRole === 'College Admin'
                              ? 'bg-blue-100 text-blue-800'
                              : event.actorRole === 'System'
                              ? 'bg-slate-200 text-slate-700'
                              : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {event.actorRole}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-slate-600 font-medium">
                        By: {event.actor}
                      </div>

                      {event.note && (
                        <p className="mt-1 text-slate-700 bg-white p-2 rounded-md border border-slate-200/80 text-[11px] leading-relaxed">
                          {event.note}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
