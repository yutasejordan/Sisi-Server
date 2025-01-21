import { useEffect } from "react";
import Button from "../../components/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLayout() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/users/logout", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <aside className="w-[14%] h-full bg-slate-900 text-white py-6 px-3 flex flex-col justify-between">
        <h2 className="font-bold text-2xl text-center mb-8">Dashboard</h2>
        <ul className="mx-3 flex flex-col items-center">
          <li className="mb-4 font-medium text-lg hover:ml-4 transition-all duration-500">
            <Link to="/admin/product">Tambah Produk</Link>
          </li>
          <li className="mb-4 font-medium text-lg hover:ml-4 transition-all duration-500">
            <Link to="/admin/category">Tambah Kategori</Link>
          </li>
        </ul>
        <div className="flex justify-center">
          <Button
            handleClick={handleLogout}
            text="Log Out"
            style="w-max bg-red-600 hover:bg-red-700"
          />
        </div>
      </aside>

      <main className="bg-slate-200 w-[86%] py-4 px-4 relative overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}
