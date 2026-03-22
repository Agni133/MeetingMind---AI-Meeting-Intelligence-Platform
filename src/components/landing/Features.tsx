// FILE: src/components/landing/AnimatedFeatures.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Features: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: 'Real-time Transcription',
      description: 'Automatically transcribe every word with 95%+ accuracy using advanced AI',
      gradient: 'from-green-500 to-slate-500',
      delay: 0
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Smart Action Items',
      description: 'AI extracts action items and assigns them automatically to team members',
      gradient: 'from-green-500 to-white',
      delay: 0.2
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Fast',
      description: 'Get meeting summaries instantly, saving hours of manual note-taking',
      gradient: 'from-slate-500 to-teal-500',
      delay: 0.4
    }
  ];

  return (
    <section ref={ref} id="features" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-green-400 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4"
          >
             Powerful Features
          </motion.span> <br/> <br/>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              supercharge
            </span>{' '}
            your meetings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered tools that transform how your team collaborates
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-slate-900 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 text-white shadow-lg`}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated Arrow */}
                <motion.div
                  initial={{ x: 0, opacity: 0 }}
                  whileHover={{ x: 5, opacity: 1 }}
                  className="mt-6 flex items-center text-purple-600 font-semibold"
                >
                  Learn more
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>

                {/* Corner Decoration */}
                <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 bg-gradient-to-r from-slate-900/10 to-slate-900 rounded-3xl p-12 text-white"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Why teams love MeetingMind</h3>
              <p className="text-purple-100 text-lg">
                Join thousands of teams saving 10+ hours per week with automated meeting intelligence
              </p>
            </div>
            <div className="space-y-4">
              {[
                '🎯 95%+ transcription accuracy',
                '⚡ Real-time processing',
                '🔒 Enterprise-grade security',
                '🌐 Works with all platforms'
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center space-x-3 text-lg"
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;