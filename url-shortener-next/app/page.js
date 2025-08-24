'use client';

import { useState } from "react";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    let url = originalUrl.trim();
    if (!url) {
      setError("Please enter a URL.");
      return;
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    setLoading(true);

    try {
      const res = await fetch("https://urlshortner-backend-rmir.onrender.com/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });

      if (!res.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-200 text-gray-100">
      <main className="w-full max-w-2xl bg-gray-900 p-6 sm:p-8 rounded-xl ">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">URL Shortener</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter a long URL (e.g., google.com)"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            disabled={loading}
            className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-100 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-md font-semibold transition-colors text-white ${
              loading
                ? "bg-green-700 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-800 p-4 rounded-md">
            <p className="text-sm break-words">
              <span className="text-gray-400">Shortened URL:</span>{" "}
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 underline hover:text-green-300"
              >
                {shortUrl}
              </a>
            </p>
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
      </main>
    </div>
  );
}
