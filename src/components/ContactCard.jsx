import React from "react";

export default function ContactCard({ compact = false }) {
  return (
    <>
      <div className="border border-slate-800 bg-black p-4 text-sm rounded-lg">
        <h3 className="text-sm font-semibold text-slate-50">Megaplan Ltd.</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-200 md:text-sm">
          12 Old Bond Street
          <br />
          Westminster, London
          <br />
          W1S 4PW
          <br />
          United Kingdom
        </p>
      </div>

      {!compact && (
        <>
          <div className="border border-slate-800 bg-black p-4 text-sm rounded-lg">
            <h3 className="text-sm font-semibold text-slate-50">
              Get in touch
            </h3>
            <p className="mt-1 text-xs text-slate-200 md:text-sm">
              Phone: +44 (0)20 3730 3151
              <br />
              E-mail: info@megaplan.co.uk
            </p>
          </div>

          <div className="border border-slate-800 bg-black p-4 text-sm rounded-lg">
            <h3 className="text-sm font-semibold text-slate-50">Our hours</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-200 md:text-sm">
              Typical office hours:
              <br />
              Monday – Friday, 09:00 – 18:00
              <br />
              (Times may vary on bank holidays.)
            </p>
          </div>
        </>
      )}
    </>
  );
}
