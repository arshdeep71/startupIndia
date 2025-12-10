import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatIndianCurrency } from "../utils/formatMoney.js";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalFunding: 0,
    activeStartups: 0,
  });
  const [topStartups, setTopStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startupsLoading, setStartupsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retries, setRetries] = useState(0);

  const handleVisitStartup = (startupId) => {
    navigate(`/startup/${startupId}`);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/startups/stats"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats({
          totalFunding: data.totalFunding || 0,
          activeStartups: data.activeStartups || 0,
        });
      } catch (error) {
        console.error("Error fetching startup stats:", error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    const fetchTopStartups = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/startups?topByFunds=true"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch top startups");
        }
        const data = await response.json();
        setTopStartups(data || []);
      } catch (error) {
        console.error("Error fetching top startups:", error);
        setTopStartups([]);
      } finally {
        setStartupsLoading(false);
      }
    };

    fetchStats();
    fetchTopStartups();
  }, []);

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        {/* LEFT SIDE */}
        <div className="hero-left">
          <h1 className="hero-heading">
            Empowering <br />
            India’s <br />
            <span className="hero-highlight">Startup Ecosystem</span>
          </h1>

          <p className="hero-para">
            Discover and explore India's thriving startup landscape. Connect
            with groundbreaking entrepreneurs, analyze market trends, and unlock
            insights into the future of Indian innovation.
          </p>

          <div className="hero-stats-row">
            <div className="hero-stat">
              <div className="hero-stat-number">
                {loading
                  ? "..."
                  : formatIndianCurrency(stats.totalFunding) + "+"}
              </div>
              <div className="hero-stat-label">Funded</div>
            </div>

            <div className="hero-stat">
              <div className="hero-stat-number">
                {loading ? "..." : stats.activeStartups + "+"}
              </div>
              <div className="hero-stat-label">Active Startups</div>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="btn1" onClick={() => navigate('/dashboard')}>
              🚀 Explore Dashboard
            </button>
            <button className="btn2" onClick={() => navigate('/analytics')}>
              📊 View Analytics
            </button>
          </div>
        </div>

        {/* RIGHT SIDE FLOATING CARDS */}
        <div className="hero-right">
          <div className="hero-card card1">
            ⭐ <br /> SUCCESS
          </div>

          <div className="hero-card card2">
            💡 <br /> INNOVATION
          </div>

          <div className="hero-card card3">
            💎 <br /> GROWTH
          </div>
        </div>
  </section>

  {/* TOP FUNDED STARTUPS SECTION */}
  <section className="top-funded-section">
    <div className="top-funded-container">
      <div className="top-funded-header">
        <h2 className="top-funded-title">Top Funded Startups</h2>
        <p className="top-funded-subtitle">Leading the innovation curve with remarkable funding achievements</p>
      </div>

      {startupsLoading ? (
        <div className="top-funded-loading">
          <div className="loading-spinner"></div>
          <p>Loading top performers...</p>
        </div>
      ) : topStartups.length > 0 ? (
        <div className="top-funded-grid">
          {topStartups.map((startup, index) => (
            <div
              key={startup._id}
              className="top-funded-card"
              onClick={() => handleVisitStartup(startup._id)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${startup.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleVisitStartup(startup._id);
                }
              }}
            >
              <div className="card-header">
                <h3 className="startup-name">{startup.name}</h3>
                <div className="startup-sector">
                  {startup.sector?.charAt(0).toUpperCase() + startup.sector?.slice(1)}
                </div>
              </div>

              <div className="card-stats">
                <div className="stat-item">
                  <div className="stat-label">Funding</div>
                  <div className="stat-value">
                    {formatIndianCurrency(startup.funding)}
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-label">Location</div>
                  <div className="stat-value">{startup.state}</div>
                </div>
              </div>

              <div className="card-action">
                <div className="view-details-btn">
                  <span>View Details</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-startups">
          <div className="no-data-icon">📊</div>
          <h3>No startup data available</h3>
          <p>Check back soon for the latest funded startups</p>
        </div>
      )}

      <div className="view-all-wrapper">
        <button className="view-all-startups-btn" onClick={() => navigate('/dashboard')}>
          View All Startups →
        </button>
      </div>
    </div>
  </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose Our Platform?</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Comprehensive Analytics</h3>
              <p>
                Access detailed insights and market trends to make informed
                decisions about your investments.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Detailed Research</h3>
              <p>
                Explore startup profiles, funding history, and performance
                metrics in one place.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Top-Ranked Startups</h3>
              <p>
                Discover the highest-funded startups across various sectors and
                regions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Growth Tracking</h3>
              <p>
                Monitor startup growth patterns and industry developments over
                time.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>Regional Insights</h3>
              <p>
                Get location-specific data and understand regional startup
                ecosystems.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Investor Ready</h3>
              <p>
                Find investment opportunities and connect with promising
                entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Ready to Explore the Startup Landscape?</h2>
            <p>
              Start your journey to discover India's most innovative companies
              and investment opportunities.
            </p>
            <div className="cta-buttons">
              <button className="cta-btn-primary" onClick={() => navigate('/dashboard')}>
                Get Started
              </button>
              <button className="cta-btn-secondary" onClick={() => navigate('/dashboard')}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
