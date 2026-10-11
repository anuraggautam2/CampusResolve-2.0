'use client';

import React, { useState } from 'react';
import { Category, Priority, TargetAuthority } from '@/types/complaint';
import { AUTHORITIES_DIRECTORY, getAuthority } from '@/lib/authorities';
import { CreateComplaintInput } from '@/lib/storage';
import { 
  X, 
  Send, 
  Shield, 
  ShieldAlert, 
  Building2, 
  AlertCircle, 
  UserCheck, 
  Clock, 
  Lightbulb, 
  HelpCircle 
} from 'lucide-react';

interface NewComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateComplaintInput) => void;
}

const CATEGORIES: Category[] = [
  'Academic & Grading',
  'Hostel & Residential',
  'Ragging & Harassment',
  'Sanitation & Food Quality',
  'Campus Infrastructure & IT',
  'Fee & Financial Discrepancy',
  'Discrimination & Code of Conduct'
];

export function NewComplaintModal({ isOpen, onClose, onSubmit }: NewComplaintModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Academic & Grading');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [targetAuthority, setTargetAuthority] = useState<TargetAuthority>('HOD_COMPUTER_SCIENCE');
  const [whyChosenAuthority, setWhyChosenAuthority] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [studentName, setStudentName] = useState('Rahul Varma');
  const [studentRollNo, setStudentRollNo] = useState('CS24B102');
  const [studentEmail, setStudentEmail] = useState('rahul.varma@campus.edu');
  const [studentDepartment, setStudentDepartment] = useState('Computer Science & Engineering');

  if (!isOpen) return null;

  const selectedAuthority = getAuthority(targetAuthority);
  const isSuperAdminLevel = selectedAuthority.level === 'SUPER_ADMIN_LEVEL';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !whyChosenAuthority.trim()) {
      alert('Please fill out all required fields, including the reason for choosing this authority.');
      return;
    }

    onSubmit({
      title,
      description,
      category,
      priority,
      targetAuthority,
      whyChosenAuthority,
      isAnonymous,
      studentName: isAnonymous ? undefined : studentName,
      studentRollNo: isAnonymous ? undefined : studentRollNo,
      studentEmail: isAnonymous ? undefined : studentEmail,
      studentDepartment: isAnonymous ? undefined : studentDepartment
    });

    onClose();
  };

  const quickWhyReasons = [
    'Direct department jurisdiction over course and faculty',
    'College authority failed to act on previous verbal notices',
    'Emergency safety / ragging violation requiring apex intervention',
    'Hostel warden has direct budget authority for repairs',
    'State ombudsman appellate intervention required'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-400/30">
              <Send className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">File New Campus Grievance</h2>
              <p className="text-xs text-indigo-200">
                Target the appropriate college or apex authority with prioritized resolution SLAs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Priority Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Complaint Priority & Urgency SLA
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPriority('LOW')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  priority === 'LOW'
                    ? 'border-slate-800 bg-slate-50 ring-2 ring-slate-800/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-slate-800">LOW</div>
                <div className="text-[11px] text-slate-500 mt-1">3 - 5 Days SLA</div>
                <div className="text-[10px] text-slate-400">Routine inquiry</div>
              </button>

              <button
                type="button"
                onClick={() => setPriority('MEDIUM')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  priority === 'MEDIUM'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-blue-700">MEDIUM</div>
                <div className="text-[11px] text-blue-600 mt-1">48 Hours SLA</div>
                <div className="text-[10px] text-slate-400">Standard issue</div>
              </button>

              <button
                type="button"
                onClick={() => setPriority('HIGH')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  priority === 'HIGH'
                    ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-amber-700">HIGH</div>
                <div className="text-[11px] text-amber-600 mt-1">24 Hours SLA</div>
                <div className="text-[10px] text-slate-400">Needs quick fix</div>
              </button>

              <button
                type="button"
                onClick={() => setPriority('CRITICAL')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  priority === 'CRITICAL'
                    ? 'border-rose-600 bg-rose-50/60 ring-2 ring-rose-600/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-rose-700 flex items-center gap-1">
                  CRITICAL
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] text-rose-600 font-semibold mt-1">6 Hours SLA</div>
                <div className="text-[10px] text-rose-500">Immediate hazard/threat</div>
              </button>
            </div>
          </div>

          {/* Grievance Category & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full text-xs rounded-lg border-slate-300 py-2.5 px-3 bg-white border focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Complaint Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Unreasonable grade deduction / Contaminated hostel water"
                className="w-full text-xs rounded-lg border-slate-300 py-2.5 px-3 bg-white border focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Target Authority Selector (WHO TO COMPLAINT TO) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                  2. Choose Designated Recipient (Who to Complain To) *
                </label>
                <p className="text-[11px] text-slate-500">
                  Select whether this is handled by College Staff (Tier 1) or Higher Apex Organization (Tier 2).
                </p>
              </div>
              <div className="text-right">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  isSuperAdminLevel 
                    ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                    : 'bg-slate-200 text-slate-800'
                }`}>
                  {isSuperAdminLevel ? 'Tier 2: Super Admin / Org' : 'Tier 1: College Admin'}
                </span>
              </div>
            </div>

            <select
              value={targetAuthority}
              onChange={(e) => setTargetAuthority(e.target.value as TargetAuthority)}
              className="w-full text-xs rounded-lg border-slate-300 py-2.5 px-3 bg-white border focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium"
            >
              <optgroup label="─── COLLEGE LEVEL (TIER 1) ───">
                {AUTHORITIES_DIRECTORY.filter(a => a.level === 'COLLEGE_LEVEL').map(auth => (
                  <option key={auth.id} value={auth.id}>
                    {auth.name} [{auth.department}] - ~{auth.typicalResponseHours}h response
                  </option>
                ))}
              </optgroup>
              <optgroup label="─── SUPER ADMIN / HIGHER APEX ORGANIZATION (TIER 2) ───">
                {AUTHORITIES_DIRECTORY.filter(a => a.level === 'SUPER_ADMIN_LEVEL').map(auth => (
                  <option key={auth.id} value={auth.id}>
                    ⭐ {auth.name} [{auth.department}] - Apex SLA: {auth.typicalResponseHours}h
                  </option>
                ))}
              </optgroup>
            </select>

            {/* Authority Detail Card */}
            <div className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
              isSuperAdminLevel 
                ? 'bg-purple-50/80 border-purple-200 text-purple-900' 
                : 'bg-white border-slate-200 text-slate-700'
            }`}>
              {isSuperAdminLevel ? (
                <ShieldAlert className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
              ) : (
                <Building2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              )}
              <div className="space-y-1">
                <div className="font-semibold text-slate-900">
                  {selectedAuthority.name}
                </div>
                <div className="text-[11px] leading-relaxed text-slate-600">
                  {selectedAuthority.description}
                </div>
                <div className="text-[10px] text-slate-500 flex items-center gap-2 pt-0.5">
                  <span className="flex items-center gap-1 font-semibold text-indigo-600">
                    <Clock className="w-3 h-3" />
                    Target SLA: {selectedAuthority.typicalResponseHours} hours
                  </span>
                  <span>•</span>
                  <span>Jurisdiction: {selectedAuthority.department}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reason for Choosing Authority (WHY TO COMPLAINT) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-800">
                3. Why are you choosing this specific recipient? *
              </label>
              <span className="text-[11px] text-slate-400">Mandatory justification</span>
            </div>
            <textarea
              required
              rows={2}
              value={whyChosenAuthority}
              onChange={(e) => setWhyChosenAuthority(e.target.value)}
              placeholder="Explain why this authority is the correct office to resolve your problem, or why previous lower-tier channels failed..."
              className="w-full text-xs rounded-lg border-slate-300 p-3 bg-white border focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />

            {/* Quick Reason Suggestions */}
            <div className="mt-2">
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1.5 font-medium">
                <Lightbulb className="w-3 h-3 text-amber-500" />
                Quick suggestions (click to auto-fill):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickWhyReasons.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setWhyChosenAuthority(chip)}
                    className="text-[10px] px-2 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200 transition-colors"
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Grievance Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              4. Incident Facts & Evidence Description *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide specific dates, room/lab numbers, individuals involved, and detailed facts..."
              className="w-full text-xs rounded-lg border-slate-300 p-3 bg-white border focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          {/* Student Identity & Confidentiality Protocol */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-800">
                  Student Identity & Whistleblower Protection
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                <span className="ms-2 text-xs font-semibold text-slate-700">
                  Submit Anonymously
                </span>
              </label>
            </div>

            {isAnonymous ? (
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-xs text-purple-900 flex items-start gap-2">
                <UserCheck className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <strong>Anonymous Protocol Active:</strong> Your name, roll number, and email will be masked. An anonymous cryptographic tracking token will be assigned to safeguard your identity from any retaliation.
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] font-medium text-slate-600">Student Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full text-xs rounded-md border-slate-300 p-2 border mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600">Roll / Registration No</label>
                  <input
                    type="text"
                    value={studentRollNo}
                    onChange={(e) => setStudentRollNo(e.target.value)}
                    className="w-full text-xs rounded-md border-slate-300 p-2 border mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600">Official College Email</label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full text-xs rounded-md border-slate-300 p-2 border mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600">Department / Branch</label>
                  <input
                    type="text"
                    value={studentDepartment}
                    onChange={(e) => setStudentDepartment(e.target.value)}
                    className="w-full text-xs rounded-md border-slate-300 p-2 border mt-0.5"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Confirm & Dispatch Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
