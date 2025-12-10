import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  MapPin,
  Calendar,
  CheckCircle,
  Mail,
  Phone,
  Globe,
  User,
  Building,
} from "lucide-react";
import axios from "axios";
import { formatIndianCurrency as formatMoney } from "../utils/formatMoney.js";
import "./startupDetails.css";

export default function StartupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/startups/${id}`)
      .then((res) => {
        setStartup(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="details-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading startup details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <div className="alert alert-danger">
          <span>⚠️</span>
          Error loading startup: {error}
        </div>
        <button onClick={() => navigate("/")} className="btn-back">
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="details-container">
        <div className="alert alert-danger">
          <span>⚠️</span>
          Startup not found
        </div>
        <button onClick={() => navigate("/")} className="btn-back">
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="details-container">
      {/* Navigation Header */}
      <div className="nav-header">
        <button onClick={() => navigate("/dashboard")} className="btn-back">
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <div className="page-indicator">
          <span className="breadcrumb">Dashboard</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Startup Details</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title">{startup.name}</h1>
            <p className="hero-subtitle">{startup.sector}</p>
            <br />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Information Cards Grid */}
        <div className="info-grid">
          {/* Contact Information */}
          <div className="info-card">
            <div className="card-header">
              <h3>Contact Information</h3>
            </div>
            <div className="card-content">
              {startup.founder && (
                <div className="info-item">
                  <User size={18} className="info-icon" />
                  <div>
                    <span className="info-label">Founder</span>
                    <span className="info-value"> {startup.founder}</span>
                  </div>
                </div>
              )}

              {startup.email && (
                <div className="info-item">
                  <Mail size={18} className="info-icon" />
                  <div>
                    <span className="info-label">Email </span>
                    <a href={`mailto:${startup.email}`} className="info-link">
                      {startup.email}
                    </a>
                  </div>
                </div>
              )}

              {startup.phoneNumber && (
                <div className="info-item">
                  <Phone size={18} className="info-icon" />
                  <div>
                    <span className="info-label">Phone </span>
                    <a
                      href={`tel:${startup.phoneNumber}`}
                      className="info-link"
                    >
                      {startup.phoneNumber}
                    </a>
                  </div>
                </div>
              )}

              {startup.website && (
                <div className="info-item">
                  <Globe size={18} className="info-icon" />
                  <div>
                    <span className="info-label">Website </span>
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-link"
                    >
                      {startup.name}.com 
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Business Information */}
          <div className="info-card">
            <div className="card-header">
              <h3>Business Details </h3>
            </div>
            <div className="card-content">
              <div className="info-item">
                <MapPin size={18} className="info-icon" />
                <div>
                  <span className="info-label">Location </span>
                  <span className="info-value">{startup.state}</span>
                </div>
              </div>

              <div className="info-item">
                <Building size={18} className="info-icon" />
                <div>
                  <span className="info-label">Company Type </span>
                  <span className="info-value">
                    {startup.companytype || "Not specified"}
                  </span>
                </div>
              </div>

              {startup.foundedYear && (
                <div className="info-item">
                  <Calendar size={18} className="info-icon" />
                  <div>
                    <span className="info-label">Founder</span>
                    <span className="info-value">{startup.foundeder}</span>
                  </div>
                </div>
              )}

              <div className="info-item">
                <TrendingUp size={18} className="info-icon" />
                <div>
                  <span className="info-label">Funding </span>
                  <span className="info-value funding">
                    {startup.funding
                      ? formatMoney(startup.funding)
                      : "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {startup.description && (
          <div className="description-card">
            <div className="card-header">
              <h3>About {startup.name}</h3>
            </div>
            <div className="card-content">
              <p className="description-text">{startup.description}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-section">
          <button
            onClick={() => navigate(`/analytics/${id}`)}
            className="btn btn-primary btn-large"
          >
            <TrendingUp size={20} />
            View Startup Analytics
          </button>
          <div className="action-hint">
            Get detailed insights and market analysis for {startup.name}
          </div>
        </div>
      </div>
    </div>
  );
}
