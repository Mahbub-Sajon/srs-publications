import Container from "@/components/layout/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import swiper1 from "../../../assets/swiper/swiper1.jpg";
import swiper2 from "../../../assets/swiper/swiper2.jpg";
import swiper3 from "../../../assets/swiper/swiper3.jpg";
import swiper4 from "../../../assets/swiper/swiper4.jpg";
import swiper5 from "../../../assets/swiper/swiper5.jpg";
import { Autoplay, Pagination } from "swiper/modules";
const DonarTestimonials = () => {
  return (
    <Container>
      <section className="z-10 md:z-0">
        <h1 className="text-center font-bold text-5xl">Top Selling Books</h1>
        <div className="flex justify-center items-center my-5">
          <p className=" max-w-[80ch]">
            "The Da Vinci Code" by Dan Brown unravels a riveting mystery through
            symbologist Robert Langdon's quest to decipher hidden messages. J.K.
            Rowling's "Harry Potter" series follows the magical journey of a
            young wizard, while J.R.R. Tolkien's "The Lord of the Rings" leads
            readers through an epic adventure in Middle-earth. Arthur Conan
            Doyle's "Sherlock Holmes" captivates with the detective's brilliant
            deductions.
          </p>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper mb-24"
          autoplay={{ delay: 2000 }}
        >
          <SwiperSlide>
            <img
              className="rounded-md w-[200px] h-[100px] md:h-[300px]"
              src={swiper1}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="rounded-md w-[200px] h-[100px] md:h-[300px]"
              src={swiper2}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="rounded-md w-[200px] h-[100px] md:h-[300px]"
              src={swiper3}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="rounded-md w-[200px] h-[100px] md:h-[300px]"
              src={swiper4}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="rounded-md w-[200px] h-[100px] md:h-[300px]"
              src={swiper5}
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </section>
    </Container>
  );
};
export default DonarTestimonials;
