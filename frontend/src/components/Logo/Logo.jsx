import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";

export const LogoMark = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="feedr-grad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ff2d87" />
        <stop offset="1" stopColor="#ffa31a" />
      </linearGradient>
    </defs>
    <path
      d="M32 54C13 40 8 29 8 21a12 12 0 0 1 24-3 12 12 0 0 1 24 3c0 8-5 19-24 33z"
      stroke="url(#feedr-grad)"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path
      d="M25 20v11m4-11v11m-4 0h4m-2 0v9M38 20c-2.5 3-2.5 8.5 0 11v9"
      stroke="url(#feedr-grad)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const Logo = ({ tagline = true }) => (
  <Link to="/" className="feedr-logo" aria-label="Feedr home">
    <LogoMark />
    <span className="feedr-logo-text">
      <span className="feedr-logo-name">Feedr</span>
      {tagline && <span className="feedr-logo-tag">Food. Love. Delivered.</span>}
    </span>
  </Link>
);

export default Logo;
