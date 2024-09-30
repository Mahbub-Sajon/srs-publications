import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { UserCredential } from "firebase/auth"; // Import UserCredential for Firebase type

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>(); // Explicitly typed form data

  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook to navigate after signup

  const onSubmit = (data: FormData) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result: UserCredential) => {
        // Explicit type for `result`
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate("/"); // Redirect to home page after successful signup
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="w-2/3 border-2 shadow-lg rounded-md mx-auto mt-36 text-center">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="input-group">
          <label className="block text-xl" htmlFor="name">
            Name
          </label>
          <input
            className="w-3/4 h-12 border border-black mb-4 rounded-md"
            type="text"
            {...register("name", { required: "Name is required" })}
            name="name"
          />
          {errors.name?.message && (
            <span className="text-red-600 block">
              {String(errors.name.message)}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="input-group">
          <label className="block text-xl" htmlFor="email">
            Email
          </label>
          <input
            className="w-3/4 h-12 border border-black mb-4 rounded-md"
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            name="email"
          />
          {errors.email?.message && (
            <span className="text-red-600 block">
              {String(errors.email.message)}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="input-group">
          <label className="block text-xl" htmlFor="password">
            Password
          </label>
          <input
            className="w-3/4 h-12 border border-black mb-4 rounded-md"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            name="password"
          />
          {errors.password?.message && (
            <span className="text-red-600 block">
              {String(errors.password.message)}
            </span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="input-group">
          <label className="block text-xl" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="w-3/4 h-12 border border-black mb-4 rounded-md"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) => {
                const password = document.querySelector(
                  "input[name='password']"
                ) as HTMLInputElement | null;
                return (
                  (password && value === password.value) ||
                  "Passwords do not match"
                );
              },
            })}
            name="confirmPassword"
          />
          {errors.confirmPassword?.message && (
            <span className="text-red-600 block">
              {String(errors.confirmPassword.message)}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <input
          className="w-32 h-12 bg-primary rounded-md mb-4 font-bold hover:bg-primary-foreground cursor-pointer text-white"
          type="submit"
          value="Sign up"
        />
      </form>

      <p className="mb-4 text-xl">
        Already have an account?{" "}
        <Link
          className="text-primary hover:text-primary-foreground"
          to="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
