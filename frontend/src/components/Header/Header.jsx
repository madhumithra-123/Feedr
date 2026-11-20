import React from "react";
import "./Header.css";
import { showcase } from "../../assets/frontend_assets/assets";
import {
  ArrowRightIcon,
  ZapIcon,
  UsersIcon,
  StoreIcon,
  ClockIcon,
  StarIcon,
} from "../Icons/Icons";

const stats = [
  { icon: UsersIcon, value: "25K+", label: "Happy Customers" },
  { icon: StoreIcon, value: "500+", label: "Restaurants" },
  { icon: ClockIcon, value: "30 Min", label: "Avg. Delivery" },
  { icon: StarIcon, value: "4.8", label: "Avg. Rating" },
];

const Header = () => {
  return (
    <section className="header">
      <div className="header-contents">
        <span className="header-badge">
          <ZapIcon size={14} /> Fast Delivery
        </span>
        <h1>
          Delicious Food
          <span className="pink">Delivered</span>
          To Your <span className="amber">Door</span>
        </h1>
        <p>
          Fresh meals, fast delivery, great prices and 100% satisfaction. Pick
          your cravings from the best kitchens near you and we'll bring them
          hot to your table.
        </p>
        <div className="header-actions">
          <a href="#food-display" className="neon-btn">
            Order Now <ArrowRightIcon size={18} />
          </a>
          <a href="#explore-menu" className="ghost-btn">
            Browse Menu <ArrowRightIcon size={18} />
          </a>
        </div>
      </div>

      <div className="header-visual" aria-hidden="true">
        <div className="hero-ring">
          <img className="hero-dish" src={showcase.hero} alt="" />
        </div>
        <img className="orbit o1" src={showcase.orbit1} alt="" />
        <img className="orbit o2" src={showcase.orbit2} alt="" />
        <img className="orbit o3" src={showcase.orbit3} alt="" />
        <div className="hero-offer">
          <small>Up to</small>
          <strong>50%</strong>
          <small>Off</small>
        </div>
      </div>

      <ul className="header-stats">
        {stats.map(({ icon: Icon, value, label }) => (
          <li key={label}>
            <Icon size={26} />
            <div>
              <b>{value}</b>
              <span>{label}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Header;
