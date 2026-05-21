import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  deleteArticle,
  getAdminArticles,
} from "../../services/articleService";
import { formatDate } from "../../utils/formatDate";

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const result = await getAdminArticles();
      setArticles(result || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmDelete) return;

    try {
      await deleteArticle(id);
      toast.success("Article deleted");
      fetchArticles();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#020617]">Articles</h1>
          <p className="mt-2 text-slate-600">
            Create and manage security articles.
          </p>
        </div>

        <Link
          to="/admin/articles/create"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0B3D91] px-5 py-3 font-semibold text-white hover:bg-[#061A40]"
        >
          <Plus size={18} />
          Create Article
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        {loading ? (
          <p className="p-6 text-slate-600">Loading articles...</p>
        ) : articles.length === 0 ? (
          <p className="p-6 text-slate-600">No articles found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-blue-50 text-sm text-slate-600">
                <tr>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {articles.map((article) => (
                  <tr key={article._id} className="border-t border-slate-100">
                    <td className="px-5 py-4">
                      <p className="font-bold text-[#020617]">
                        {article.title}
                      </p>
                      <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                        {article.excerpt}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {article.category}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                          article.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(article.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/articles/edit/${article._id}`}
                          className="rounded-lg bg-blue-50 p-2 text-[#0B3D91] hover:bg-blue-100"
                        >
                          <Edit size={17} />
                        </Link>

                        <button
                          onClick={() => handleDelete(article._id)}
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

export default AdminArticles;