import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -18, 0],
      visible:{
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100">

      {/* Soft radial glow background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-green-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-10"
          >

            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-2xl font-medium mb-6"
            >
              AI Meeting Intelligence Platform
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Deliver the {''}
              <div className="text-emerald-400"> Perfect Insight
              </div>{' '}
              from every meeting
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl mb-8 text-slate-400 leading-relaxed max-w-xl"
            >
              Automatically capture, summarize, and extract action items
              from your meetings with AI-powered intelligence.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-4">
              <Link
                to="/signup"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition"
              >
                Get Started
              </Link>

              <button className="border border-slate-700 hover:border-slate-500 px-8 py-4 rounded-xl font-semibold text-slate-300 hover:bg-slate-800 transition">
                Live Demo
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-6 text-sm text-slate-500"
            >
              <span>Trusted by 2,000+ teams</span>
              <span>•</span>
              <span>Secure & Private</span>
            </motion.div>

          </motion.div>

          {/* RIGHT — DARK DASHBOARD CARD */}
          <motion.div
            variants ={floatingVariants}
            animate="animate"
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >

              <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl p-8">

                {/* header */}
                <div className="flex justify-between mb-6">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg" />
                    <div className="h-4 w-28 bg-slate-700 rounded" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-slate-800 rounded-full" />
                    <div className="w-8 h-8 bg-slate-800 rounded-full" />
                  </div>
                </div>

                {/* stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {["142", "89"].map((v, i) => (
                    <div
                      key={i}
                      className="bg-slate-800 border border-slate-700 rounded-2xl p-4"
                    >
                      <div className="text-3xl font-bold text-emerald-400 mb-2">
                        {v}
                      </div>
                      <div className="h-2 bg-slate-700 rounded w-16" />
                    </div>
                  ))}
                </div>

                {/* chart */}
                <div className="bg-slate-800 rounded-2xl p-6">
                  <div className="flex items-end h-32 gap-2">
                    {[40, 70, 45, 80, 60, 90, 55].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="flex-1 bg-emerald-500/70 rounded-t-lg"
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* floating badge */}
              <div className="absolute -top-6 -right-6 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
                <div className="text-emerald-400 font-semibold text-sm">
                  +32% Productivity
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
