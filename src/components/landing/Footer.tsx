import React, { useState } from "react";
import { motion } from "framer-motion";

type LinkType = {
  label: string;
  href: string;
  badge?: string;
};

const footerLinks: Record<string, LinkType[]> = {
  Product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Conditions", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Security", href: "#" },
  ],
};

const socialLinks = [
  { name: "twitter", href: "#" },
  { name: "youtube", href: "#" },
  { name: "github", href: "#" },
  { name: "linkedin", href: "#" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState(false);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();

    // simple validation
    if (!email.includes("@")) return;

    setSub(true);
  };

  return (
    <footer className="relative overflow-hidden border-t border-emerald-500/15 bg-gradient-to-br from-slate-950 to-green-900 text-slate-200">
      
      {/* CTA Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 border-b border-white/[0.07] px-10 py-14 text-center"
      >
        <h2 className="mb-3 text-4xl font-bold leading-tight tracking-tight text-slate-100 md:text-5xl">
          Start building smarter{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            meetings today
          </span>
        </h2>

        <p className="text-xl font-semibold text-slate-300">
          Join 10,000+ teams saving hours every week.
        </p> <br /> <br />

        <form
          onSubmit={handleSub}
          className="mx-auto mt-6 flex max-w-md gap-2.5"
        >
          {sub ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-400">
              You're on the list!
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border border-white/[0.12] bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                Subscribe
              </button>
            </>
          )}
        </form>
      </motion.div>

      {/* Links Section */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-10 px-10 pb-10 pt-14 md:grid-cols-5">
        
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="mb-3 text-lg font-bold">MeetAI</h3>
          <p className="text-sm text-slate-500">
            AI-powered meeting intelligence platform.
          </p>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-600">
              {category}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-slate-200"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="ml-1 rounded bg-emerald-500/20 px-1 text-[10px] text-emerald-400">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-10 py-5 text-sm text-slate-600">
        <span>© 2025 MeetAI</span>

        <div className="flex gap-3">
          {socialLinks.map((s) => (
            <a key={s.name} href={s.href}>
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;