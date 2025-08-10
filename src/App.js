import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  // Open modal
  const openModal = () => setShowModal(true);

  // Close modal on outside click
  const closeModalOnOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      setShowModal(false);
    }
  };

  // Track form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validation logic
  const validateForm = () => {
    const { username, email, dob, phone } = formData;

    if (!username.trim()) {
      alert("Please fill out the Username field.");
      return false;
    }
    if (!email.trim()) {
      alert("Please fill out the Email field.");
      return false;
    }
    if (!dob.trim()) {
      alert("Please fill out the Date of Birth field.");
      return false;
    }
    if (!phone.trim()) {
      alert("Please fill out the Phone Number field.");
      return false;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    const today = new Date();
    const dobDate = new Date(dob);
    if (dobDate > today) {
      alert("Invalid date of birth. Date cannot be in the future.");
      return false;
    }

    return true;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Reset
      setFormData({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
      setShowModal(false);
    }
  };

  // Modal JSX (via Portal)
  const modalElement = (
    <div className="modal" onClick={closeModalOnOutsideClick}>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              id="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <div className="App">
        {!showModal && <button onClick={openModal}>Open Form</button>}
      </div>
      {showModal && ReactDOM.createPortal(modalElement, document.body)}
    </>
  );
}

export default App;
