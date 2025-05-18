import { useForm, type SubmitHandler } from "react-hook-form";
import TextInput from "../utils/input-fields/TextInput";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    if (data.email === "demo@gmail.com" && data.password === "12345") {
      alert("Login successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold">
          {" "}
          <h1 className="text-2xl font-bold mb-4">
            Login with Enterprise<span className="text-yellow-400">X</span>
          </h1>
        </h1>
        <div className="w-80 bg-white p-6 rounded shadow">
          <TextInput
            name="email"
            defaultValue="demo@gmail.com"
            label="Email"
            type="email"
            variant="standard"
            placeholder="Enter your email"
            control={control}
            required
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            defaultValue="12345"
            variant="standard"
            placeholder="Enter your password"
            control={control}
            required
          />
          <div className="text-sm">
            <Link to={"/"}>forget password?</Link>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              marginTop: "16px",
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
        </div>
      </div>
    </form>
  );
};

export default Login;
