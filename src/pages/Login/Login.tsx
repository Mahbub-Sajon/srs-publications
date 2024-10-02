import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((userData) => {
        const user = userData.user;
        console.log("Logged in user:", user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Error during sign-in:", error.message);
      });
  };
  return (
    <div className="w-2/3 border-2 shadow-lg rounded-md mx-auto mt-36 text-center">
      <h1 className="text-3xl font-bold mb-4">Login</h1>

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label className="block text-xl" htmlFor="email">
            Email
          </label>
          <input
            className="w-3/4 h-12 border border-black mb-4 rounded-md"
            required
            type="email"
            name="email"
          />
        </div>

        <div className="input-group">
          <label className="block text-xl" htmlFor="password">
            Password
          </label>
          <input
            className="w-3/4 h-12 border border-black mb-4 rounded-md"
            required
            type="password"
            name="password"
          />
        </div>
        <p className="text-red-800"></p>

        <input
          className="w-32 h-12 bg-primary rounded-md mb-4 font-bold hover:bg-primary-foreground cursor-pointer text-white"
          type="submit"
          value="Login"
        />
      </form>

      <p className="mb-4 text-xl">
        Don't have any account?{" "}
        <Link
          className="text-primary hover:text-primary-foreground"
          to="/sign-up"
        >
          {" "}
          Create an account
        </Link>
      </p>

      <p className="mb-4 text-xl">
        Forgot Password?{" "}
        <Link
          className="text-primary hover:text-primary-foreground"
          to="/login"
        >
          {" "}
          Reset Password
        </Link>
      </p>
    </div>
  );
};

export default Login;
