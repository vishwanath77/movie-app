import React, { useState } from "react";

const Admin = () => {
  const [movie, setMovie] = useState({ name: "", image: "", youtube: "" });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Movie Added:", movie);
    alert("Movie added successfully!");
    setMovie({ name: "", image: "", youtube: "" }); // Reset the form
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Movie Name</label>
            <input
              type="text"
              name="name"
              value={movie.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter movie name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Movie Image URL</label>
            <input
              type="text"
              name="image"
              value={movie.image}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">YouTube Link</label>
            <input
              type="text"
              name="youtube"
              value={movie.youtube}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter YouTube link"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
