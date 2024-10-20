import AboutUs from "./AboutUs/AboutUs";
import TopSeller from "./TopSeller/TopSeller";
import BooksBanner from "./BooksBanner/BooksBanner";
import SupplyItemCards from "./SupplyItemCards/SupplyItemCards";

const Home = () => {
  return (
    <div>
      <BooksBanner />
      <SupplyItemCards />
      <TopSeller />
      <AboutUs />
    </div>
  );
};

export default Home;
