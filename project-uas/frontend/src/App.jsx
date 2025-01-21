import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import CategoryForm from "./pages/category-products/CategoryForm";
import ProductForm from "./pages/products/ProductForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="product" />} />
          <Route path="category" element={<CategoryForm />} />
          <Route path="product" element={<ProductForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
