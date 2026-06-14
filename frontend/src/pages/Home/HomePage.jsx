import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/layout/Footer.jsx";

import HeroSection from "./HeroSection.jsx";
import FeaturesSection from "./FeaturesSection.jsx";
import CTASection from "./CTASection";
import StatsSection from "./StatsSection.jsx";
import CompanySection from "./CompanySection.jsx";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsSection/>
      <CompanySection/>
      <FeaturesSection/>
      <CTASection/>
      <Footer />
    </>
  );
}

export default HomePage;