import reading from "../../../assets/reading/reading.jpg";

const ReadingHabit = () => {
  return (
    <div
      className="relative flex items-center justify-center h-[40vh] md:h-[60vh] bg-cover bg-center text-white mt-10"
      style={{ backgroundImage: `url(${reading})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Dark overlay */}
      <div className="relative z-10 max-w-2xl text-center px-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          "Reading is to the mind what exercise is to the body."
        </h2>
        <p className="text-lg md:text-xl">
          A book a day keeps ignorance away. Discover worlds, enrich your mind,
          and nurture your soul through the power of reading.
        </p>
      </div>
    </div>
  );
};

export default ReadingHabit;
