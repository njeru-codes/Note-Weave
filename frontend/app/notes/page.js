"use client";

import LayoutDashboard from "@/components/Layout";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Missing authentication token.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://note-weave-y0vf.onrender.com/notes/", {
          method: "GET",
          headers: {
            "X-weaver-key": token,
            accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data?.detail || "Failed to fetch notes.");
        } else {
          setNotes(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <LayoutDashboard>
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Notes</h2>

        {loading && <p className="text-gray-500">Loading notes...</p>}

        {error && (
          <p className="text-red-600 bg-red-100 p-3 rounded-lg mb-4 border border-red-300">
            {error}
          </p>
        )}

        {!loading && notes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow rounded-xl overflow-hidden flex flex-col"
              >
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-1">
                    {note.title || "Untitled"}
                  </h3>
                  <div
                    className="text-sm text-gray-600 prose prose-sm max-w-none line-clamp-5 overflow-hidden mb-4"
                    dangerouslySetInnerHTML={{
                      __html: note.content || "<p>No content</p>",
                    }}
                  />
                  <div className="mt-auto pt-3 border-t flex justify-between items-center text-sm text-gray-500">
                    <span>
                      {new Date(note.created_at).toLocaleDateString()}
                    </span>
                    <a
                      href={`/notes/${note._id}`}
                      className="text-teal-600 hover:underline font-medium"
                    >
                      View Note
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && notes.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p>No notes available.</p>
            <a
              href="/new-note"
              className="text-teal-600 hover:text-teal-700 underline mt-2 inline-block"
            >
              Create a new note
            </a>
          </div>
        )}
      </div>
    </LayoutDashboard>
  );
}
