import Hero from '../../components/home/hero';
import Category from '../../components/home/category';
import FeaturedAnimals from '../../components/home/featuredAnimals';
import PromoSection from '../../components/home/promoSection';
import FeaturesSection from '../../components/home/featuresSection';
import Events from '../../components/home/events';
import EduSection from '../../components/home/eduSection';
import DonationSection from '../../components/home/donationSection';
import Testimonial from '../../components/home/testimonial';
import Faq from '../../components/home/faq';
import Footer from '../../components/layout/footer/footer';

function home() {
  return (
    <>
      <Hero />
      <Category />
      <FeaturedAnimals />
      <PromoSection />
      <FeaturesSection />
      <Events />
      <EduSection />
      <DonationSection />
      <Testimonial />
      <Faq />
      <Footer />
    </>
  );
}

export default home;
