
import React from 'react';

const TrustedBySection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xl font-semibold text-gray-700">Trusted by innovative teams</h2>
        </div>
        
        <div className="mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          {['Gemini', 'GitHub', 'Netlify', 'Supabase', 'Vercel'].map((logo, i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="h-12 text-gray-400 font-semibold text-xl opacity-70">
                {logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
