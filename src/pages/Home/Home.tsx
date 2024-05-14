import AboutUs from "./AboutUs/AboutUs";
import DonarTestimonials from "./TopSeller/TopSeller";
import Footer from "./Footer/Footer";
import BooksBanner from "./BooksBanner/BooksBanner";
import SupplyItemCards from "./SupplyItemCards/SupplyItemCards";

const Home = () => {
  return (
    <div>
      <BooksBanner />
      <SupplyItemCards />
      <DonarTestimonials />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
