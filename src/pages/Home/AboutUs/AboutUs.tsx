import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { easeInOut, easeOut, motion } from "framer-motion";
import srs from "../../../assets/about/srs.jpg";

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
      y: -200,
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
      <Container className="grid grid-cols-1 md:grid-cols-2 place-content-center">
        <motion.div variants={intro} initial="hidden" animate="visible">
          <motion.h1
            className=" text-xl md:text-5xl font-bold mb-4"
            variants={introChildren}
          >
            About Us
          </motion.h1>
          <motion.p
            className="mb-5 text-lg max-w-[80ch]"
            variants={introChildren}
          >
            We are a dedicated team committed to alleviating hunger and
            providing relief in critical situations across Bangladesh. Through
            our food donation initiatives, we strive to support communities
            affected by floods, natural disasters, pandemics, and other
            challenges, ensuring that no one goes hungry during their time of
            need.
          </motion.p>
          <motion.div variants={introChildren}>
            <Button>Call for Aid</Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="w-3/4 md:w-full mx-auto"
          variants={laptop}
          initial="initial"
          animate="animate"
        >
          <img
            className="w-[90%] h-[80%] object-contain rounded-md"
            src={srs}
            alt=""
          />
        </motion.div>
      </Container>
    </div>
  );
};

export default AboutUs;
