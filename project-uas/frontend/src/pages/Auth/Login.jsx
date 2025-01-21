import axios from "axios";
import { useState } from "react";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-[500px] p-6 shadow-xl rounded-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <h2 className="mb-5 font-semibold text-2xl">Login</h2>
      <div className="mb-2">
        <label htmlFor="email" className="block font-medium text-lg">
          Email:
        </label>
        <input
          className="w-full border-2 border-black rounded-md my-2 px-2 py-4 text-lg"
          placeholder="masukkan email anda..."
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="block font-medium text-lg">
          Password:
        </label>
        <input
          className="w-full border-2 border-black rounded-md my-2 px-2 py-4 text-lg"
          placeholder="masukkan password anda..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button
          text="Masuk"
          style="bg-blue-600 hover:bg-blue-500 transition-all py-3 text-xl w-full font-semibold mb-5"
          type="submit"
        />
        <Link to="/register" className="flex justify-center">
          <Button
            text="Buat Akun Baru"
            style="w-1/2 bg-green-600 mx-auto hover:bg-green-500 transition-all py-3 text-xl font-semibold"
          />
        </Link>
      </div>
    </form>
  );
};

export default Login;
