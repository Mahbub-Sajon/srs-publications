import AboutUs from "./AboutUs/AboutUs";
import TopSeller from "./TopSeller/TopSeller";
import BooksBanner from "./BooksBanner/BooksBanner";
import SupplyItemCards from "./SupplyItemCards/SupplyItemCards";
import ReadingHabit from "./ReadingHabit/ReadingHabit";

const Home = () => {
  return (
    <div className="mt-28">
      <BooksBanner />
      <SupplyItemCards />
      <TopSeller />
      <AboutUs />
      <ReadingHabit />
    </div>
  );
};

export default Home;
