import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "@/components/Loading/Loading";

interface Book {
  _id: string;
  title: string;
  quantity: number;
}

const UnsoldBooks = () => {
  const [unsoldBooks, setUnsoldBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data: Book[] = await response.json();
        const unsold = data.filter((book) => book.quantity > 0); // Filtering unsold books
        setUnsoldBooks(unsold);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <motion.div
      className="p-4 bg-gray-800 rounded-lg shadow-md mt-10 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Unsold Books</h1>
      {unsoldBooks.length === 0 ? (
        <p className="text-center">No unsold books found.</p>
      ) : (
        <motion.table
          className="min-w-full border-collapse border border-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-gray-700">
            <tr>
              <th className="border border-gray-500 p-2">Book Name</th>
              <th className="border border-gray-500 p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {unsoldBooks.map((book) => (
              <motion.tr
                key={book._id}
                className="hover:bg-gray-600 transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="border border-gray-500 p-2">{book.title}</td>
                <td className="border border-gray-500 p-2">{book.quantity}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </motion.div>
  );
};

export default UnsoldBooks;
