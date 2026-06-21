import FinalCTA from "../components/home/FinalCTA";
import Hero from "../components/home/Hero";
import ServicesPreview from "../components/home/ServicesPreview";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import AdvisorySections from "../components/home/AdvisorySections";


const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesPreview/>
      <AdvisorySections />
      <Testimonials/>
      <FinalCTA />
      
    </>
  );
};

export default Home;
