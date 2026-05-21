import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import TiptapEditor from "../../editor/TiptapEditor";
import { createArticle } from "../../services/articleService";
import { uploadImage } from "../../services/uploadService";

const CreateArticle = () => {
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
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContentChange = (html) => {
    setFormData((prev) => ({
      ...prev,
      content: html,
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

    const cleanContent = formData.content
      ?.replace(/<p><\/p>/g, "")
      ?.replace(/<p>\s*<\/p>/g, "")
      ?.trim();

    if (!cleanContent) {
      toast.error("Article content is required");
      return;
    }

    try {
      setSaving(true);

      await createArticle({
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

      toast.success("Article created successfully");
      navigate("/admin/articles");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create article");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#020617]">
            Create Article
          </h1>
          <p className="mt-2 text-slate-600">
            Publish security insights, guides, and professional analysis.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/articles")}
          className="rounded-xl border border-blue-100 bg-white px-5 py-3 font-semibold text-[#0B3D91] hover:bg-blue-50"
        >
          Back to Articles
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid items-start gap-6 lg:grid-cols-[1fr_330px]"
      >
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
              placeholder="Example: Why Physical Security Starts With Risk Awareness"
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
              placeholder="Short summary shown on the blog card..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
            />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-3">
              <label className="block text-sm font-semibold text-slate-700">
                Content *
              </label>
              <p className="mt-1 text-sm text-slate-500">
                Use the toolbar to format text, add named links, lists, quotes,
                and images inside the article body.
              </p>
            </div>

            <TiptapEditor
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>
        </div>

        <aside className="grid gap-6 self-start lg:sticky lg:top-28">
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
              <option value="Emergency Preparedness">
                Emergency Preparedness
              </option>
            </select>

            <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
              Tags
            </label>
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="risk, safety, security"
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
                alt="Cover preview"
                className="mb-4 h-44 w-full rounded-2xl object-cover"
              />
            )}

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-blue-200 bg-blue-50 px-5 py-5 text-center font-semibold text-[#0B3D91] hover:bg-blue-100">
              <Upload size={18} />
              {uploading ? "Uploading..." : "Upload Cover"}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
              />
            </label>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              This image appears on the blog card and article header.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving || uploading}
            className="rounded-xl bg-[#0B3D91] px-5 py-4 font-semibold text-white hover:bg-[#061A40] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Create Article"}
          </button>
        </aside>
      </form>
    </div>
  );
};

export default CreateArticle;