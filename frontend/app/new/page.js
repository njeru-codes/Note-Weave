'use client'; 

import LayoutDashboard from "@/components/Layout";
import React, { useState, useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

export default function EditorPage() {
  const editorContainerRef = useRef(null);
  const quillRef = useRef(null);
  const [title, setTitle] = useState(""); // State for note title
  const [editorContent, setEditorContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [noteId, setNoteId] = useState(null); // Track note ID after creation
  const [lastSavedContent, setLastSavedContent] = useState(""); // Track last saved content
  const [lastSavedTitle, setLastSavedTitle] = useState(""); // Track last saved title
  const [toastMessage, setToastMessage] = useState(""); // For toast notification
  const [error, setError] = useState(""); // For error messages

  // Initialize Quill Editor
  useEffect(() => {
    let Quill;
    async function loadQuill() {
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
          <ol>
            <li>First item</li>
            <li>Second item</li>
          </ol>
        `;
        quillRef.current.clipboard.dangerouslyPasteHTML(0, initialContent);

        quillRef.current.on("text-change", () => {
          setEditorContent(quillRef.current.root.innerHTML);
        });

        setEditorContent(quillRef.current.root.innerHTML);
        setLastSavedContent(quillRef.current.root.innerHTML); // Initialize last saved content
      }
    }

    loadQuill();

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
      }
    };
  }, []);

  // Auto-save logic (every 10 seconds if content or title has changed)
  useEffect(() => {
    const saveNote = async () => {
      const token = localStorage.getItem("token");
      // Check if title or content has changed
      if (
        (title === lastSavedTitle && editorContent === lastSavedContent) ||
        (!title && !editorContent) // Skip if both are empty
      ) {
        return;
      }

      try {
        let response;
        if (noteId) {
          // Update existing note (PUT)
          response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`, {
            method: "PUT",
            headers: {
              "accept": "application/json",
              "Content-Type": "application/json",
              "X-weaver-key": token,
            },
            body: JSON.stringify({
              title: title || "Untitled Note", 
              content: editorContent || "",
            }),
          });
        } else {
          // Create new note (POST)
          response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/`, {
            method: "POST",
            headers: {
              "accept": "application/json",
              "Content-Type": "application/json",
              "X-weaver-key": token,
            },
            body: JSON.stringify({
              title: title || "Untitled Note", // Default title if empty
              content: editorContent || "",
            }),
          });
        }

        const data = await response.json();

        if (response.ok && response.status === 200) {
          if (!noteId) {
            setNoteId(data._id); // Store note ID after creation
          }
          setLastSavedTitle(title || "Untitled Note"); // Update last saved title
          setLastSavedContent(editorContent || ""); // Update last saved content
          setToastMessage("Note saved successfully!");
          setError("");
        } else {
          setError(data.message || "Failed to save note.");
          setToastMessage("");
        }
      } catch (err) {
        setError("An error occurred while saving the note.");
        setToastMessage("");
        console.error("Save error:", err);
      }
    };

    // Set up interval to save every 10 seconds
    const interval = setInterval(() => {
      saveNote();
    }, 5000); // 10 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [title, editorContent, noteId, lastSavedContent, lastSavedTitle]);

  // Handle toast dismissal after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage("");
      }, 3000); // Hide toast after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <LayoutDashboard>
      <div className="p-4">
        {/* Error Message */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage("")}
              className="text-white hover:text-blue-200"
            >
              ✕
            </button>
          </div>
        )}

        {/* Title Input and Preview Button */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border border-gray-200 rounded px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Editor Container */}
          <div className="bg-white flex-1">
            <div
              ref={editorContainerRef}
              className="border border-gray-200 rounded"
              style={{ minHeight: "300px" }}
            />
          </div>

          {/* Preview Container */}
          {showPreview && (
            <div className="bg-gray-100 p-4 rounded-lg flex-1 max-w-full lg:max-w-lg overflow-auto">
              <div
                className="ql-editor max-w-full"
                style={{ wordWrap: "break-word", overflowY: "auto" }}
                dangerouslySetInnerHTML={{ __html: editorContent }}
              />
            </div>
          )}
        </div>
      </div>
    </LayoutDashboard>
  );
}