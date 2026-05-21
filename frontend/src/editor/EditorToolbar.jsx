import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  ImagePlus,
} from "lucide-react";
import toast from "react-hot-toast";
import { uploadImage } from "../services/uploadService";

const ToolbarButton = ({ onClick, active, children, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
        active
          ? "border-[#0B3D91] bg-[#0B3D91] text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
      }`}
    >
      {children}
    </button>
  );
};

const EditorToolbar = ({ editor }) => {
  if (!editor) return null;

  const addLink = () => {
    const linkText = window.prompt("Enter the text to display");
    if (!linkText) return;

    const url = window.prompt("Enter the full URL, e.g. https://example.com");
    if (!url) return;

    editor
      .chain()
      .focus()
      .insertContent(
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
      )
      .run();
  };

  const addImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      toast.loading("Uploading image...", { id: "editor-image" });

      const result = await uploadImage(file);

      editor
        .chain()
        .focus()
        .setImage({ src: result.url, alt: file.name })
        .run();

      toast.success("Image added", { id: "editor-image" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Image upload failed", {
        id: "editor-image",
      });
    }
  };

  return (
    <div className="sticky top-24 z-20 mb-3 flex flex-wrap gap-2 rounded-2xl border border-blue-100 bg-blue-50 p-3">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <Bold size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <Italic size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
      >
        <Heading2 size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
      >
        H3
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        active={editor.isActive("heading", { level: 4 })}
      >
        H4
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      >
        <List size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      >
        <ListOrdered size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        active={editor.isActive("taskList")}
      >
        <List size={16} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      >
        <Quote size={16} />
      </ToolbarButton>

      <ToolbarButton onClick={addLink} active={editor.isActive("link")}>
        <LinkIcon size={16} />
      </ToolbarButton>

      <label className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50">
        <ImagePlus size={16} />
        <input type="file" accept="image/*" onChange={addImage} className="hidden" />
      </label>

      <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
        <Undo size={16} />
      </ToolbarButton>

      <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
        <Redo size={16} />
      </ToolbarButton>
    </div>
  );
};

export default EditorToolbar;