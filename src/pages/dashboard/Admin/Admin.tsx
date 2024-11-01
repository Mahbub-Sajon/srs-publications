import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import Loading from "@/components/Loading/Loading";

interface BestSeller {
  productName: string;
  totalSales: number;
}

interface BestAuthor {
  authorName: string;
  totalSales: number;
}

interface HalfYearlySale {
  month: string;
  totalSales: number;
  productName?: string; // Add optional product name
  authorName?: string; // Add optional author name
}

interface StatisticsData {
  bestSellers: BestSeller[];
  bestAuthors: BestAuthor[];
  halfYearlySales: HalfYearlySale[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black bg-opacity-80 text-white p-2 rounded-md shadow-lg">
        <p className="font-semibold">{label}</p>
        <p>{`Total Sales: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Admin = () => {
  const authContext = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [statisticsData, setStatisticsData] = useState<StatisticsData>({
    bestSellers: [],
    bestAuthors: [],
    halfYearlySales: [],
  });

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authContext?.user) {
        try {
          const response = await fetch(
            `https://srs-publications-server.vercel.app/api/users/admin/${authContext.user.email}`
          );
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error("Error fetching admin status:", error);
        }
      }
      setLoading(false);
    };
    checkAdminStatus();
  }, [authContext?.user]);

  useEffect(() => {
    const fetchStatisticsData = async () => {
      if (isAdmin) {
        setLoading(true);
        try {
          const response = await fetch(
            "https://srs-publications-server.vercel.app/api/payments/statistics"
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setStatisticsData({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            bestSellers: data.bestSellers.map((item: any) => ({
              productName: item.productName,
              totalSales: item.totalSales,
            })),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            bestAuthors: data.bestAuthors.map((item: any) => ({
              authorName: item.authorName,
              totalSales: item.totalSales,
            })),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            halfYearlySales: data.bestSellers.map((item: any) => ({
              month: item.month,
              totalSales: item.totalSales,
              productName: item.productName, // Ensure the product name is included
              authorName: item.authorName, // Ensure the author name is included
            })),
          });
        } catch (error) {
          console.error("Error fetching statistics:", error);
        }
        setLoading(false);
      }
    };
    fetchStatisticsData();
  }, [isAdmin]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center"
      >
        <Loading />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white p-6"
    >
      <h1 className="text-4xl font-bold text-center mb-6">Dashboard</h1>

      {isAdmin ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-lg shadow-lg p-4 h-full"
          >
            <h2 className="text-2xl font-semibold mb-4">Best Sellers</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statisticsData.bestSellers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productName" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="totalSales" fill="#ff4d4d" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-lg shadow-lg p-4 h-full"
          >
            <h2 className="text-2xl font-semibold mb-4">Best Authors</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statisticsData.bestAuthors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="authorName" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="totalSales" fill="#4dff88" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-lg shadow-lg p-4 h-full"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Half-Yearly Sales (July - December)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statisticsData.bestSellers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productName" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="totalSales" fill="#ff4d" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      ) : (
        <p className="text-center text-white mt-6">This is your Dashboard</p>
      )}
    </motion.div>
  );
};

export default Admin;
