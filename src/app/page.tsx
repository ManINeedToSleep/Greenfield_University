"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

export default function LandingPage() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const initials = [
    { src: "/G_logo.png", alt: "G" },
    { src: "/U_logo.png", alt: "U" }
  ];

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    setIsFirstVisit(!hasVisited);
    
    if (!hasVisited) {
      // If first visit, set the flag
      localStorage.setItem('hasVisitedBefore', 'true');
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // If returning visitor, skip animation
      setShowAnimation(false);
    }
  }, []);

  const imageVariants = {
    initial: (index: number) => ({
      x: index === 0 ? "-100vw" : "100vw",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 1, ease: "easeIn" },
    },
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1 } 
    },
  };

  return (
    <AnimatePresence mode="wait">
      {showAnimation && isFirstVisit ? (
        <motion.div
          key="animation"
          className="fixed inset-0 flex justify-center items-center bg-emerald-50 z-50"
        >
          <div className="flex w-full justify-center items-center gap-4">
            {initials.map((initial, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-[40vh] relative aspect-square"
              >
                <Image
                  src={initial.src}
                  alt={initial.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Introduction Section */}
          <section className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-emerald-900">Welcome to Greenfield University</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nestled in <b>Greenfield Valley</b>, Vermont, Greenfield University has been a beacon of
                education and innovation since <b>1875</b>. Our scenic campus offers the ideal environment
                for academic achievement and personal growth. Explore our programs, admissions, and campus life
                to see how we shape tomorrow&apos;s leaders. With a commitment to sustainability, diversity, and excellence,
                Greenfield University offers over <b>100 programs</b> in engineering, health sciences, business, and the arts.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our faculty and staff are dedicated to nurturing curiosity, fostering collaboration, and empowering
                students to excel. Whether you&apos;re exploring renewable energy or the creative arts, you&apos;ll find a program
                that inspires success. Our campus is more than just a place to learn—it&apos;s a vibrant community for cultural,
                social, and athletic activities. From the historic <b>Founders Hall</b> to the modern <b>Innovation Center</b>
                and <b>Greenfield Library</b>, our facilities support both academic and extracurricular pursuits, offering
                opportunities to connect, create, and grow within a diverse and supportive student body.
              </p>
            </div>
            <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/campus/College.jpg"
                alt="Greenfield University Campus"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          {/* Campus Highlights Section */}
          <section className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold mb-8 text-emerald-900 text-center">Campus Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/campus/library.jpg"
                    alt="Greenfield Library"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Greenfield Library</h3>
                <p className="text-gray-600 leading-relaxed">
                  A state-of-the-art research facility with over 1 million books and digital resources.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/campus/innovation.jpg"
                    alt="Innovation Center"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Innovation Center</h3>
                <p className="text-gray-600 leading-relaxed">
                  A hub for startups and entrepreneurship, helping students bring their ideas to life.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/campus/arts.jpg"
                    alt="Performing Arts Center"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Greenfield Performing Arts Center</h3>
                <p className="text-gray-600 leading-relaxed">
                  Hosting theater productions, concerts, and guest speakers throughout the year.
                </p>
              </div>
            </div>
          </section>

          {/* News Section */}
          <section className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold mb-8 text-emerald-900 text-center">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/news/enrollment.jpg"
                    alt="Application Process"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Apply Now</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Start your journey at Greenfield University. Applications open for Fall 2025.
                </p>
                <Link 
                  href="/apply/undergraduate"
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/open-houses/campus.jpg"
                    alt="Campus Visit"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Visit Campus</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Experience our campus in person or through virtual tours.
                </p>
                <Link 
                  href="/visit/open-houses"
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Schedule a Visit →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-emerald-600">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/images/virtual/webinar.jpg"
                    alt="Virtual Tour"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Virtual Tours</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Can&apos;t visit in person? Take a virtual tour of our campus.
                </p>
                <Link 
                  href="/visit/virtual"
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Take the Tour →
                </Link>
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
