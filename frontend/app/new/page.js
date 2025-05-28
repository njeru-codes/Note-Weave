"use client";

import LayoutDashboard from "@/components/Layout";
import React, { useState, useEffect, useRef } from "react";
// Remove direct import of Quill here
import "quill/dist/quill.snow.css";

export default function EditorPage() {
  const editorContainerRef = useRef(null);
  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    let Quill;
    async function loadQuill() {
      // Dynamically import Quill only on client
      const mod = await import("quill");
      Quill = mod.default;

      if (editorContainerRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorContainerRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          },
          placeholder: "Start writing here...",
        });

        const initialContent = `
          <h2>Demo Content</h2>
          <p>Preset build with <code>snow</code> theme, and some common formats.</p>
        `;
        quillRef.current.clipboard.dangerouslyPasteHTML(0, initialContent);

        quillRef.current.on("text-change", () => {
          setEditorContent(quillRef.current.root.innerHTML);
        });

        setEditorContent(quillRef.current.root.innerHTML);
      }
    }

    loadQuill();

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
      }
    };
  }, []);

  return (
    <LayoutDashboard>
      <div className="p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Editor</h2>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white flex-1">
            <div
              ref={editorContainerRef}
              className="border border-gray-200 rounded"
              style={{ minHeight: "300px" }}
            />
          </div>

          {showPreview && (
            <div className="bg-gray-100 p-4 rounded-lg flex-1 max-w-full lg:max-w-lg overflow-auto">
              <h3 className="text-lg font-medium mb-2">Preview</h3>
              <div
                className="prose max-w-full"
                style={{ wordWrap: "break-word" }}
                dangerouslySetInnerHTML={{ __html: editorContent }}
              />
            </div>
          )}
        </div>
      </div>
    </LayoutDashboard>
  );
}
