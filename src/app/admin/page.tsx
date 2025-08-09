"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface TeamMember {
  fullName: string;
  ieeeNumber: string;
  email: string;
  phone: string;
  yearOfStudy: string;
  kaggleId: string;
}

interface Registration {
  id: string;
  teamName: string;
  university: string;
  contactEmail: string;
  teamMembers: TeamMember[];
  registrationDate: string;
  status: string;
}

type SortOption = 'date' | 'teamName' | 'university' | 'memberCount';
type FilterOption = 'all' | 'university';

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [universityFilter, setUniversityFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  
  // Stats
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    totalParticipants: 0,
    universitiesCount: 0,
    avgTeamSize: 0,
    currentCounter: 0,
    nextTeamId: ''
  });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [registrations, searchTerm, sortBy, sortOrder, universityFilter, yearFilter]);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/register');
      const data = await response.json();
      
      if (response.ok) {
        const regs = data.registrations.map((reg: any) => ({
          ...reg,
          teamMembers: typeof reg.teamMembers === 'string' 
            ? JSON.parse(reg.teamMembers) 
            : reg.teamMembers
        }));
        
        setRegistrations(regs);
        calculateStats(regs);
      } else {
        setError(data.error || 'Failed to fetch registrations');
      }
    } catch (err) {
      setError('Network error while fetching registrations');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = async (regs: Registration[]) => {
    const totalParticipants = regs.reduce((sum, reg) => sum + reg.teamMembers.length, 0);
    const universities = new Set(regs.map(reg => reg.university));
    const avgTeamSize = regs.length > 0 ? totalParticipants / regs.length : 0;

    // Get current counter information
    try {
      const counterResponse = await fetch('/api/team-counter');
      const counterData = await counterResponse.json();
      
      setStats({
        totalRegistrations: regs.length,
        totalParticipants,
        universitiesCount: universities.size,
        avgTeamSize: Math.round(avgTeamSize * 10) / 10,
        currentCounter: counterData.currentCounter || 0,
        nextTeamId: counterData.nextTeamId || 'OW_1'
      });
    } catch (error) {
      console.error('Error fetching counter info:', error);
      setStats({
        totalRegistrations: regs.length,
        totalParticipants,
        universitiesCount: universities.size,
        avgTeamSize: Math.round(avgTeamSize * 10) / 10,
        currentCounter: 0,
        nextTeamId: 'OW_1'
      });
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...registrations];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(reg =>
        reg.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.teamMembers.some(member => 
          member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply university filter
    if (universityFilter) {
      filtered = filtered.filter(reg => reg.university === universityFilter);
    }

    // Apply year filter
    if (yearFilter) {
      filtered = filtered.filter(reg =>
        reg.teamMembers.some(member => member.yearOfStudy === yearFilter)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'date':
          aValue = new Date(a.registrationDate);
          bValue = new Date(b.registrationDate);
          break;
        case 'teamName':
          aValue = a.teamName.toLowerCase();
          bValue = b.teamName.toLowerCase();
          break;
        case 'university':
          aValue = a.university.toLowerCase();
          bValue = b.university.toLowerCase();
          break;
        case 'memberCount':
          aValue = a.teamMembers.length;
          bValue = b.teamMembers.length;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredRegistrations(filtered);
  };

  const exportToCSV = () => {
    const headers = [
      'Team ID',
      'Team Name',
      'University',
      'Contact Email',
      'Registration Date',
      'Team Size',
      'Member 1 Name',
      'Member 1 Email',
      'Member 1 Phone',
      'Member 1 Year',
      'Member 1 IEEE',
      'Member 1 Kaggle',
      'Member 2 Name',
      'Member 2 Email',
      'Member 2 Phone',
      'Member 2 Year',
      'Member 2 IEEE',
      'Member 2 Kaggle',
      'Member 3 Name',
      'Member 3 Email',
      'Member 3 Phone',
      'Member 3 Year',
      'Member 3 IEEE',
      'Member 3 Kaggle',
      'Member 4 Name',
      'Member 4 Email',
      'Member 4 Phone',
      'Member 4 Year',
      'Member 4 IEEE',
      'Member 4 Kaggle'
    ];

    const csvData = filteredRegistrations.map(reg => {
      const row = [
        reg.id,
        reg.teamName,
        reg.university,
        reg.contactEmail,
        new Date(reg.registrationDate).toLocaleDateString(),
        reg.teamMembers.length.toString()
      ];

      // Add member data (up to 4 members)
      for (let i = 0; i < 4; i++) {
        const member = reg.teamMembers[i];
        if (member) {
          row.push(
            member.fullName,
            member.email,
            member.phone,
            member.yearOfStudy,
            member.ieeeNumber || '',
            member.kaggleId || ''
          );
        } else {
          row.push('', '', '', '', '', ''); // Empty values for missing members
        }
      }

      return row;
    });

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `octwave_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportContactsCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'University', 'Year of Study', 'Team Name', 'IEEE Number', 'Kaggle ID'];
    
    const contactsData: string[][] = [];
    
    filteredRegistrations.forEach(reg => {
      reg.teamMembers.forEach(member => {
        contactsData.push([
          member.fullName,
          member.email,
          member.phone,
          reg.university,
          member.yearOfStudy,
          reg.teamName,
          member.ieeeNumber || '',
          member.kaggleId || ''
        ]);
      });
    });

    const csvContent = [headers, ...contactsData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `octwave_contacts_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getUniqueUniversities = () => {
    return [...new Set(registrations.map(reg => reg.university))].sort();
  };

  const getUniqueYears = () => {
    const years = new Set<string>();
    registrations.forEach(reg => {
      reg.teamMembers.forEach(member => {
        years.add(member.yearOfStudy);
      });
    });
    return [...years].sort();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold octwave-gradient-text">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage OctWave 2.0 registrations</p>
            </div>
            <Link href="/" className="btn-ghost">
              ← Back to Home
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold octwave-gradient-text">{stats.totalRegistrations}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Teams</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold octwave-gradient-text">{stats.totalParticipants}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Participants</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold octwave-gradient-text">{stats.universitiesCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Universities</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold octwave-gradient-text">{stats.avgTeamSize}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Team Size</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold octwave-gradient-text">{stats.nextTeamId}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Next Team ID</div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="card p-6 mb-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                placeholder="Team name, university, email..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* University Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">University</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
                value={universityFilter}
                onChange={(e) => setUniversityFilter(e.target.value)}
              >
                <option value="">All Universities</option>
                {getUniqueUniversities().map(uni => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Year of Study</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="">All Years</option>
                {getUniqueYears().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="date">Registration Date</option>
                <option value="teamName">Team Name</option>
                <option value="university">University</option>
                <option value="memberCount">Team Size</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium mb-2">Order</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="btn-primary flex items-center gap-2"
            >
              📊 Export Teams CSV
            </button>
            <button
              onClick={exportContactsCSV}
              className="btn-ghost flex items-center gap-2"
            >
              📇 Export Contacts CSV
            </button>
            <button
              onClick={fetchRegistrations}
              className="btn-ghost flex items-center gap-2"
            >
              🔄 Refresh
            </button>
          </div>

          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredRegistrations.length} of {registrations.length} registrations
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="card p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Registrations Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Team</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">University</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Contact</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Members</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRegistrations.map((registration) => (
                  <>
                    <tr key={registration.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-semibold">{registration.teamName}</div>
                          <div className="text-sm text-gray-500">ID: {registration.id}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">{registration.university}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">{registration.contactEmail}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <div className="font-medium">{registration.teamMembers.length} members</div>
                          <div className="text-gray-500">
                            {registration.teamMembers.map(member => member.fullName).join(', ')}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          {new Date(registration.registrationDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => {
                            // Toggle detailed view for this registration
                            const element = document.getElementById(`details-${registration.id}`);
                            if (element) {
                              element.style.display = element.style.display === 'none' ? 'table-row' : 'none';
                            }
                          }}
                          className="text-purple-600 hover:text-purple-800 text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                    {/* Detailed View Row */}
                    <tr id={`details-${registration.id}`} style={{ display: 'none' }} className="bg-gray-50 dark:bg-gray-800">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="space-y-4">
                          <h4 className="font-semibold">Team Members:</h4>
                          <div className="grid gap-4 md:grid-cols-2">
                            {registration.teamMembers.map((member, index) => (
                              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                <h5 className="font-medium">{member.fullName} {index === 0 && '(Leader)'}</h5>
                                <div className="text-sm space-y-1 mt-2">
                                  <div><strong>Email:</strong> {member.email}</div>
                                  <div><strong>Phone:</strong> {member.phone}</div>
                                  <div><strong>Year:</strong> {member.yearOfStudy}</div>
                                  {member.ieeeNumber && <div><strong>IEEE:</strong> {member.ieeeNumber}</div>}
                                  {member.kaggleId && <div><strong>Kaggle:</strong> {member.kaggleId}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRegistrations.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No registrations found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
