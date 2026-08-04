import { Link } from "react-router-dom";
import logo from "../assets/tranquil-roots-logo.png";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__overlay"></div>

        <div className="hero__content">
            <img
  className="hero__logo"
  src={logo}
  alt="Tranquil Roots Head and Body Spa"
/>
          <p className="hero__eyebrow">Head Spa & Wellness</p>

          <h1>Relax. Restore. Renew.</h1>

          <p className="hero__description">
            Experience calming scalp care, restorative treatments, and a
            peaceful wellness journey designed to help you feel renewed from
            root to soul.
          </p>

          <div className="hero__buttons">
            <Link className="button button--primary" to="/booking">
              Book an Appointment
            </Link>

            <Link className="button button--secondary" to="/services">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <section className="intro section">
        <p className="section__eyebrow">Welcome to Tranquil Roots</p>

        <h2>Healthy hair begins with a healthy scalp.</h2>

        <p>
          Our head spa treatments combine relaxation, scalp cleansing,
          hydration, and personalized wellness care in a peaceful environment.
        </p>
      </section>

      <section className="benefits section">
        <article className="benefit-card">
          <span>🌿</span>
          <h3>Scalp Wellness</h3>
          <p>
            Treatments designed to cleanse, nourish, and support a balanced
            scalp.
          </p>
        </article>

        <article className="benefit-card">
          <span>💧</span>
          <h3>Deep Hydration</h3>
          <p>
            Restore moisture and softness with relaxing hydration-focused
            services.
          </p>
        </article>

        <article className="benefit-card">
          <span>✨</span>
          <h3>Peaceful Renewal</h3>
          <p>
            Step away from daily stress and enjoy a calming, restorative
            experience.
          </p>
        </article>
      </section>

      <section className="home-cta">
        <div>
          <p className="section__eyebrow">Your wellness journey starts here</p>
          <h2>Give yourself permission to pause.</h2>
        </div>

        <Link className="button button--light" to="/booking">
          Reserve Your Experience
        </Link>
      </section>
    </>
  );
}


export default Home;