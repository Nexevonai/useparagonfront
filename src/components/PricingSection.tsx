'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCheck, FaArrowRight } from 'react-icons/fa';

const PricingSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="pricing" className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-[#A855F7]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[#8B5CF6]/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">NEXEVON PRICING</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Choose the plan that works best for you</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {/* Starter Plan */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:border-[#A855F7]/30 group h-full"
          >
            <div className="p-5 flex flex-col h-full justify-between">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-[#A855F7] flex items-center justify-center mr-3">
                  <span className="text-white font-bold">🟣</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Starter</h3>
              </div>
              <p className="text-white/70 mb-4 text-sm">Perfect for solo operators, early founders, and curious builders.</p>
              
              <div className="mb-5">
                <div className="text-3xl font-bold text-white mb-1">$0 <span className="text-lg text-white/70">/mo</span></div>
                <div className="text-white/70">Free forever</div>
              </div>
              
              <div className="space-y-2 mb-5 text-sm">
                <div className="flex items-start">
                  <FaCheck className="text-[#A855F7] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">3 connected tools</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#A855F7] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">150 AI actions per month</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#A855F7] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Email & calendar workflows</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#A855F7] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Chat-based assistant access</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#A855F7] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Access to all core integrations</span>
                </div>
                <div className="flex items-start">
                  <FaArrowRight className="text-[#A855F7] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">No credit card required</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 mt-auto">
                <Link href="/signup">
                  <button className="w-full py-3 px-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:bg-[#A855F7]/20">
                    <span>Apply for Access</span>
                    <FaArrowRight className="text-sm opacity-70" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Pro Plan */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-900/60 backdrop-blur-sm border border-[#A855F7]/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:border-[#A855F7]/50 transform hover:-translate-y-1 relative z-20 group h-full"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A855F7] to-[#8B5CF6]"></div>
            <div className="p-5 flex flex-col h-full justify-between">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center mr-3">
                  <span className="text-white font-bold">🟪</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Pro</h3>
              </div>
              <p className="text-white/70 mb-4 text-sm">Your AI assistant on full throttle — for serious productivity.</p>
              
              <div className="mb-5">
                <div className="text-3xl font-bold text-white mb-1">$29 <span className="text-lg text-white/70">/mo</span></div>
                <div className="text-white/70">Billed monthly</div>
              </div>
              
              <div className="space-y-2 mb-5 text-sm">
                <div className="flex items-start">
                  <FaCheck className="text-[#8B5CF6] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">25 connected tools</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#8B5CF6] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">3,000 AI actions per month</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#8B5CF6] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Everything in Starter</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#8B5CF6] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Shopify + Klaviyo support</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#8B5CF6] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Automated follow-ups + email drafts</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#8B5CF6] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Priority calendar & file handling</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#8B5CF6] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Weekly AI usage summary</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 mt-auto">
                <Link href="/upgrade">
                  <button className="w-full py-3 px-6 bg-gradient-to-r from-[#A855F7] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#A855F7] text-white font-semibold rounded-lg transition-all duration-300 shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)] flex items-center justify-center space-x-2">
                    <span>Apply for Access</span>
                    <FaArrowRight className="text-sm" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Team Plan */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:border-[#A855F7]/30 group h-full"
          >
            <div className="p-5 flex flex-col h-full justify-between">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center mr-3">
                  <span className="text-white font-bold">🟧</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Team</h3>
              </div>
              <p className="text-white/70 mb-4 text-sm">For fast-moving teams who need AI working across everything.</p>
              
              <div className="mb-5">
                <div className="text-3xl font-bold text-white mb-1">$79 <span className="text-lg text-white/70">/mo</span></div>
                <div className="text-white/70">Per team</div>
              </div>
              
              <div className="space-y-2 mb-5 text-sm">
                <div className="flex items-start">
                  <FaCheck className="text-[#F97316] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Unlimited tools per user</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#F97316] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">10,000+ AI actions per month</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#F97316] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Shared assistant for teams</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#F97316] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Cross-tool workflows</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#F97316] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Collaborative tasks + approvals</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#F97316] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Usage-based scaling</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#F97316] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Priority support</span>
                </div>
                <div className="flex items-start">
                  <FaCheck className="text-[#F97316] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white/90">Custom onboarding</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 mt-auto">
                <Link href="/contact">
                  <button className="w-full py-3 px-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:bg-[#F97316]/20">
                    <span>Contact Sales</span>
                    <FaArrowRight className="text-sm opacity-70" />
                  </button>
                </Link>
                <Link href="/team-beta">
                  <button className="w-full py-3 px-6 bg-transparent border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Join Team Beta</span>
                    <FaArrowRight className="text-sm opacity-70" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Bonus Section - Plain Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 text-center"
        >
          <p className="text-white/80 text-lg">
            <span className="text-[#A855F7]">🧠</span> Every plan includes: One unified AI assistant • 100+ integrations • Natural language input • Chat interface + contextual memory • One-click approvals + automations
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
