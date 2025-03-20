"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface RichTextEditorProps {
  onChange?: (content: string) => void; // Ensure onChange can accept a string
}

export default function RichTextEditor({ onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start typing...</p>",
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML()); // Send HTML content as a string
      }
    },
  });

  return (
    <div className="border rounded-md p-2 min-h-[150px]">
      <EditorContent editor={editor} />
    </div>
  );
}
