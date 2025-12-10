import { useState } from "react";
import axios from "axios";
import "./startup.css";
import { sanitizeStartupForm } from "../utils/sanitize";

export default function AddStartup() {
  const [form, setForm] = useState({
    name: "",
    state: "",
    sector: "",
    funding: "",
    turnover: "",
    companytype: "Private Limited",
    registrationDate: "",
    description: "",
    founder: "",
    website: "",
    email: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = sanitizeStartupForm(form);
      if (!result.ok) {
        setError(result.error);
        setLoading(false);
        return;
      }

      const payload = result.data;

      await axios.post(
        axios.post("http://localhost:5000/api/startups/addStartup", payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      );

      alert("Startup added successfully!");

      setForm({
        name: "",
        state: "",
        sector: "",
        funding: "",
        turnover: "",
        companytype: "Private Limited",
        registrationDate: "",
        description: "",
        founder: "",
        website: "",
        email: "",
        phoneNumber: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const update = (field, value) => setForm({ ...form, [field]: value });

  return (
    <div className="startup-container">
      <div className="startup-form-card">
        <h2 className="startup-title">Add New Startup</h2>
        <p className="startup-subtitle">
          Register your startup and track its progress
        </p>

        <form onSubmit={handleSubmit} className="startup-form">
          {/* Name */}
          <div className="form-group">
            <label>Startup Name *</label>
            <input
              type="text"
              placeholder="Enter startup name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </div>

          {/* State */}
          <div className="form-group">
            <label>State *</label>
            <input
              type="text"
              placeholder="Enter state"
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              required
            />
          </div>

          {/* Sector */}
          <div className="form-group">
            <label>Sector *</label>
            <select
              value={form.sector}
              onChange={(e) => update("sector", e.target.value)}
              required
            >
              <option value="">Select a sector</option>
              <option value="E-commerce">E-commerce</option>
              <option value="B2B Commerce">B2B Commerce</option>
              <option value="Quick Commerce">Quick Commerce</option>
              <option value="Fintech">Fintech</option>
              <option value="Insurance">Insurance</option>
              <option value="Transportation">Transportation</option>
              <option value="Food Delivery">Food Delivery</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Fantasy Sports">Fantasy Sports</option>
              <option value="Social Media">Social Media</option>
              <option value="Travel">Travel</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Edtech">Edtech</option>
              <option value="SaaS">SaaS</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Eyewear">Eyewear</option>
            </select>
          </div>

          {/* Funding */}
          <div className="form-group">
            <label>Funding (₹)</label>
            <input
              type="number"
              placeholder="Enter funding amount"
              value={form.funding}
              onChange={(e) => update("funding", e.target.value)}
            />
          </div>

          {/* Turnover */}
          <div className="form-group">
            <label>Turnover (₹)</label>
            <input
              type="number"
              placeholder="Enter turnover"
              value={form.turnover}
              onChange={(e) => update("turnover", e.target.value)}
            />
          </div>

          {/* Company Type */}
          <div className="form-group">
            <label>Company Type</label>
            <select
              value={form.companytype}
              onChange={(e) => update("companytype", e.target.value)}
            >
              <option>Private Limited</option>
              <option>LLP</option>
              <option>Sole Proprietorship</option>
              <option>Partnership</option>
              <option>Public Limited</option>
            </select>
          </div>

          {/* Registration Date */}
          <div className="form-group">
            <label>Registration Date</label>
            <input
              type="date"
              value={form.registrationDate}
              onChange={(e) => update("registrationDate", e.target.value)}
            />
          </div>

          {/* Founder */}
          <div className="form-group">
            <label>Founder Name</label>
            <input
              type="text"
              placeholder="Enter founder's name"
              value={form.founder}
              onChange={(e) => update("founder", e.target.value)}
            />
          </div>

          {/* Website */}
          <div className="form-group">
            <label>Website</label>
            <input
              type="text"
              placeholder="https://example.com"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="contact@startup.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={form.phoneNumber}
              onChange={(e) => update("phoneNumber", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Explain what this startup does..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="startup-btn">
            {loading ? "Saving..." : "Add Startup"}
          </button>
        </form>

        {error && <p className="startup-error">{error}</p>}
      </div>
    </div>
  );
}
