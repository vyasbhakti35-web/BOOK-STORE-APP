import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4001/contact/send",
        formData,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Feedback sent successfully");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log("Contact submit error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to send feedback"
      );
    }
  };

  return (
    <div className="max-w-screen-md container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded-xl shadow space-y-4"
      >
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your feedback here"
            rows="5"
            className="w-full border px-4 py-2 rounded-md"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md"
        >
          Send Feedback
        </button>
      </form>
    </div>
  );
}

export default Contact;