import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
 
const Pricing: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
 
  const pricingTiers = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out',
      features: [
        '3 meetings per month',
        'Basic transcription',
        'Action item extraction',
        'Email summaries',
        'Community support'
      ],
      gradient: 'from-green-600 to-slate-900',
      popular: false
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      description: 'For growing teams',
      features: [
        'Unlimited meetings',
        'Advanced AI insights',
        'Team collaboration',
        'All integrations',
        'Priority support',
        'Custom branding',
        'Advanced analytics'
      ],
      gradient: 'from-green-600 to-slate-900',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated account manager',
        'SSO & advanced security',
        'Unlimited API access',
        '99.9% SLA guarantee'
      ],
      gradient: 'from-green-600 to-slate-800',
      popular: false
    }
  ];
 
  return (
    <section ref={ref} id="pricing" className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-white"></div>
      
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
            className="inline-block px-4 py-2 bg-purple-100 text-green-600 rounded-full text-sm font-semibold mb-4"
          >
             Pricing Plans
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose your{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              perfect plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing that grows with your team
          </p>
        </motion.div>
 
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={`relative ${tier.popular ? 'md:-mt-4' : ''}`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className={`bg-gradient-to-r ${tier.gradient} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    ⭐ MOST POPULAR
                  </div>
                </motion.div>
              )}
 
              {/* Card */}
              <div className={`
                relative bg-white rounded-3xl p-8 h-full
                ${tier.popular 
                  ? 'shadow-2xl border-2 border-purple-200 ring-4 ring-purple-100' 
                  : 'shadow-xl border border-gray-200 hover:border-purple-200'
                }
                transition-all duration-300
              `}>
                {/* Gradient Overlay */}
                {tier.popular && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-5 rounded-3xl`}></div>
                )}
 
                <div className="relative z-10">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
 
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className={`text-5xl font-bold bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}>
                        {tier.price}
                      </span>
                      {tier.price !== 'Custom' && (
                        <span className="text-gray-500 ml-2">/{tier.period}</span>
                      )}
                    </div>
                    {tier.price === 'Custom' && (
                      <span className="text-gray-500 text-sm">{tier.period}</span>
                    )}
                  </div>
 
                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="flex items-start"
                      >
                        <svg className={`w-6 h-6 mr-3 flex-shrink-0 ${tier.popular ? 'text-purple-600' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
 
                  {/* CTA Button */}
                  <Link
                    to="/signup"
                    className={`
                      block text-center w-full py-4 px-6 rounded-full font-bold text-lg
                      transition-all duration-300 transform hover:scale-105
                      ${tier.popular
                        ? `bg-gradient-to-r ${tier.gradient} text-white shadow-lg hover:shadow-2xl`
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }
                    `}
                  >
                    {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Link>
                </div>
 
                {/* Corner Decoration */}
                {tier.popular && (
                  <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-green-400 to-slate-900 opacity-20 rounded-full blur-2xl"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
 
        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-6 py-3 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-semibold">30-day money-back guarantee • No credit card required</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
 
export default Pricing;