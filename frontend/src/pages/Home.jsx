import FinalCTA from "../components/home/FinalCTA";
import Hero from "../components/home/Hero";
import ServicesPreview from "../components/home/ServicesPreview";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import About from "./About";


const Home = () => {
  return (
    <>
      <Hero />
      
      <ServicesPreview/>
      <Stats />
      <FinalCTA />
      <Testimonials/>
      
    </>
  );
};

export default Home;