'use client';

import { useEffect, useState } from 'react';

interface Work {
  id: string;
  title: string;
  description: string;
  project_link: string;
  image_url?: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [works, setWorks] = useState<Work[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    project_link: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const formatUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return 'https://' + url;
    }
    return url;
  };

  const fetchWorks = async () => {
    try {
      const res = await fetch('https://clooyzi.onrender.com/api/portfolio');
      const data = await res.json();
      setWorks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch works:", error);
      setWorks([]); // Set to empty array on error
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchWorks();
  }, [isLoggedIn]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!form.title || !form.description || !form.project_link) {
      return alert('Please fill in all fields');
    }

    const formattedLink = formatUrl(form.project_link);
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('project_link', formattedLink);
    if (image) formData.append('image', image);

    const res = await fetch(
      `https://clooyzi.onrender.com/api/portfolio${editingId ? `/${editingId}` : ''}`,
      {
        method: editingId ? 'PUT' : 'POST',
        body: formData,
      }
    );

    if (!res.ok) {
      alert(editingId ? 'Failed to update project' : 'Failed to add project');
      return;
    }

    setForm({ title: '', description: '', project_link: '' });
    setImage(null);
    setEditingId(null);
    fetchWorks();
  };

  const handleEdit = (work: Work) => {
    setForm({
      title: work.title,
      description: work.description,
      project_link: work.project_link,
    });
    setEditingId(work.id);
    setImage(null);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`https://clooyzi.onrender.com/api/portfolio/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) fetchWorks();
    else alert('Failed to delete');
  };

  const handleLogin = async () => {
  try {
    const res = await fetch('https://clooyzi.onrender.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    });

    const result = await res.json();

    if (res.ok) {
      // Login successful
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      // Show error from backend if available
      setLoginError(result.error || 'Invalid email or password');
    }
  } catch (error) {
    console.error('Login failed:', error);
    setLoginError('Something went wrong. Please try again.');
  }
};


  // If not logged in, show login form
  if (!isLoggedIn) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow space-y-4">
        <h1 className="text-xl font-bold">Admin Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginForm.email}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          className="border p-2 w-full"
        />
        {loginError && <p className="text-red-500">{loginError}</p>}
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </div>
    );
  }

  // After login, show the rest of the admin page
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        {editingId ? 'Edit Project' : 'Add New Project'}
      </h1>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="border w-full p-2"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border w-full p-2"
      />
      <input
        name="project_link"
        value={form.project_link}
        onChange={handleChange}
        placeholder="Project Link"
        className="border w-full p-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border w-full p-2"
      />
      <button
        onClick={handleAddOrUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {editingId ? 'Update Work' : 'Add Work'}
      </button>

      <div className="space-y-6">
        {Array.isArray(works) && works.map((work) => (
          <div key={work.id} className="border p-4 rounded space-y-3">
            {work.image_url && (
              <img
                src={work.image_url}
                alt={work.title}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-semibold">{work.title}</h2>
            <p>{work.description}</p>
            <a
              href={
                /^https?:\/\//i.test(work.project_link)
                  ? work.project_link
                  : `https://${work.project_link}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Visit Project
            </a>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleEdit(work)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(work.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}