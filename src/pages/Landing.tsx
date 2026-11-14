import Navigation from "@/components/landing/Navigation";
import Hero from "../components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Testimonial from "@/components/landing/Testimonial";
import Footer from "@/components/landing/Footer";

export const Landing = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 relative">
      {/* Background ambient lighting glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-[35%] right-[-10%] w-[700px] h-[700px] bg-teal-500/5 rounded-full blur-[180px]" />
        <div className="absolute top-[65%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[170px]" />
        <div className="absolute bottom-[-5%] right-1/4 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Features />
        <Pricing />
        <Testimonial />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;