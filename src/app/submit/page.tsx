"use client";
import Link from "next/link";
import { useState } from "react";
import { Upload, FileText, Presentation, CheckCircle } from "lucide-react";

export default function SubmitPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    teamId: '',
    teamName: '',
    leaderEmail: '',
    leaderMobile: '',
    reportFile: null as File | null,
    presentationFile: null as File | null,
  });

  const [fileNames, setFileNames] = useState({
    report: '',
    presentation: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'report' | 'presentation') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'report') {
        // Validate PDF
        if (file.type !== 'application/pdf') {
          alert('Please upload a PDF file for the report');
          e.target.value = '';
          return;
        }
        setFormData({ ...formData, reportFile: file });
        setFileNames({ ...fileNames, report: file.name });
      } else {
        // Validate PPT/PPTX
        const validTypes = [
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ];
        if (!validTypes.includes(file.type)) {
          alert('Please upload a PowerPoint file (.ppt or .pptx)');
          e.target.value = '';
          return;
        }
        setFormData({ ...formData, presentationFile: file });
        setFileNames({ ...fileNames, presentation: file.name });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Validate files
      if (!formData.reportFile || !formData.presentationFile) {
        throw new Error('Please upload both report and presentation files');
      }

      // Create FormData for file upload
      const submitFormData = new FormData();
      submitFormData.append('teamId', formData.teamId);
      submitFormData.append('teamName', formData.teamName);
      submitFormData.append('leaderEmail', formData.leaderEmail);
      submitFormData.append('leaderMobile', formData.leaderMobile);
      submitFormData.append('reportFile', formData.reportFile);
      submitFormData.append('presentationFile', formData.presentationFile);

      const response = await fetch('/api/submit', {
        method: 'POST',
        body: submitFormData,
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // Server returned HTML or other non-JSON response (likely an error page)
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 200));
        throw new Error('Server error occurred. Please try again or contact support if the issue persists.');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      if (result.success) {
        setShowSuccessModal(true);
      } else {
        throw new Error(result.error || 'Submission failed');
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'There was an issue submitting your files. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      teamId: '',
      teamName: '',
      leaderEmail: '',
      leaderMobile: '',
      reportFile: null,
      presentationFile: null,
    });
    setFileNames({
      report: '',
      presentation: ''
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm mb-4">
            🏆 Finalists Only
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold octwave-gradient-text mb-4">
            OctWave 2.0 - Final Round Submission
          </h1>
          <div className="text-2xl mb-4">📤 Submit Your Final Project</div>
          <p className="text-lg text-black/80 dark:text-white/90 max-w-2xl mx-auto">
            <strong>For qualified finalists only:</strong> Upload your final report (PDF) and presentation (PPT/PPTX) to complete your competition entry.
          </p>
        </div>

        {/* Important Notice */}
        <div className="card p-6 mb-8 border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20">
          <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-4">⚠️ Important Submission Guidelines:</h2>
          <ul className="space-y-2 text-yellow-800 dark:text-yellow-300">
            <li>• <strong>Only qualified finalists</strong> should submit here</li>
            <li>• Report must be in PDF format only</li>
            <li>• Presentation must be in PPT or PPTX format</li>
            <li>• Maximum file size: 50MB per file</li>
            <li>• Ensure your Team ID matches your registration</li>
            <li>• Use the email and mobile number of the team leader</li>
            <li>• Files will be uploaded to Google Drive and cannot be changed after submission</li>
          </ul>
        </div>

        {/* Submission Form */}
        <div className="card p-6 mb-8">
          <form onSubmit={handleSubmit}>
            {/* Team ID */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Team ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g., OW_001"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
                value={formData.teamId}
                onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">Enter the Team ID you received during registration</p>
            </div>

            {/* Team Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Team Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter your team name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              />
            </div>

            {/* Team Leader's Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Team Leader's Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="leader@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
                value={formData.leaderEmail}
                onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
              />
            </div>

            {/* Team Leader's Mobile */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Team Leader's Mobile No <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                inputMode="numeric"
                maxLength={10}
                minLength={10}
                placeholder="0771234567"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
                value={formData.leaderMobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({ ...formData, leaderMobile: value });
                }}
              />
              <p className="text-xs text-gray-500 mt-1">Enter exactly 10 digits. Do not include +94 or spaces.</p>
            </div>

            {/* Report Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Report (PDF) <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <label className="cursor-pointer">
                  <span className="btn-primary inline-block">
                    Choose PDF File
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'report')}
                  />
                </label>
                {fileNames.report && (
                  <p className="mt-3 text-sm text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {fileNames.report}
                  </p>
                )}
              </div>
            </div>

            {/* Presentation Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Presentation (PPT/PPTX) <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                <Presentation className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <label className="cursor-pointer">
                  <span className="btn-primary inline-block">
                    Choose PPT/PPTX File
                  </span>
                  <input
                    type="file"
                    accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    required
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'presentation')}
                  />
                </label>
                {fileNames.presentation && (
                  <p className="mt-3 text-sm text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {fileNames.presentation}
                  </p>
                )}
              </div>
            </div>

            {/* Error Display */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-700 dark:text-red-300 text-sm">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5 animate-pulse" />
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" />
                  Submit Project
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold octwave-gradient-text mb-4">📞 Need Help?</h2>
          <div className="space-y-2 text-black/80 dark:text-white/90">
            <p><strong>Renulucshmi Prakasan</strong> (Co-chair - OctWave 2.0): +94754350533</p>
            <p><strong>Rashmitha Hansamal</strong> (Co-chair - OctWave 2.0): +94776057351</p>
            <p><strong>Abinaya Subramaniam</strong> (OC - OctWave 2.0): +94763885326</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="btn-ghost">
            ← Back to Home
          </Link>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 text-center relative">
              {/* Success Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full octwave-gradient-bg flex items-center justify-center text-2xl text-white">
                ✅
              </div>

              {/* Success Message */}
              <h3 className="text-2xl font-bold octwave-gradient-text mb-3">
                Submission Successful!
              </h3>

              <p className="text-black/80 dark:text-white/90 mb-6">
                Your project has been successfully uploaded to Google Drive. We have received your submission and will contact you soon with further details.
              </p>

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  resetForm();
                  window.location.href = '/';
                }}
                className="w-full btn-primary"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
