import { useState } from "react";
import axios from "axios";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { username, password, email }
      );
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-[500px] p-6 shadow-xl rounded-xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <h2 className="mb-5 font-semibold text-2xl">Register</h2>
      <div className="mb-2">
        <label htmlFor="username" className="block font-medium text-lg">
          Username
        </label>
        <input
          className="w-full border-2 border-black rounded-md my-2 px-2 py-4 text-lg"
          placeholder="masukkan username baru anda..."
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="username" className="block font-medium text-lg">
          Email
        </label>
        <input
          className="w-full border-2 border-black rounded-md my-2 px-2 py-4 text-lg"
          placeholder="masukkan email baru anda..."
          type="email"
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
          placeholder="masukkan password baru anda..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          text="Daftar"
          style="w-1/2 bg-green-600 hover:bg-green-500 transition-all py-2.5 text-xl font-semibold"
          type="submit"
          handleClick={() => handleSubmit}
        />
        <a
          className="text-blue-600 text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          Sudah punya akun?
        </a>
      </div>
    </form>
  );
};

export default Register;
