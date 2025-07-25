import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const CreatePost = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleCreatePost = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const res = await fetch(`${API_URL}/api/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });
      if (res.status === 201) {
        toast.success("Post created successfully!");
        setTitle(""); // Clear title input
        setContent(""); // Clear content input
      } else {
        toast.error("Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Create Post
      </h1>
      <form
        onSubmit={handleCreatePost}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        {/* Form fields for creating a post will go here */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};
export default CreatePost;
