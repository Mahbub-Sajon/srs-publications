import { createContext, useEffect, useState, ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import app from "@/firebase/firebase.config";

// Define the Item type for cart items
interface Item {
  _id: string;
  title: string;
  quantity: number;
  price: number;
  // Add other properties as needed
}

// Define the AuthContextType for better type safety
interface AuthContextType {
  user: User | null;
  loading: boolean;
  cartItems: Item[];
  addToCart: (item: Item) => void;
  createUser: (email: string, password: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  logOut: () => Promise<void>;
}

// Create the AuthContext with the specified type
export const AuthContext = createContext<AuthContextType | null>(null);
const auth = getAuth(app);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<Item[]>([]); // Cart items state

  // Create a new user with email and password
  const createUser = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false); // Stop loading after creating the user
      return userCredential.user; // Return the user object
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      throw error; // Rethrow the error for error handling
    }
  };

  // Sign in user with email and password
  const signIn = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false); // Stop loading after signing in
      return userCredential.user; // Return the user object
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      throw error; // Rethrow the error for error handling
    }
  };

  // Log out the user and clear cart items
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setCartItems([]); // Clear the cart when the user logs out
      setLoading(false); // Set loading to false after logout
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      throw error; // Rethrow the error for error handling
    }
  };

  // Add item to the cart
  const addToCart = (item: Item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        // Update the quantity if the item already exists in the cart
        return prevCartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Add the item if it's not already in the cart
        return [...prevCartItems, item];
      }
    });
  };

  // Observe authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once we know the user state
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Context value with the auth info
  const authInfo: AuthContextType = {
    user,
    loading,
    cartItems,
    addToCart,
    createUser,
    signIn,
    logOut, // Provide logOut function
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
