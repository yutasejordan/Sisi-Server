import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ProductsCard from "../../components/ProductsCard";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [products, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", {
        nama: productName,
        category_id: categoryId,
        harga: price,
        jml_stok: stock,
      });
      setProductName("");
      setCategoryId("");
      setPrice("");
      setStock("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductData = async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );
    console.log(response);

    setProductId(response.data.product_id);
    setProductName(response.data.nama);
    setCategoryId(response.data.category_id);
    setPrice(response.data.harga);
    setStock(response.data.jml_stok);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/products/${productId}`, {
        nama: productName,
        category_id: categoryId,
        harga: price,
        jml_stok: stock,
      });

      setProductId("");
      setProductName("");
      setCategoryId("");
      setPrice("");
      setStock("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <header className="flex justify-between mb-6">
        <h2 className="font-semibold text-xl">Tambah Produk</h2>
      </header>
      <div className="p-10 bg-white rounded-xl shadow-xl">
        {productId ? (
          <form onSubmit={handleEdit} className="flex flex-col">
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nama Produk..."
            />
            <select
              className="bg-slate-200 rounded-md mb-4 shadow px-2 py-3"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Pilih Kategori Barang</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.nama}
                </option>
              ))}
            </select>
            <Input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="harga barang..."
            />
            <Input
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              placeholder="Stok barang..."
            />
            <Button
              style="w-max bg-yellow-600 hover:bg-yellow-700 transition-all py-3 px-5 text-white rounded-md font-medium text-lg mt-2"
              text="Edit"
            />
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nama Produk..."
            />
            <select
              className="bg-slate-200 rounded-md mb-4 shadow px-2 py-3"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Pilih Kategori Barang</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.nama}
                </option>
              ))}
            </select>
            <Input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="harga barang..."
            />
            <Input
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              placeholder="Stok barang..."
            />
            <Button
              handleClick={handleSubmit}
              style="w-max bg-green-500 hover:bg-green-600 transition-all py-3 px-5 text-white rounded-md font-medium text-lg mt-2"
              text="Tambah"
              type="submit"
            />
          </form>
        )}
      </div>
      <div className="my-10 flex items-center justify-center gap-8 flex-wrap">
        {products.map((product) => (
          <ProductsCard
            key={product.product_id}
            harga={product.harga}
            kategori={product.category_nama}
            nama={product.product_nama}
            stok={product.jml_stok}
            button={
              <>
                <Button
                  text="Edit"
                  style="bg-yellow-500 hover:bg-yellow-600 transition-all text-lg font-medium"
                  handleClick={() => getProductData(product.product_id)}
                />
                <Button
                  text="Hapus"
                  style="bg-red-600 hover:bg-red-700 transition-all text-lg font-medium"
                  handleClick={() => deleteProduct(product.product_id)}
                />
              </>
            }
          />
        ))}
      </div>
    </section>
  );
};

export default ProductForm;
