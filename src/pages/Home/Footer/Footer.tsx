import Container from "@/components/layout/Container";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Container className="bg-secondary py-5 mt-10">
      <p className="text-center text-white">
        Copyright © Nutrition-Net {year}. All rights reserved.
      </p>
    </Container>
  );
};

export default Footer;
