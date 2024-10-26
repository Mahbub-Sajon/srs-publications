import Container from "@/components/layout/Container";
import { easeInOut, easeOut, motion } from "framer-motion";
import srs from "../../../assets/about/srs.webp";

const AboutUs = () => {
  const intro = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.5,
        delayChildren: 1,
      },
    },
  };

  const introChildren = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.5,
        ease: easeInOut,
      },
    },
  };

  const laptop = {
    initial: {
      y: 0,
      scale: 5,
      rotate: 0,
    },
    animate: {
      y: 20,
      scale: 1,
      transition: {
        duration: 1,
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: easeOut,
        },
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <Container className="flex flex-col md:flex-row items-center justify-center mx-auto px-4">
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0 flex flex-col text-center md:text-left lg:ml-20"
          variants={intro}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4 text-black"
            variants={introChildren}
          >
            About Us
          </motion.h1>
          <motion.p
            className="mb-5 text-lg md:text-xl max-w-[80ch] text-black mx-auto md:mx-0"
            variants={introChildren}
          >
            We are a dedicated team committed to alleviating hunger and
            providing relief in critical situations across Bangladesh. Through
            our food donation initiatives, we strive to support communities
            affected by floods, natural disasters, pandemics, and other
            challenges, ensuring that no one goes hungry during their time of
            need.
          </motion.p>
        </motion.div>
        <motion.div
          className="w-3/4 md:w-1/2 mx-auto max-w-[400px]"
          variants={laptop}
          initial="initial"
          animate="animate"
        >
          <img
            className="w-full h-auto object-contain rounded-md"
            src={srs}
            alt="Team Working"
          />
        </motion.div>
      </Container>
    </div>
  );
};

export default AboutUs;
