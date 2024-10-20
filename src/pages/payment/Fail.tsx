import Container from "@/components/layout/Container";

const Fail = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center mt-28 p-6 bg-red-100 rounded-lg shadow-md">
        <h1 className="text-5xl text-red-800 font-bold">Payment Failed</h1>
        <p className="mt-4 text-lg text-red-600">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          If the problem persists, contact our support team.
        </p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200"
        >
          Go to Home
        </a>
      </div>
    </Container>
  );
};

export default Fail;
