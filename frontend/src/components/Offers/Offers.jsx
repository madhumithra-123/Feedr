import React from "react";
import "./Offers.css";
import { showcase } from "../../assets/frontend_assets/assets";
import { ArrowRightIcon, TruckIcon } from "../Icons/Icons";

const offers = [
  {
    tone: "pink",
    title: "50% OFF",
    text: "On your first order",
    code: "FEEDR50",
    cta: "Order now",
    image: showcase.offer1,
  },
  {
    tone: "amber",
    title: "Flat 30% OFF",
    text: "On orders above $20",
    code: "FLAT30",
    cta: "Grab now",
    image: showcase.offer2,
  },
  {
    tone: "pink",
    title: "Free Delivery",
    text: "On orders above $15",
    code: "FREEDEL",
    cta: "Order now",
    icon: true,
  },
];

const Offers = () => {
  return (
    <section className="offers" id="offers">
      <div className="offers-head">
        <h2>
          <span>Exclusive</span> offers for you
        </h2>
        <a href="#food-display" className="view-all">
          View all offers <ArrowRightIcon />
        </a>
      </div>
      <div className="offers-grid">
        {offers.map((o) => (
          <div key={o.title} className={`offer-card ${o.tone}`}>
            <div className="offer-text">
              <h3>{o.title}</h3>
              <p>{o.text}</p>
              <span className="offer-code">
                Use code: <b>{o.code}</b>
              </span>
              <a href="#food-display" className="offer-cta">
                {o.cta} <ArrowRightIcon size={14} />
              </a>
            </div>
            {o.icon ? (
              <div className="offer-icon">
                <TruckIcon size={84} strokeWidth={1.3} />
              </div>
            ) : (
              <img src={o.image} alt="" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;
