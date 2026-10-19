import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { TrustBadges } from '../components/TrustBadges';
import { FeaturedDishes } from '../components/FeaturedDishes';
import { HowItWorks } from '../components/HowItWorks';
import { StickyOrderButton } from '../components/StickyOrderButton';

export const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Section */}
      <Hero />

      {/* Trust Badges Bar */}
      <TrustBadges />

      {/* Fan Favorites 4-Card Section */}
      <FeaturedDishes />

      {/* How It Works 3-Step Section */}
      <HowItWorks />

      {/* Sticky Floating Order Button on scroll */}
      <StickyOrderButton />
    </motion.div>
  );
};
