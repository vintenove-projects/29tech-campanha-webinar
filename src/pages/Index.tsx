import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import StatsBar from "@/components/StatsBar";
import EntryPoints from "@/components/EntryPoints";
import OutsourcingSection from "@/components/OutsourcingSection";
import DarkSection from "@/components/DarkSection";
import SoftwareHouseSection from "@/components/SoftwareHouseSection";
import Testimonials from "@/components/Testimonials";
import DiagnosticForm from "@/components/DiagnosticForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import AppWrapper from "@/components/AppWrapper";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace("#", ""));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return (
  <AppWrapper>
    <Navbar />
    <Hero />
    <StatsBar />
    <EntryPoints />
    <OutsourcingSection />
    <DarkSection />
    <SoftwareHouseSection />
    <TechMarquee />
    <Testimonials />
    <DiagnosticForm />
    <FAQ />
    <Footer />
  </AppWrapper>
  );
};

export default Index;
