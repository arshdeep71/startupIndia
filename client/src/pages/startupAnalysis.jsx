import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatIndianCurrency } from "../utils/formatMoney.js";
import "./startupAnalysis.css";

export default function StartupAnalysis() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [individualStartup, setIndividualStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("StartupAnalysis: id =", id);
    if (id) {
      console.log("Making API call to:", `http://localhost:5000/api/startups/${id}`);
      // Load specific startup data for analysis
      axios
        .get(`http://localhost:5000/api/startups/${id}`)
        .then((res) => {
          console.log("API response:", res.data);
          setIndividualStartup(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("API error:", err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      console.log("No id parameter found");
      setError("No startup ID provided");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading startup analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-container">
        <div className="alert alert-danger">
          <span>⚠️</span>
          Error loading data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      {/* Back Button */}
      <button onClick={() => navigate(`/dashboard`)} className="btn-back">
        ← Back to Dashboard
      </button>
      <br />
      {/* Hero Section */}
      <div className="analysis-hero-section">
        <div className="analysis-hero-content">
          <div className="hero-info">
            <h1>{individualStartup.name}</h1>
            <p className="hero-subtitle">Comprehensive Analysis & Insights</p>
          </div>
        </div>
      </div>

      <div className="individual-metrics">
        <div className="metric-card metric-card-3d">
          <div className="metric-card-inner">
            <span className="stat-icon">🏆</span>
            <div>
              <p className="metric-label">Company Rating</p>
              <p className="metric-value rating-stars">
                {individualStartup.rating || 'N/A'}
                {individualStartup.rating && <span className="star">★</span>}
              </p>
            </div>
          </div>
        </div>

        <div className="metric-card metric-card-3d">
          <div className="metric-card-inner">
            <span className="stat-icon">💰</span>
            <div>
              <p className="metric-label">Total Turnover</p>
              <p className="metric-value">{formatIndianCurrency(individualStartup.turnover || 0)}</p>
            </div>
          </div>
        </div>

        <div className="metric-card metric-card-3d">
          <div className="metric-card-inner">
            <span className="stat-icon">👨‍💼</span>
            <div>
              <p className="metric-label">Founder</p>
              <p className="metric-value">{individualStartup.founder || "Not specified"}</p>
            </div>
          </div>
        </div>

        <div className="metric-card metric-card-3d">
          <div className="metric-card-inner">
            <span className="stat-icon">📈</span>
            <div>
              <p className="metric-label">Funding Raised</p>
              <p className="metric-value">{formatIndianCurrency(individualStartup.funding || 0)}</p>
            </div>
          </div>
        </div>

        <div className="metric-card metric-card-3d">
          <div className="metric-card-inner">
            <span className="stat-icon">📊</span>
            <div>
              <p className="metric-label">Growth Ratio</p>
              <p className="metric-value">
                {individualStartup.turnover && individualStartup.funding ?
                  `${((individualStartup.turnover / individualStartup.funding) * 100).toFixed(1)}x` : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="metric-card metric-card-3d">
          <div className="metric-card-inner">
            <span className="stat-icon">🎂</span>
            <div>
              <p className="metric-label">Company Age</p>
              <p className="metric-value">
                {individualStartup.registrationDate ?
                  `${new Date().getFullYear() - new Date(individualStartup.registrationDate).getFullYear()} years` :
                  "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Charts Section */}
      <div className="growth-charts-section">
        <div className="detail-card card">
          <h3 className="detail-card-title trend-title">📈 Growth Analysis & Trends</h3>

          <div className="chart-container">
            <h4>Funding vs Turnover Comparison</h4>
            <div className="dual-bar-chart">
              <div className="chart-item">
                <div className="chart-label">Funding Raised</div>
                <div className="chart-bar">
                  <div
                    className="chart-fill funding-bar"
                    style={{ width: individualStartup.funding ? '100%' : '0%' }}
                  ></div>
                </div>
                <div className="chart-value">
                  {individualStartup.funding ? formatIndianCurrency(individualStartup.funding) : 'N/A'}
                </div>
              </div>
              <div className="chart-item">
                <div className="chart-label">Total Turnover</div>
                <div className="chart-bar">
                  <div
                    className="chart-fill turnover-bar"
                    style={{
                      width: individualStartup.funding && individualStartup.turnover ?
                        `${Math.min((individualStartup.turnover / individualStartup.funding) * 100, 100)}%` : '0%'
                    }}
                  ></div>
                </div>
                <div className="chart-value">
                  {individualStartup.turnover ? formatIndianCurrency(individualStartup.turnover) : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className="statistics-summary">
            <div className="stat-row">
              <div className="stat-box">
                <span className="stat-icon">📊</span>
                <div>
                  <p className="stat-label">Funding Efficiency</p>
                  <p className="stat-value">
                    {individualStartup.turnover && individualStartup.funding ?
                      `${(individualStartup.turnover / individualStartup.funding * 100).toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="stat-box">
                <span className="stat-icon">⭐</span>
                <div>
                  <p className="stat-label">User Rating</p>
                  <p className="stat-value rating-stars">
                    {individualStartup.rating ? `${individualStartup.rating}/5` : 'N/A'}
                    {individualStartup.rating && <span className="star">★</span>}
                  </p>
                </div>
              </div>
              <div className="stat-box">
                <span className="stat-icon">📅</span>
                <div>
                  <p className="stat-label">Years Active</p>
                  <p className="stat-value">
                    {individualStartup.registrationDate ?
                      new Date().getFullYear() - new Date(individualStartup.registrationDate).getFullYear() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="trend-insights">
            <h4>📋 Key Insights</h4>
            <div className="insights-list">
              <div className="insight-item">
                <span className="insight-icon">💡</span>
                <span>
                  {individualStartup.turnover && individualStartup.funding ?
                    individualStartup.turnover > individualStartup.funding ?
                      "Excellent ROI: Turnover exceeds funding investment" :
                      "Growing steadily: Investment is building foundation for growth" :
                    "More data needed for comprehensive analysis"}
                </span>
              </div>
              <div className="insight-item">
                <span className="insight-icon">🎯</span>
                <span>
                  Operating in {individualStartup.sector} sector with rating of {individualStartup.rating || 'unavailable'}
                </span>
              </div>
              <div className="insight-item">
                <span className="insight-icon">🏆</span>
                <span>
                  Founded {(individualStartup.registrationDate ?
                    new Date().getFullYear() - new Date(individualStartup.registrationDate).getFullYear() :
                    'years ago')}, based in {individualStartup.state}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="individual-details">
        <div className="detail-card card">
          <h3 className="detail-card-title">Complete Startup Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <strong>Founder:</strong>
              <span>{individualStartup.founder || "Not specified"}</span>
            </div>
            <div className="detail-item">
              <strong>Email:</strong>
              <span>{individualStartup.email || "Not provided"}</span>
            </div>
            <div className="detail-item">
              <strong>Phone:</strong>
              <span>{individualStartup.phoneNumber || "Not provided"}</span>
            </div>
            <div className="detail-item">
              <strong>Company Type:</strong>
              <span>{individualStartup.companytype || "Not specified"}</span>
            </div>
            <div className="detail-item">
              <strong>Website:</strong>
              <span>
                {individualStartup.website ? (
                  <a href={individualStartup.website} target="_blank" rel="noopener noreferrer">
                    {individualStartup.website} →
                  </a>
                ) : (
                  "Not provided"
                )}
              </span>
            </div>
            <div className="detail-item">
              <strong>Description:</strong>
              <span>{individualStartup.description || "No description available"}</span>
            </div>
            <div className="detail-item">
              <strong>Status:</strong>
              <span className="status-active">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate(`/startup/${id}`)} className="btn btn-primary">
          ← Back to Startup Details
        </button>
        <button onClick={() => navigate("/analytics")} className="btn btn-secondary">
          View Overall Analytics
        </button>
      </div>
    </div>
  );
}
