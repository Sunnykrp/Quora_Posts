import React, { useState, useEffect } from "react";

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);
  const [menuOpenId, setMenuOpenId] = useState(null);

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

  const handleMenuToggle = (postId) => {
    setMenuOpenId(menuOpenId === postId ? null : postId);
  };

  const handleDelete = async (postId) => {
    try {
      const res = await fetch(`${API_URL}/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 200) {
        setPosts(posts.filter((post) => post._id !== postId));
        setMenuOpenId(null);
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      alert("Error deleting post");
    }
  };

  const handleUpdate = async (post) => {
    const newTitle = prompt("Edit title:", post.title);
    const newContent = prompt("Edit content:", post.content);
    if (newTitle !== null && newContent !== null) {
      try {
        const res = await fetch(`${API_URL}/api/posts/${post._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title: newTitle, content: newContent }),
        });
        if (res.status === 200) {
          const updatedPost = await res.json();
          setPosts(posts.map((p) => (p._id === post._id ? updatedPost : p)));
          setMenuOpenId(null);
        } else {
          alert("Failed to update post");
        }
      } catch (error) {
        alert("Error updating post");
      }
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
                className="mb-4 p-4 bg-white rounded shadow relative"
              >
                {/* Three dots menu */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => handleMenuToggle(post._id)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <span className="text-xl font-bold">⋮</span>
                  </button>
                  {menuOpenId === post._id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600"
                        onClick={() => handleUpdate(post)}
                      >
                        Update
                      </button>
                    </div>
                  )}
                </div>
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
