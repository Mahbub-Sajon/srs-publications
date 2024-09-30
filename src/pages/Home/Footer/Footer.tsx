import Container from "@/components/layout/Container";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Container className="bg-[#000] py-5 mt-10">
      <p className="text-center text-white">
        Copyright © SRS-Publications {year}. All rights reserved.
      </p>
    </Container>
  );
};

export default Footer;
