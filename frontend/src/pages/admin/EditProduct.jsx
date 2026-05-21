import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileText, ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import TiptapEditor from "../../editor/TiptapEditor";
import { uploadDocument, uploadImage } from "../../services/uploadService";
import { getProductById, updateProduct } from "../../services/productService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "Security Guide",
    price: "",
    currency: "USD",
    tags: "",
    status: "draft",
    isFeatured: false,
    coverImage: null,
    file: null,
  });

  const [coverPreview, setCoverPreview] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);

        setFormData({
          title: product.title || "",
          shortDescription: product.shortDescription || "",
          description: product.description || "",
          category: product.category || "Security Guide",
          price: product.price || "",
          currency: product.currency || "USD",
          tags: product.tags?.join(", ") || "",
          status: product.status || "draft",
          isFeatured: product.isFeatured || false,
          coverImage: product.coverImage || null,
          file: product.file || null,
        });

        setCoverPreview(product.coverImage?.url || "");
        setFileName(product.file?.publicId || "");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingCover(true);
      const result = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        coverImage: {
          url: result.url,
          publicId: result.publicId,
        },
      }));

      setCoverPreview(result.url);
      toast.success("Cover image uploaded");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Cover upload failed");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingFile(true);
      const result = await uploadDocument(file);

      setFormData((prev) => ({
        ...prev,
        file: {
          url: result.url,
          publicId: result.publicId,
          resourceType: result.resourceType,
          format: result.format,
        },
      }));

      setFileName(file.name);
      toast.success("Product file uploaded");
    } catch (error) {
      toast.error(error?.response?.data?.message || "File upload failed");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file?.url) {
      toast.error("Product file is required");
      return;
    }

    try {
      setSaving(true);

      await updateProduct(id, {
        title: formData.title,
        shortDescription: formData.shortDescription,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        currency: "USD",
        coverImage: formData.coverImage,
        file: formData.file,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        status: formData.status,
        isFeatured: formData.isFeatured,
      });

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-slate-600">Loading product...</p>;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#020617]">
            Edit Product
          </h1>
          <p className="mt-2 text-slate-600">
            Update digital resource details, file, pricing, and publishing status.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/products")}
          className="rounded-xl border border-blue-100 bg-white px-5 py-3 font-semibold text-[#0B3D91] hover:bg-blue-50"
        >
          Back to Products
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_330px]">
        <div className="grid gap-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Product Title *
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
            />

            <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
              Short Description *
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              rows="4"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
            />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Full Product Description *
            </label>

            <TiptapEditor
              value={formData.description}
              onChange={(html) =>
                setFormData((prev) => ({ ...prev, description: html }))
              }
            />
          </div>
        </div>

        <aside className="grid gap-6 self-start">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Price in USD *
            </label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
            />

            <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
            >
              <option value="Security Guide">Security Guide</option>
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
              Featured product
            </label>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Cover Image
            </label>

            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="mb-4 h-44 w-full rounded-2xl object-cover"
              />
            )}

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-blue-200 bg-blue-50 px-5 py-5 font-semibold text-[#0B3D91] hover:bg-blue-100">
              <ImagePlus size={18} />
              {uploadingCover ? "Uploading..." : "Change Cover"}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Product File *
            </label>

            {fileName && (
              <p className="mb-4 break-all rounded-xl bg-blue-50 p-3 text-sm font-semibold text-[#0B3D91]">
                {fileName}
              </p>
            )}

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-blue-200 bg-blue-50 px-5 py-5 font-semibold text-[#0B3D91] hover:bg-blue-100">
              <FileText size={18} />
              {uploadingFile ? "Uploading..." : "Replace File"}
              <input
                type="file"
                accept=".pdf,.xls,.xlsx,image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={saving || uploadingCover || uploadingFile}
            className="rounded-xl bg-[#0B3D91] px-5 py-4 font-semibold text-white hover:bg-[#061A40] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Update Product"}
          </button>
        </aside>
      </form>
    </div>
  );
};

export default EditProduct;