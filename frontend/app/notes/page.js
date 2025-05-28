"use client";

import LayoutDashboard from "@/components/Layout";
import { useState } from "react";

// Mock data for notes (replace with API fetch if needed)
const mockNotes = [
  {
    id: 1,
    title: "Meeting Notes",
    content: "Discussed project timeline and deliverables with the team.",
    date: "2025-05-27",
  },
  {
    id: 2,
    title: "Grocery List",
    content: "Milk, eggs, bread, butter, and some snacks for the weekend.",
    date: "2025-05-26",
  },
  {
    id: 3,
    title: "Ideas for App",
    content: "Add dark mode, improve editor performance, and integrate AI suggestions.",
    date: "2025-05-25",
  },
];

export default function NotesPage() {
  const [notes] = useState(mockNotes);

  return (
    <LayoutDashboard>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">My Notes</h2>
        {/* Render a list of notes in cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-medium text-gray-800 mb-2">{note.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{note.content}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{note.date}</span>
                  <a
                    href={`/note/${note.id}`}
                    className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                  >
                    View Note
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No notes available. Create a new note to get started!</p>
          )}
        </div>
      </div>
    </LayoutDashboard>
  );
}