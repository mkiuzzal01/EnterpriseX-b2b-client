import TextInput from "../../utils/input-fields/TextInput";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import ReusableForm from "../../shared/ReusableFrom";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    if (data.email === "demo@gmail.com" && data.password === "12345") {
      alert("Login successful!");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Login with Enterprise<span className="text-yellow-400">X</span>
      </h1>

      <div className="w-80 bg-white p-6 rounded shadow">
        <ReusableForm
          onSubmit={onSubmit}
          defaultValues={{ email: "demo@gmail.com", password: "12345" }}
        >
          <TextInput
            name="email"
            label="Email"
            type="email"
            variant="standard"
            placeholder="Enter your email"
            required
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            variant="standard"
            placeholder="Enter your password"
            required
          />
          <div className="text-sm mb-2">
            <Link to={"/"}>Forget password?</Link>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              marginTop: "8px",
              backgroundColor: "#1E40AF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#1D4ED8",
              },
            }}
          >
            Login
          </Button>
          <div>
            <p className="text-sm mt-4">
              Don't have an account?{" "}
              <Link to={"/register"} className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default Login;
