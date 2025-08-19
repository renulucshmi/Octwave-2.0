import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  company: string;
  phone: string;
  linkedIn: string;
  image: string;
}

interface ContactCardProps {
  member: TeamMember;
}

const ContactCard: React.FC<ContactCardProps> = ({ member }) => {
  return (
    <div className="group relative perspective-1000 h-full min-h-[440px] flex items-center justify-center w-full">
      <div className="w-full">
        {/* Main card container with 3D transform - made more transparent */}
        <div className="relative w-full bg-slate-900/20 backdrop-blur-md rounded-2xl p-6 border border-slate-700/20 transition-all duration-700 ease-out transform-gpu hover:rotate-y-6 hover:rotate-x-3 hover:scale-102 shadow-lg shadow-slate-900/20 preserve-3d">
          
          {/* Animated background pattern - reduced opacity */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/3 via-transparent to-cyan-600/3" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Floating geometric shapes - reduced opacity */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute bottom-4 left-4 w-10 h-10 bg-gradient-to-tr from-pink-500/5 to-purple-500/5 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-800 delay-200" />
          </div>

          {/* Glowing border effect - reduced opacity */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
          <div className="absolute inset-[1px] rounded-3xl bg-slate-900/10 backdrop-blur-md" />
          
          {/* Content container */}
          <div className="relative z-10">
            {/* Enhanced Profile Image with floating effect */}
            <div className="relative flex justify-center mb-10">
              <div className="relative group/image">
                {/* Image container - made more transparent */}
                 <div className="relative p-2.5 rounded-full transform transition-all duration-500 group-hover:scale-105 shadow-md shadow-slate-900/10 hover:shadow-slate-900/20">
                  <div className="bg-slate-900/30 rounded-full p-2 shadow-inner">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-slate-600/30 transition-all duration-500 group-hover/image:brightness-110 group-hover/image:contrast-110"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Name and Position */}
            <div className="text-center mb-6 transform transition-all duration-500 group-hover:translate-y-0.5">
              <h3 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2 group-hover:from-purple-300 group-hover:via-white group-hover:to-cyan-300 transition-all duration-500">
                {member.name}
              </h3>
              <p className="text-gray-300 text-sm font-semibold mb-1 group-hover:text-purple-300 transition-colors duration-300">
                {member.position}
              </p>
              <p className="text-gray-400 text-xs font-medium group-hover:text-gray-300 transition-colors duration-300">
                {member.company}
              </p>
              
              {/* Decorative line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-20" />
            </div>

            {/* Enhanced Contact Information - made more transparent */}
            <div className="space-y-3 transform transition-all duration-500 group-hover:translate-y-0.5">
              <a
                href={`tel:${member.phone}`}
                className="flex items-center p-2 rounded-lg bg-slate-800/10 border border-slate-700/20 text-gray-300 hover:text-white hover:bg-cyan-600/10 hover:border-cyan-500/30 transition-all duration-300 group/phone transform hover:translate-x-1 hover:shadow-sm hover:shadow-cyan-500/5"
              >
                <div className="relative">
                  <Phone className="w-4 h-4 mr-3 text-gray-400 group-hover/phone:text-cyan-400 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-0 group-hover/phone:opacity-10 blur-md transition-opacity duration-300" />
                </div>
                <span className="text-xs font-medium">{member.phone}</span>
              </a>
              
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 rounded-lg bg-slate-800/10 border border-slate-700/20 text-gray-300 hover:text-white hover:bg-blue-600/10 hover:border-blue-500/30 transition-all duration-300 group/linkedin transform hover:translate-x-1 hover:shadow-sm hover:shadow-blue-500/5"
              >
                <div className="relative">
                  <Linkedin className="w-4 h-4 mr-3 text-gray-400 group-hover/linkedin:text-blue-400 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-blue-400 rounded-full opacity-0 group-hover/linkedin:opacity-10 blur-md transition-opacity duration-300" />
                </div>
                <span className="text-xs font-medium">LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Enhanced hover glow effect - reduced opacity */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* Additional depth layers - reduced opacity */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-xl -z-10" />
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-700/5 to-cyan-700/5 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 blur-2xl -z-20" />
        </div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    id: 1,
    name: 'Rashmitha Hansamal',
    position: 'Co-chair',
    company: 'OctWave 2.0',
    phone: '+94776057351',
    linkedIn: 'https://www.linkedin.com/in/rashmitha-hansamal-610452271/',
    image: "image1.JPG",
  },
  {
    id: 2,
    name: 'Renulucshmi Prakasan',
    position: 'Co-chair',
    company: 'OctWave 2.0',
    phone: '+94754350533',
    linkedIn: 'https://www.linkedin.com/in/renulucshmi/',
    image: 'image2.webp',
  },
  {
    id: 3,
    name: 'Abinaya Subramaniam',
    position: 'Co-chair',
    company: 'OctWave 2.0',
    phone: '+94763885326',
    linkedIn: 'https://www.linkedin.com/in/abinaya-subramaniam-b2a16425b/',
    image: 'image3.jpg',
  },
];

const ContactCards: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-slate-950 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto w-full px-6">
        {teamMembers.map((member) => (
          <ContactCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default ContactCards;