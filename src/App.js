import React, { useState } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const openModal = () => setShowModal(true);

  const closeModalOnOutsideClick = (e) => {
  if (e.target.classList.contains("modal")) {
    setShowModal(false);
  }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, dob, phone } = formData;

    // Email validation first
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }

    // Phone validation (exactly 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    // DOB validation (not a future date)
    if (dob) {
      const today = new Date();
      const dobDate = new Date(dob);
      if (dobDate > today) {
        alert("Invalid date of birth. Date cannot be in the future.");
        return false;
      }
    }

    // Required fields check
    if (!username) {
      alert("Please fill out the Username field.");
      return false;
    }
    if (!email) {
      alert("Please fill out the Email field.");
      return false;
    }
    if (!dob) {
      alert("Please fill out the Date of Birth field.");
      return false;
    }
    if (!phone) {
      alert("Please fill out the Phone Number field.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormData({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
      setShowModal(false);
    }
  };

  return (
    <div className="App">
      {!showModal && (
        <button onClick={openModal}>Open Form</button>
      )}

      {showModal && (
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
      )}
    </div>
  );
}

export default App;
