import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import TiptapEditor from "../../editor/TiptapEditor";
import {
  getArticleById,
  updateArticle,
} from "../../services/articleService";
import { uploadImage } from "../../services/uploadService";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Security Insights",
    tags: "",
    status: "draft",
    isFeatured: false,
    coverImage: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getArticleById(id);

        setFormData({
          title: article.title || "",
          excerpt: article.excerpt || "",
          content: article.content || "",
          category: article.category || "Security Insights",
          tags: article.tags?.join(", ") || "",
          status: article.status || "draft",
          isFeatured: article.isFeatured || false,
          coverImage: article.coverImage || null,
        });

        setImagePreview(article.coverImage?.url || "");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        coverImage: {
          url: result.url,
          publicId: result.publicId,
        },
      }));

      setImagePreview(result.url);
      toast.success("Cover image uploaded");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateArticle(id, {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        status: formData.status,
        isFeatured: formData.isFeatured,
        coverImage: formData.coverImage,
      });

      toast.success("Article updated successfully");
      navigate("/admin/articles");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update article");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-slate-600">Loading article...</p>;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#020617]">Edit Article</h1>
          <p className="mt-2 text-slate-600">
            Update blog content, status, image, and metadata.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/articles")}
          className="rounded-xl border border-blue-100 bg-white px-5 py-3 font-semibold text-[#0B3D91] hover:bg-blue-50"
        >
          Back to Articles
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_330px]">
        <div className="grid gap-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Article Title *
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
            />

            <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows="4"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
            />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Content *
            </label>

            <TiptapEditor
              value={formData.content}
              onChange={(html) =>
                setFormData((prev) => ({ ...prev, content: html }))
              }
            />
          </div>
        </div>

        <aside className="grid gap-6 self-start">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
            >
              <option value="Security Insights">Security Insights</option>
              <option value="Risk Assessment">Risk Assessment</option>
              <option value="Physical Security">Physical Security</option>
              <option value="Security Awareness">Security Awareness</option>
              <option value="Emergency Preparedness">Emergency Preparedness</option>
            </select>

            <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
              Tags
            </label>
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
            />

            <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <label className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              Featured article
            </label>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Cover Image
            </label>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Cover"
                className="mb-4 h-44 w-full rounded-2xl object-cover"
              />
            )}

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-blue-200 bg-blue-50 px-5 py-5 font-semibold text-[#0B3D91] hover:bg-blue-100">
              <Upload size={18} />
              {uploading ? "Uploading..." : "Change Cover"}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={saving || uploading}
            className="rounded-xl bg-[#0B3D91] px-5 py-4 font-semibold text-white hover:bg-[#061A40] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Update Article"}
          </button>
        </aside>
      </form>
    </div>
  );
};

export default EditArticle;