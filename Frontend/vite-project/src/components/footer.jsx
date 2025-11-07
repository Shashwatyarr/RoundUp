import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BsFacebook, 
  BsYoutube, 
  BsTwitter, 
  BsInstagram, 
  BsMedium 
} from 'react-icons/bs';

// Data for footer links, organized by column
const footerLinks = [
  {
    title: 'Learn',
    links: [
      { name: 'How RoundUp works', path: '#' },
      { name: 'Why RoundUp', path: '#' },
      { name: 'Common questions', path: '#' },
      { name: 'Success stories', path: '#' },
    ],
  },
  {
    title: 'Fundraise for',
    links: [
      { name: 'Medical', path: '#' },
      { name: 'Emergency', path: '#' },
      { name: 'Memorial', path: '#' },
      { name: 'Education', path: '#' },
      { name: 'Nonprofit', path: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Help center', path: '#' },
      { name: 'Blog', path: '#' },
      { name: 'RoundUp Stories', path: '#' },
      { name: 'Press center', path: '#' },
      { name: 'Careers', path: '#' },
    ],
  },
  {
    title: 'About',
    links: [
      { name: 'About RoundUp', path: '#' },
      { name: 'Our team', path: '#' },
      { name: 'In the news', path: '#' },
    ],
  },
];

// Social media icons component
const SocialIcons = () => (
  <div className="flex gap-5">
    <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white transition-colors">
      <BsFacebook size={24} />
    </a>
    <a href="#" aria-label="YouTube" className="text-gray-300 hover:text-white transition-colors">
      <BsYoutube size={24} />
    </a>
    <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white transition-colors">
      <BsTwitter size={24} />
    </a>
    <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors">
      <BsInstagram size={24} />
    </a>
    <a href="#" aria-label="Medium" className="text-gray-300 hover:text-white transition-colors">
      <BsMedium size={24} />
    </a>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-[#004B23] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* --- Top Section: Logo and Social --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <Link to="/" className="text-3xl font-bold text-white">
            RoundUp
          </Link>
          <SocialIcons />
        </div>

        {/* --- Middle Section: Links Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-gray-300 mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm hover:underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Empty div to fill the 5th column on lg screens if 4 columns are used */}
          <div className="hidden lg:block"></div>
        </div>

        {/* --- Bottom Section: Legal & Copyright --- */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} RoundUp, Inc.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/legal" className="hover:underline">Legal</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}