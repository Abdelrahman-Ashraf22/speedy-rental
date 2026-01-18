// components/AboutUs.tsx
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Speedy Rentals / About Us",
  description: "Learn more about Speedy Rentals, our mission, and our team.",
};
const AboutUs: React.FC = () => {
  return (
    <>
      <div className="about-page">
        <div className="about-wrapper">
          <h1 className="about-title">About Speedy Rentals</h1>

          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2010, Speedy Rentals has been at the forefront of
              providing reliable and affordable car rental services. What
              started as a small operation in Cairo, Egypt, has grown into a
              trusted name across the region. We believe that every journey
              deserves the perfect vehicle, and we&apos;re here to make renting
              a car as seamless and exciting as your adventure.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              At Speedy Rentals, our mission is simple: to offer high-quality,
              well-maintained vehicles at competitive prices while delivering
              exceptional customer service. We prioritize safety, convenience,
              and sustainability, ensuring that every rental contributes to a
              positive experience for our customers and the environment.
            </p>
          </section>

          <section className="about-section">
            <h2>Why Choose Us?</h2>
            <ul>
              <li>
                <strong>Wide Selection:</strong> From compact cars to luxury
                SUVs, we have options for every need and budget.
              </li>
              <li>
                <strong>Easy Booking:</strong> Our user-friendly platform and
                24/7 support make renting a breeze.
              </li>
              <li>
                <strong>Quality Assurance:</strong> All vehicles are regularly
                inspected and maintained to the highest standards.
              </li>
              <li>
                <strong>Local Expertise:</strong> With locations in key areas,
                we provide insider tips for your travels.
              </li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Meet Our Team</h2>
            <p>
              Our dedicated team of professionals is passionate about cars and
              customer satisfaction. From our mechanics to our customer service
              experts, everyone at Speedy Rentals is committed to making your
              rental experience unforgettable.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
