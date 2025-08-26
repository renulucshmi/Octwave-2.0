"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [registrationResult, setRegistrationResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    teamMembers: '2',
    teamName: '',
    university: '',
    customUniversity: '',
    members: [
      { fullName: '', ieeeNumber: '', email: '', phone: '', yearOfStudy: '' },
      { fullName: '', ieeeNumber: '', email: '', phone: '', yearOfStudy: '' }
    ],
    confirmation: false
  });

  const resetForm = () => {
    setFormData({
      email: '',
      teamMembers: '2',
      teamName: '',
      university: '',
      customUniversity: '',
      members: [
        { fullName: '', ieeeNumber: '', email: '', phone: '', yearOfStudy: '' },
        { fullName: '', ieeeNumber: '', email: '', phone: '', yearOfStudy: '' }
      ],
      confirmation: false
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTeamMembersChange = (count: string) => {
    const memberCount = parseInt(count);
    const newMembers = Array(memberCount).fill(null).map((_, index) => 
      formData.members[index] || { fullName: '', ieeeNumber: '', email: '', phone: '', yearOfStudy: '' }
    );
    setFormData({ ...formData, teamMembers: count, members: newMembers });
  };

  const updateMember = (index: number, field: string, value: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setFormData({ ...formData, members: newMembers });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Submit to our API route which will handle Google Sheets
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: formData.teamName,
          email: formData.email,
          university: formData.university === 'other' ? formData.customUniversity : formData.university,
          members: formData.members
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      if (result.success) {
        setRegistrationResult({
          teamId: result.teamId,
          teamName: formData.teamName
        });
        setShowSuccessModal(true);
      } else {
        throw new Error(result.error || 'Registration failed');
      }

    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError(error instanceof Error ? error.message : 'There was an issue submitting your registration. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold octwave-gradient-text mb-4">
            OctWave 2.0 - Registration
          </h1>
          <div className="text-2xl mb-4">🚀 Unlock the Future of Artificial Intelligence with OctWave 2.0!</div>
          <p className="text-lg text-black/80 dark:text-white/90 max-w-3xl mx-auto">
            Join Sri Lanka's premier AI/ML competition designed to empower young professionals to solve real-world challenges! 
            Organized by IEEE Industry Applications Society (IAS) Student Branch Chapter, University of Moratuwa.
          </p>
        </div>

        {/* What Awaits You */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold octwave-gradient-text mb-4">🎯 What Awaits You:</h2>
          <ul className="space-y-2 text-black/80 dark:text-white/90">
            <li>✅ Industry-expert led workshops on ML, Data Engineering & Kaggle</li>
            <li>✅ Hands-on experience solving real industrial challenges with AI/ML</li>
            <li>✅ Team-based competition with Kaggle preliminary round</li>
            <li>✅ Final physical competition at University of Moratuwa</li>
            <li>✅ Industry recognition and networking opportunities with tech leaders</li>
            <li>✅ Certificates and awards endorsed by industry partners</li>
          </ul>
        </div>

        

        {/* Important Requirements */}
        <div className="card p-6 mb-8 border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20">
          <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-4">⚠️ Important Team Requirements:</h2>
          <ul className="space-y-2 text-yellow-800 dark:text-yellow-300">
            <li>• All team members must be from the same university</li>
            <li>• Teams can have 2-4 members maximum</li>
            <li>• Open to undergraduate students from government and private institutions in Sri Lanka</li>
          </ul>
          <p className="mt-4 font-semibold">Transform your innovative ideas into real-world AI/ML solutions with OctWave 2.0!</p>
        </div>

        {/* Registration Form */}
        <form className="card p-6 mb-8" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold octwave-gradient-text mb-6">Registration Form</h2>
          
          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Number of Team Members */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Number of Team Members <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
              value={formData.teamMembers}
              onChange={(e) => handleTeamMembersChange(e.target.value)}
            >
              <option value="2">2 Members</option>
              <option value="3">3 Members</option>
              <option value="4">4 Members</option>
            </select>
          </div>

          {/* Team Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Team Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
            />
          </div>

          {/* University */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              University <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
              value={formData.university === 'other' ? 'other' : formData.university}
              onChange={(e) => {
                if (e.target.value === 'other') {
                  setFormData({ ...formData, university: 'other', customUniversity: '' });
                } else {
                  setFormData({ ...formData, university: e.target.value, customUniversity: '' });
                }
              }}
            >
              <option value="">Select University</option>
              <option value="University of Colombo">University of Colombo</option>
              <option value="University of Peradeniya">University of Peradeniya</option>
              <option value="University of Sri Jayewardenepura">University of Sri Jayewardenepura</option>
              <option value="University of Moratuwa">University of Moratuwa</option>
              <option value="University of Ruhuna">University of Ruhuna</option>
              <option value="University of Kelaniya">University of Kelaniya</option>
              <option value="Rajarata University of Sri Lanka">Rajarata University of Sri Lanka</option>
              <option value="University of Jaffna">University of Jaffna</option>
              <option value="Wayamba University of Sri Lanka">Wayamba University of Sri Lanka</option>
              <option value="Sabaragamuwa University of Sri Lanka">Sabaragamuwa University of Sri Lanka</option>
              <option value="Eastern University of Sri Lanka">Eastern University of Sri Lanka</option>
              <option value="Uva Wellassa University">Uva Wellassa University</option>
              <option value="South Eastern University of Sri Lanka">South Eastern University of Sri Lanka</option>
              <option value="The Open University of Sri Lanka">The Open University of Sri Lanka</option>
              <option value="Sri Lanka Institute of Information Technology (SLIIT)">Sri Lanka Institute of Information Technology (SLIIT)</option>
              <option value="Informatics Institute of Technology (IIT)">Informatics Institute of Technology (IIT)</option>
              <option value="General Sir John Kotelawala Defence University (KDU)">General Sir John Kotelawala Defence University (KDU)</option>
              <option value="National Institute of Business Management (NIBM)">National Institute of Business Management (NIBM)</option>
              <option value="ESOFT Metro Campus">ESOFT Metro Campus</option>
              <option value="ICBT Campus">ICBT Campus</option>
              <option value="CINEC Campus">CINEC Campus</option>
              <option value="NSBM Green University">NSBM Green University</option>
              <option value="Curtin University Colombo">Curtin University Colombo</option>
              <option value="Asia Pacific Institute of Information Technology (APIIT)">Asia Pacific Institute of Information Technology (APIIT)</option>
              <option value="Nawaloka College of Higher Studies (NCHS)">Nawaloka College of Higher Studies (NCHS)</option>
              <option value="other">Other (Type your university)</option>
            </select>
            
            {formData.university === 'other' && (
              <input
                type="text"
                required
                placeholder="Enter your university name"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
                value={formData.customUniversity || ''}
                onChange={(e) => setFormData({ ...formData, customUniversity: e.target.value })}
              />
            )}
            <p className="text-xs text-gray-500 mt-1">All team members must be from the same university</p>
          </div>

          {/* Team Members */}
          {formData.members.map((member, index) => (
            <div key={index} className="mb-8 p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
              <h3 className="text-lg font-semibold octwave-gradient-text mb-4">
                Member {index + 1} {index === 0 && "(Leader)"}
              </h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
                    value={member.fullName}
                    onChange={(e) => updateMember(index, 'fullName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    IEEE Membership No (optional)
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
                    value={member.ieeeNumber}
                    onChange={(e) => updateMember(index, 'ieeeNumber', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
                    value={member.email}
                    onChange={(e) => updateMember(index, 'email', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Please enter the email address you used to sign up for Kaggle. If you use a different email here, you will not receive the competition invitation.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    pattern="^\\d{10}$"
                    maxLength={10}
                    minLength={10}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
                    value={member.phone}
                    onChange={(e) => {
                      // Only allow digits
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      updateMember(index, 'phone', value);
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter exactly 10 digits. Do not include +94 or spaces.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Year of Study <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
                    value={member.yearOfStudy}
                    onChange={(e) => updateMember(index, 'yearOfStudy', e.target.value)}
                  >
                    <option value="">Choose</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {/* Confirmation */}
          <div className="mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                checked={formData.confirmation}
                onChange={(e) => setFormData({ ...formData, confirmation: e.target.checked })}
              />
              <span className="text-sm">
                I confirm the details are correct above <span className="text-red-500">*</span>
              </span>
            </label>
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
            className={`w-full btn-primary text-lg py-4 transition-all duration-300 ${
              isSubmitting 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </div>
            ) : (
              'Register for OctWave 2.0'
            )}
          </button>
        </form>

        {/* Contact Information */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold octwave-gradient-text mb-4">📞 Contact Information:</h2>
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
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 text-center relative max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setRegistrationResult(null);
                  resetForm();
                }}
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full p-2 transition-colors z-10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Success Icon */}
              <div className="w-12 h-12 mx-auto mb-3 rounded-full octwave-gradient-bg flex items-center justify-center text-xl text-white">
                ✅
              </div>

              {/* Success Message */}
              <h3 className="text-xl font-bold octwave-gradient-text mb-3">
                Registration Successful!
              </h3>
              
              {/* Team ID Display */}
              {registrationResult && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-3">
                  <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">Your Team ID:</p>
                  <p className="text-lg font-bold text-blue-900 dark:text-blue-200">{registrationResult.teamId}</p>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                    Please save this ID for future reference
                  </p>
                </div>
              )}
              
              <p className="text-black/80 dark:text-white/90 mb-4 text-sm">
                Thank you for registering for OctWave 2.0! We'll contact you soon with further details.
              </p>

              {/* WhatsApp Group Section */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4">
                <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                  Join our WhatsApp group for updates:
                </h4>
                
                {/* WhatsApp Link Display */}
                <div className="bg-white dark:bg-gray-700 rounded-lg p-2 mb-2 border border-green-200 dark:border-green-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">WhatsApp Group Link:</p>
                  <p className="text-xs text-gray-800 dark:text-gray-200 font-mono break-all">
                    https://chat.whatsapp.com/J6RzyUaTL3NFOtDVjh2guG
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={(event) => {
                      navigator.clipboard.writeText('https://chat.whatsapp.com/J6RzyUaTL3NFOtDVjh2guG');
                      // Show a temporary feedback
                      const btn = event.target as HTMLButtonElement;
                      const originalText = btn.textContent;
                      btn.textContent = '✅ Copied!';
                      setTimeout(() => {
                        btn.textContent = originalText;
                      }, 2000);
                    }}
                    className="btn-primary inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-sm py-2"
                  >
                    📋 Copy WhatsApp Link
                  </button>
                  
                  <a 
                    href="https://chat.whatsapp.com/J6RzyUaTL3NFOtDVjh2guG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-sm py-2"
                  >
                    📱 Open WhatsApp Group
                  </a>
                </div>
              </div>

              {/* Close Modal Button */}
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setRegistrationResult(null);
                  resetForm();
                }}
                className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
