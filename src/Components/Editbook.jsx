import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Loading from "./Loading";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    condition: "",
    genre: "",
    description: "",
  });
  const [bookPhoto, setBookPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/getbookdetails/${id}`);
        if (response.status === 200) {
          setFormData({
            title: response.data.book.title,
            author: response.data.book.author,
            condition: response.data.book.condition,
            genre: response.data.book.genre,
            description: response.data.book.description,
          });
          setBookPhoto(response.data.book.bookphoto);
        }
      } catch (err) {
        setError("Failed to fetch book details");
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBookPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    
    if (bookPhoto && typeof bookPhoto !== "string") {
      formDataToSend.append("image", bookPhoto);
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/donor/editbook/${id}`,
        formDataToSend,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Book updated successfully!");
        navigate(`/home/allbooks/${id}`);
      }
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred");
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 border-2 m-2 mt-10 rounded-2xl">
      <Toaster position='top-right' />
      <h2 className="text-2xl font-bold text-center">Edit Book</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-full flex flex-col items-center p-2 border-2 border-dashed rounded cursor-pointer" onClick={() => document.getElementById("bookphoto").click()}>
          {bookPhoto && typeof bookPhoto === "string" ? (
            <img src={bookPhoto} alt="Book" className="max-w-full max-h-40 object-cover rounded-md" />
          ) : bookPhoto ? (
            <img src={URL.createObjectURL(bookPhoto)} alt="Preview" className="max-w-full max-h-40 object-cover rounded-md" />
          ) : (
            <p className="text-gray-500">Click to upload an image</p>
          )}
        </div>
        
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="input-field w-full border-b-2 outline-none p-2" required />
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="input-field w-full border-b-2 outline-none p-2" required />
        
        <select name="condition" value={formData.condition} onChange={handleChange} className="input-field w-full border-b-2 outline-none p-2" required>
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>
        
        <select name="genre" value={formData.genre} onChange={handleChange} className="w-full border-b-2 outline-none p-2" required>
          <option value="">Select Genre</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="academic">Academic</option>
          <option value="children">Children</option>
        </select>
        
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border-b-2 outline-none p-2" required></textarea>

        <input id="bookphoto" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
        
        <button type="submit" className={`
            w-full p-2 rounded  ${
                theme === "light" ? "darkbutton" : "lightbutton"
            }
            `}>Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
