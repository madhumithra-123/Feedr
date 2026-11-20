import React from "react";
import "./WhyChoose.css";
import { TruckIcon, AwardIcon, TagIcon, CardIcon, HeadsetIcon } from "../Icons/Icons";

const reasons = [
  { icon: TruckIcon, title: "Fast Delivery", text: "On time, every time" },
  { icon: AwardIcon, title: "Best Quality", text: "Fresh food & hygiene" },
  { icon: TagIcon, title: "Best Offers", text: "Great deals & discounts" },
  { icon: CardIcon, title: "Secure Payment", text: "Safe & easy checkout" },
  { icon: HeadsetIcon, title: "24/7 Support", text: "We are here for you" },
];

const WhyChoose = () => {
  return (
    <section className="why-choose">
      <h2 className="why-title">Why choose us?</h2>
      <ul className="why-grid">
        {reasons.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <span className="why-icon">
              <Icon size={34} strokeWidth={1.5} />
            </span>
            <div>
              <b>{title}</b>
              <small>{text}</small>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyChoose;
