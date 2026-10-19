import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Clock, ArrowRight, Star, ShieldCheck, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-charcoal text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Image with Dark & Warm Vignette Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=2000&q=80"
          alt="Savory handcrafted smash burgers and golden fries"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform motion-safe:animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-orange-200 text-xs sm:text-sm font-semibold tracking-wide"
            >
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                <Clock className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span>Hot & fresh in 30 min</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              Crave It. <br />
              Tap It. <br />
              <span className="text-primary underline decoration-primary/30 decoration-wavy decoration-2">
                Taste It.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-cream-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Smash burgers, crispy sides and thick shakes — made to order and delivered hot.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-base shadow-warm hover:shadow-warm-lg transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#fan-favorites"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-md border border-white/10 transition-colors"
              >
                <Flame className="w-4 h-4 text-primary" />
                <span>View Fan Favorites</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-cream-300">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white">4.9/5</span>
                <span className="text-white/60">(2,400+ reviews)</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent-green" />
                <span>Contactless Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/30 to-amber-500/10 blur-2xl -z-10" />

              <div className="relative rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-charcoal/80">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
                  alt="Savory Signature Classic Smash Burger"
                  className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Dish Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-charcoal shadow-float border border-white/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-primary flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-charcoal">Classic Double Smash</h4>
                      <p className="text-xs text-charcoal-muted">Angus beef • House sauce</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-primary">$8.50</span>
                    <span className="block text-[10px] text-accent-green font-semibold">Ready in 15m</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
