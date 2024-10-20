import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "@/components/Loading/Loading";

interface Order {
  tran_id: string;
  product_name: string;
  total_amount: number;
  status: string;
  time: string; // Assuming this is an ISO string
}

const MyOrders = () => {
  const authContext = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (authContext?.user) {
        try {
          const response = await fetch(
            `https://srs-publications-server.vercel.app/api/payments?email=${authContext.user.email}`
          ); // Adjust the endpoint as necessary
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [authContext?.user]);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <motion.table
          className="min-w-full border-collapse border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Transaction ID</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Total Amount (BDT)</th>
              <th className="border border-gray-300 p-2">Payment Status</th>
              <th className="border border-gray-300 p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <motion.tr
                key={order.tran_id}
                className="hover:bg-gray-100 transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="border border-gray-300 p-2">{order.tran_id}</td>
                <td className="border border-gray-300 p-2">
                  {order.product_name}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.total_amount}
                </td>
                <td className="border border-gray-300 p-2">{order.status}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(order.time).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </div>
  );
};

export default MyOrders;
