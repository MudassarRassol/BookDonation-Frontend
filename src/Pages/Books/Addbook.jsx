import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Addbook = () => {
  const { theme } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    condition: "",
    genre: "",
    description: "",
  });
  const [bookPhoto, setBookPhoto] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBookPhoto(e.target.files[0]);
    } else {
      setBookPhoto(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Start loading

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (bookPhoto) {
      formDataToSend.append("image", bookPhoto);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/donor/addbook",
        formDataToSend,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setSuccess("Book added successfully!");
        setFormData({ title: "", author: "", condition: "", genre: "", description: "" });
        setBookPhoto(null);
        toast.success("Book Added Successfully");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred");
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className=" h-screen md:h-[100vh] flex items-center justify-center" >
    <div className={`p-6 max-w-md mx-auto space-y-4 border-2 m-2 mt-10 rounded-2xl ${theme === "light" ? "light" : "gray"}`}>
      <Toaster position='top-right' />
      <h2 className="text-2xl font-bold text-center">Add a New Book</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div className="w-full flex flex-col items-center p-2 border-2 border-dashed rounded cursor-pointer" onClick={() => document.getElementById("bookphoto").click()}>
          {bookPhoto ? (
            <img src={URL.createObjectURL(bookPhoto)} alt="Book Preview" className="max-w-full max-h-40 object-cover rounded-md" />
          ) : (
            <p className="text-gray-500">Click to upload an image</p>
          )}
        </div>

        {/* Book Information Inputs */}
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange}
        className={`input-field w-full border-b-2 outline-none p-2 ${theme === 'light' ? 'text-amber-950' : 'text-white'}`} 
        required />
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} 
        className={`input-field w-full border-b-2 outline-none p-2 ${theme === 'light' ? 'text-amber-950' : 'text-white'}`} 
        required />
        
        {/* Condition Select */}
        <select name="condition" value={formData.condition} onChange={handleChange} 
        className={`input-field w-full border-b-2 outline-none p-2 ${theme === 'light' ? 'text-amber-950' : 'text-white'}`} 
        required>
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>

        {/* Genre Select */}
        <select name="genre" value={formData.genre} onChange={handleChange} 
        className={` w-full border-b-2 outline-none p-2 ${theme === 'light' ? 'text-amber-950' : 'text-white'}`}  required>
          <option value="">Select Genre</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="academic">Academic</option>
          <option value="children">Children</option>
        </select>

        {/* Description */}
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}
         className={` w-full border-b-2 outline-none p-2 ${theme === 'light' ? 'text-amber-950' : 'text-white'}`} 
          required></textarea>

        {/* Hidden File Input */}
        <input id="bookphoto" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />

        {/* Submit Button */}
        <button type="submit" className={`w-full p-2 rounded ${theme === "light" ? "darkbutton" : "lightbutton"}`} disabled={loading}>
          {loading ? "Book is adding..." : "Add Book"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Addbook;
