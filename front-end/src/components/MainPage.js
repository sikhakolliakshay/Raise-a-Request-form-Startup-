import React, { useState } from 'react';
import './MainPage.css';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    companyName: '',
    plotId: '',
    plotNumber: '',
    location: '',
    ownerName: '',
    issueType: '',
    description: '',
    contactMethod: 'email',
  });

  const togglePopup = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Request submitted successfully!');
        resetForm();
        togglePopup();
      } else {
        const errorText = await response.text();
        alert(`Failed to submit request: ${response.status} ${response.statusText}`);
        console.error('Response body:', errorText);
      }
    } catch (error) {
      alert('An error occurred while submitting the request. Please try again later.');
      console.error('Error details:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      companyName: '',
      plotId: '',
      plotNumber: '',
      location: '',
      ownerName: '',
      issueType: '',
      description: '',
      contactMethod: 'email',
    });
  };


  return (
    <div className="main-page" >
      <div className="header-container">
        <div className="header-buttons">
        <button className="header-btn signin-btn" onClick={() => alert('Coming Soon')}>Sign In</button>
        <button className="header-btn signup-btn" onClick={() => alert('Coming Soon')}>Sign Up</button>
        <button className="header-btn raise-btn" onClick={togglePopup}>Raise a Request</button>
        </div>
      </div>

      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={togglePopup}>&times;</span>
            <h2 className="section-title">User Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <h2 className="section-title">Venture/Plot Details</h2>
              <div className="form-row">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="plotId"
                  placeholder="Plot ID"
                  value={formData.plotId}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="plotNumber"
                  placeholder="Plot Number"
                  value={formData.plotNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Owner Name"
                  value={formData.ownerName}
                  onChange={handleChange}
                />
              </div>

              <h2 className="section-title">Type of Issue</h2>
              <div className="form-row">
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Issue Type</option>
                  <option value="booked">Are you Booked for Plot</option>
                  <option value="completed">Registration is Completed</option>
                  <option value="agreement">Agreement Completed</option>
                  <option value="kyc">Please provide your KYC (Aadhar/PAN)</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <h2 className="section-title">Description of Issue</h2>
              <div className="form-row">
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <h2 className="section-title">Preferred Contact Method</h2>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={formData.contactMethod === 'email'}
                    onChange={handleChange}
                  />
                  E-Mail
                </label>
                <label>
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={formData.contactMethod === 'phone'}
                    onChange={handleChange}
                  />
                  Phone
                </label>
                <label>
                  <input
                    type="radio"
                    name="contactMethod"
                    value="both"
                    checked={formData.contactMethod === 'both'}
                    onChange={handleChange}
                  />
                  Both
                </label>
              </div>

              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
