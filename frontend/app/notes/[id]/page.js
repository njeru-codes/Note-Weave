'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import LayoutDashboard from '@/components/Layout';

export default function NotePage() {
  const { id } = useParams();
  const router = useRouter();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    async function fetchNote() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, {
          headers: {
            accept: 'application/json',
            // Add auth if needed
            'X-weaver-key': localStorage.getItem('token') || '',
          },
        });

        if (!res.ok) {
          if (res.status === 404) {
            setError('Note not found.');
          } else {
            setError(`Failed to fetch note. Status: ${res.status}`);
          }
          setNote(null);
          return;
        }

        const data = await res.json();
        setNote(data);
      } catch (err) {
        setError('Error fetching note.');
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  if (loading)
    return (
      <LayoutDashboard>
        <div className="p-6 text-center text-gray-600">Loading note...</div>
      </LayoutDashboard>
    );

  if (error)
    return (
      <LayoutDashboard>
        <div className="p-6 text-center text-red-600">{error}</div>
      </LayoutDashboard>
    );

  if (!note)
    return (
      <LayoutDashboard>
        <div className="p-6 text-center text-gray-600">No note to display.</div>
      </LayoutDashboard>
    );

  return (
    <LayoutDashboard>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{note.title || 'Untitled Note'}</h1>
          <p className="text-sm text-gray-500 mb-6">
            Created on{' '}
            {new Date(note.created_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div
            className="prose prose-teal max-w-none"
            dangerouslySetInnerHTML={{ __html: note.content || '<p><em>No content available.</em></p>' }}
          />
        </div>
      </div>
    </LayoutDashboard>
  );
}
