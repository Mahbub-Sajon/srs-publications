import Container from "@/components/layout/Container";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../assets/banner/banner1.png";
import img2 from "../../../assets/banner/banner2.png";
import img3 from "../../../assets/banner/banner3.png";

const BooksBanner = () => {
  return (
    <Container>
      <Carousel autoPlay infiniteLoop>
        <div>
          <img className="rounded-lg" src={img1} />
        </div>
        <div>
          <img className="rounded-lg" src={img2} />
        </div>
        <div>
          <img className="rounded-lg" src={img3} />
        </div>
      </Carousel>
    </Container>
  );
};

export default BooksBanner;
