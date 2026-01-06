import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <section className="services">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>
        <p className="services-intro">
          At <strong>GoodFood</strong>, we offer more than just food delivery.
          Our services are designed to make your dining experience easy, fast,
          and enjoyable.
        </p>

        <div className="services-list">
          <div className="service-card">
            <h3>🍔 Fast Food Delivery</h3>
            <p>
              Get your favorite burgers, pizzas, and snacks delivered hot and
              fresh right at your doorstep.
            </p>
          </div>

          <div className="service-card">
            <h3>🥗 Healthy Meal Options</h3>
            <p>
              Choose from a wide variety of healthy and balanced meals prepared
              with fresh ingredients.
            </p>
          </div>

          <div className="service-card">
            <h3>🚴 Express Delivery</h3>
            <p>
              Our riders ensure that your food reaches you quickly without
              compromising quality.
            </p>
          </div>

          <div className="service-card">
            <h3>📦 Bulk Orders</h3>
            <p>
              Hosting a party or office meeting? Order in bulk and we’ll make
              sure everything arrives on time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
