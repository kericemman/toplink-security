import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  deleteProduct,
  getAdminProducts,
} from "../../services/productService";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await getAdminProducts();
      setProducts(result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#020617]">Products</h1>
          <p className="mt-2 text-slate-600">
            Create and manage digital security resources.
          </p>
        </div>

        <Link
          to="/admin/products/create"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0B3D91] px-5 py-3 font-semibold text-white hover:bg-[#061A40]"
        >
          <Plus size={18} />
          Create Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        {loading ? (
          <p className="p-6 text-slate-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="p-6 text-slate-600">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-blue-50 text-sm text-slate-600">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t border-slate-100">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 overflow-hidden rounded-xl bg-blue-50">
                          {product.coverImage?.url ? (
                            <img
                              src={product.coverImage.url}
                              alt={product.title}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>

                        <div>
                          <p className="font-bold text-[#020617]">
                            {product.title}
                          </p>
                          <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                            {product.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {product.category}
                    </td>

                    <td className="px-5 py-4 font-bold text-[#0B3D91]">
                      {formatCurrency(product.price, product.currency)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                          product.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(product.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="rounded-lg bg-blue-50 p-2 text-[#0B3D91] hover:bg-blue-100"
                        >
                          <Edit size={17} />
                        </Link>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;