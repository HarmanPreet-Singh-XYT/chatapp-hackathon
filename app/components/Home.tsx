import Blog from './Home/Blog';
import { Contact } from './Home/Contact';
import FAQ from './Home/FAQ';
import Features from './Home/Features';
import Footer from './Home/Footer';
import Hero from './Home/Hero';
import Leadership from './Home/Leadership';
import Nav from './Home/Nav';
import Newsletter from './Home/Newsletter';
import PricingComponent from './Home/Pricing';
import Stats from './Home/Stats';
import Works from './Home/Works';

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Keeping the existing nav */}
      <Nav/>

      {/* Enhanced Hero Section */}
      <Hero/>

      {/* Stats Section - Keeping existing but with tighter spacing */}
      <Stats/>

      {/* How It Works Section */}
      <Works/>

      {/* Enhanced Features Section */}
      <Features/>

      <PricingComponent/>

      {/* Team/Leadership Section */}
      <Leadership/>

      {/* FAQ Section */}
      <FAQ/>

      <Blog/>

      <Newsletter/>

      <Contact/>
      
      <Footer/>
    </div>
  );
}

export default Home;