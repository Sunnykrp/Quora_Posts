import React, { useState, useEffect } from "react";

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        const data = await res.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Welcome to the Home Page
        </h1>
        <div className="max-w-2xl mx-auto">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="mb-4 p-4 bg-white rounded shadow"
              >
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>{post.content}</p>
                <div className="text-sm text-gray-500 mt-2">
                  By {post.user?.name || "Unknown"} &middot;{" "}
                  {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts found.</p>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
