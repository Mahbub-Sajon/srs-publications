import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get URL parameters
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";

interface PaymentData {
  tran_id: string;
  cus_name: string;
  cus_email: string;
  total_amount: number;
  status: string;
  product_name: string;
  quantity: string;
  cus_add: string;
}

const Success = () => {
  const { transactionId } = useParams(); // Get the transaction ID from the URL parameters
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/payments/transaction/${transactionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payment data");
        }
        const data = await response.json();
        setPaymentData(data);
      } catch (err) {
        setError("Failed to load payment data. Please try again later."); // Generic error message
      }
    };

    fetchPaymentData();
  }, [transactionId]);

  return (
    <div className="mt-28 text-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {paymentData ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
              <div className="space-y-3">
                <p>
                  <strong>Transaction ID:</strong> {paymentData.tran_id}
                </p>
                <p>
                  <strong>Book Title:</strong> {paymentData.product_name}
                </p>
                <p>
                  <strong>Quantity:</strong> {paymentData.quantity}
                </p>
                <p>
                  <strong>User Name:</strong> {paymentData.cus_name}
                </p>
                <p>
                  <strong>Email:</strong> {paymentData.cus_email}
                </p>
                <p>
                  <strong>Address:</strong> {paymentData.cus_add}
                </p>
                <p>
                  <strong>Amount:</strong> BDT {paymentData.total_amount}
                </p>
                <p>
                  <strong>Status:</strong> {paymentData.status}
                </p>
              </div>
            </div>
          ) : (
            <p>Loading payment details...</p>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default Success;
