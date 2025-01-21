import { useState } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";

const CategoryForm = () => {
  const [nama, setNama] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        {
          nama,
        }
      );
      console.log(response.data);
      setNama("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <header className="flex justify-between mb-6">
        <h2 className="font-semibold text-xl">Tambah Kategori</h2>
      </header>
      <div className="p-10 bg-white rounded-xl shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Kategori..."
          />
          <Button
            handleClick={handleSubmit}
            style="w-max bg-green-500 hover:bg-green-600 transition-all py-3 px-5 text-white rounded-md font-medium text-lg mt-2"
            text="Tambah"
            type="submit"
          >
            Tambah
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CategoryForm;
