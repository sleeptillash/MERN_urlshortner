'use client';

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [urls, setUrls] = useState([]);
  const [enteredPass, setEnteredPass] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");

  const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASS;

  useEffect(() => {
    if (isAuthorized) {
      fetch("https://urlshortner-backend-rmir.onrender.com/api/admin/urls")
        .then((res) => res.json())
        .then((data) => setUrls(data))
        .catch(console.error);
    }
  }, [isAuthorized]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entered:", enteredPass, "Expected:", adminPass);
    if (enteredPass.trim() === adminPass) {
      setIsAuthorized(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-90 backdrop-blur-sm z-50">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-md shadow-lg text-white max-w-sm w-full"
        >
          <h2 className="mb-4 text-xl font-semibold">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={enteredPass}
            onChange={(e) => setEnteredPass(e.target.value)}
            className="w-full p-3 rounded mb-2 bg-gray-700 border border-gray-600 focus:outline-none"
            autoFocus
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 p-3 rounded font-semibold"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-200 text-gray-100">
      <main className="w-full max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-md">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        <table className="w-full table-auto bg-gray-900 rounded-md">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">Short URL</th>
              <th className="p-3 text-left">Original URL</th>
              <th className="p-3 text-left">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id} className="border-t border-gray-700">
                <td className="p-3 text-green-400">
                  <a
                    href={`https://urlshortner-backend-rmir.onrender.com/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.shortCode}
                  </a>
                </td>
                <td className="p-3 truncate">{url.originalUrl}</td>
                <td className="p-3">{url.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
