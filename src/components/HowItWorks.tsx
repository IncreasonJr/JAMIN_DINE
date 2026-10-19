import React from 'react';
import { Smartphone, UtensilsCrossed, Bike, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Smartphone,
      title: 'Tap & Customize',
      description:
        'Browse our handcrafted smash burgers, golden sides, and thick milkshakes. Customize with patties, cheeses, and sauces.',
    },
    {
      step: '02',
      icon: UtensilsCrossed,
      title: 'Smashed Fresh',
      description:
        'Our grill masters smash each 100% Angus patty to crispy, lacy-edged perfection on screaming-hot flat tops upon order.',
    },
    {
      step: '03',
      icon: Bike,
      title: 'Delivered Hot & Fast',
      description:
        'Packed in thermal insulated packaging and rushed to your door in 30 minutes, or ready for swift counter pickup.',
    },
  ];

  return (
    <section className="py-20 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider uppercase text-primary bg-orange-100/70 px-3 py-1.5 rounded-full inline-block mb-3">
            Simple & Fast
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
            How Savory Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal-muted">
            Craving greatness? From tapping your screen to that first mouth-watering bite in 3 easy steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-3xl p-8 border border-orange-100 shadow-soft hover:shadow-warm transition-all duration-300 flex flex-col items-start group"
              >
                {/* Step Number Tag */}
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cream-200 group-hover:bg-primary text-charcoal group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-xs">
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>
                  <span className="text-4xl font-black text-orange-200/70 group-hover:text-primary/30 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-charcoal text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-warm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold">Ready to satisfy your cravings?</h4>
            <p className="text-sm text-cream-400">
              Apply code <span className="text-primary font-bold">FREEDEL</span> at checkout for free delivery on your first order!
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-warm transition-all shrink-0 group"
          >
            <span>Start Ordering</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
