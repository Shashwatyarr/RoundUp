import React from "react";
import { Link } from "react-router-dom";
import { BsShieldCheck } from 'react-icons/bs';
import { 
  BsFacebook, 
  BsInstagram, 
  BsWhatsapp, 
  BsMessenger, 
  BsPauseFill, 
  BsLink45Deg 
} from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';
import { SiWechat, SiNextdoor } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';
// --- Reusable Category Bubble Component ---
// This component takes props to define its image, label,
// and its positioning on the page.

const Step = ({ number, title, children, linkText, linkHref = "#" }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
      {number}
    </div>
    <div className="flex-grow">
      <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{children}</p>
      {linkText && (
        <a href={linkHref} className="text-sm text-gray-600 underline hover:text-green-700 mt-2 block">
          {linkText}
        </a>
      )}
    </div>
  </div>
);

const CategoryBubble = ({ imgSrc, label, containerClasses, labelClasses }) => {
  return (
    <div className={`absolute ${containerClasses} hidden md:block`}>
      <div className="relative p-2">
        <img
          src={imgSrc}
          alt={label}
          className="w-28 h-28 lg:w-36 lg:h-36 rounded-full object-cover border-8 border-green-600 shadow-lg"
        />
        <span
          className={`absolute bg-white shadow-md px-3 py-1 rounded-full text-sm font-semibold text-gray-700 ${labelClasses}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

// --- Main Home Component ---
export default function Home() {
  // Data for the bubbles, making them easy to manage
  const bubbleData = [
    {
      id: 1,
      label: "Your cause",
      imgSrc: "https://i.postimg.cc/gJ61Nkkq/your-cause.jpg",
      containerClasses: "top-0 left-1/4 lg:left-1/3",
      labelClasses: "bottom-0 left-1/2 -translate-x-1/2",
    },
    {
      id: 2,
      label: "Medical",
      imgSrc: "https://i.postimg.cc/bv5Kx28X/medical.jpg",
      containerClasses: "top-1/3 left-4 lg:left-16",
      labelClasses: "bottom-8 right-0 lg:-right-4",
    },
    {
      id: 3,
      label: "Emergency",
      imgSrc: "https://i.postimg.cc/R0Yj7nmX/emergency.jpg",
      containerClasses: "bottom-4 left-1/4 lg:left-1/3",
      labelClasses: "bottom-0 left-1/2 -translate-x-1/2",
    },
    {
      id: 4,
      label: "Education",
      imgSrc: "https://i.postimg.cc/25tPQBYs/education.jpg",
      containerClasses: "top-0 right-1/4 lg:right-1/3",
      labelClasses: "bottom-0 right-1/2 translate-x-1/2",
    },
    {
      id: 5,
      label: "Animal",
      imgSrc: "https://i.postimg.cc/63GFY559/animal.jpg",
      containerClasses: "top-1/3 right-4 lg:right-16",
      labelClasses: "bottom-8 left-0 lg:-left-4",
    },
    {
      id: 6,
      label: "Business",
      imgSrc: "https://i.postimg.cc/XvPTfy33/business-1.jpg",
      containerClasses: "bottom-4 right-1/4 lg:right-1/3",
      labelClasses: "bottom-0 left-1/2 -translate-x-1/2",
    },
  ];

  return (<>
    <div className="min-h-screen bg-white">
      {/* --- Hero Section --- */}
      <main>
        {/* Relative container for absolute positioning */}
        <div className="relative max-w-6xl mx-auto mt-12 md:mt-24 mb-24" style={{ height: "600px" }}>
          
          {/* 1. Central Text Content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full px-4">
            <span className="font-semibold text-gray-600">
              #1 crowdfunding platform
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 my-4">
              Successful<br />
              fundraisers<br />
              start here
            </h1>
            <Link
              to="/start-campaign"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Start a GoFundMe
            </Link>
          </div>

          {/* 2. Category Bubbles (Mapped from data) */}
          {bubbleData.map((bubble) => (
            <CategoryBubble
              key={bubble.id}
              imgSrc={bubble.imgSrc}
              label={bubble.label}
              containerClasses={bubble.containerClasses}
              labelClasses={bubble.labelClasses}
            />
          ))}
        </div>

        {/* --- Bottom Text Section --- */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xl md:text-2xl font-bold text-gray-800">
            More than $50 million is raised
            <br />
            every week on GoFundMe.*
          </p>
        </div>
      </main>
    </div>
    <div className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Heading --- */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 md:mb-20">
          Fundraising on GoFundMe is easy, powerful, and trusted
        </h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* --- Left Column: Graphic --- */}
          <div className="relative bg-green-600 rounded-3xl shadow-lg min-h-[550px] p-6 lg:p-8">
            <BsPauseFill className="absolute top-6 right-6 text-white text-2xl opacity-80" />

            {/* --- Floating Social Icons --- */}
            {/* These are positioned absolutely relative to the green card. Hidden on mobile. */}
            <div className="absolute top-24 left-10 hidden md:block">
              <BsInstagram className="text-5xl text-white bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 rounded-full p-2 shadow-lg" />
            </div>
            <div className="absolute top-16 left-1/3 hidden md:block">
              <SiNextdoor className="text-5xl text-white bg-[#00aa8a] rounded-full p-2 shadow-lg" />
            </div>
            <div className="absolute top-20 right-10 hidden md:block">
              <HiOutlineMail className="text-5xl text-white bg-blue-500 rounded-full p-2 shadow-lg" />
            </div>
            <div className="absolute top-1/3 -left-4 hidden md:block">
              <BsWhatsapp className="text-5xl text-white bg-[#25D366] rounded-full p-2 shadow-lg" />
            </div>
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 hidden md:block">
              <BsFacebook className="text-6xl text-white bg-[#1877F2] rounded-full p-2 shadow-lg" />
            </div>
            <div className="absolute top-1/3 right-1/4 hidden md:block">
              <SiWechat className="text-5xl text-white bg-[#09B83E] rounded-full p-2 shadow-lg" />
            </div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden md:block">
              <BsMessenger className="text-5xl text-white bg-gradient-to-b from-blue-500 to-purple-600 rounded-full p-2 shadow-lg" />
            </div>
            <div className="absolute top-2/3 left-1/2 -translate-x-1/2 hidden md:block">
              <FaXTwitter className="text-5xl text-white bg-black rounded-full p-3 shadow-lg" />
            </div>

            {/* --- Inner Fundraiser Card --- */}
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xs mx-auto mt-28 p-6 z-10">
              {/* Placeholder text lines */}
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-3"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2 mb-5"></div>
              {/* Progress bar */}
              <div className="bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            {/* --- Copy Link Section --- */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs z-20 px-6">
              <div className="flex items-center gap-3 text-white">
                <BsLink45Deg className="text-2xl flex-shrink-0" />
                <div>
                  <div className="font-bold">Copy link</div>
                  <div className="text-sm opacity-80">gofund.me/fundraiserurl</div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Right Column: Steps --- */}
          <div className="flex flex-col gap-10">
            <Step 
              number="1" 
              title="Use our tools to create your fundraiser"
              linkText="Get tips for starting your fundraiser"
            >
              You'll be guided by prompts to add fundraiser details and set your goal. Make updates anytime.
            </Step>

            <Step 
              number="2" 
              title="Reach donors by sharing"
            >
              Share your fundraiser link and use the resources in your dashboard to gain momentum.
            </Step>

            <Step 
              number="3" 
              title="Securely receive funds"
            >
              Add your bank information, or invite your fundraiser beneficiary to add theirs, and start receiving funds.
            </Step>
          </div>
          
        </div>
      </div>
    </div>
    <div className="bg-[#004B23] text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Content container, limited to max-w-4xl to match the text width */}
        <div className="max-w-4xl">
          <p className="font-bold text-lg mb-4">
            We've got you covered.
          </p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            GoFundMe is a trusted leader in online fundraising.
            With <a href="#" className="underline hover:no-underline">simple pricing</a> and a team of <a href="#" className="underline hover:no-underline">Trust & Safety</a> experts in your corner, you can raise money or make a donation with peace of mind.
          </h2>

          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-sm mt-8 opacity-90 hover:opacity-100 underline"
          >
            <BsShieldCheck className="text-lg" />
            Read the GoFundMe Giving Guarantee
          </a>
        </div>
        
      </div>
    </div>
    </>
  );
}