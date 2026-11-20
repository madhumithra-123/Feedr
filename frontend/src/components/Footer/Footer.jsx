import React from "react";
import "./Footer.css";
import Logo from "../Logo/Logo";
import { InstagramIcon, FacebookIcon, YoutubeIcon, TwitterIcon } from "../Icons/Icons";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-content-left">
            <Logo />
            <p className="footer-copy-desktop">
              Fresh meals from the kitchens you love, delivered fast and hot to
              your door. Food. Love. Delivered.
            </p>
          </div>
          <div className="footer-col">
            <h2>Company</h2>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Customer Care</h2>
            <ul>
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Terms &amp; Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Get in touch</h2>
            <ul>
              <li>+92-308-4900522</li>
              <li>contact@feedr.com</li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Follow us</h2>
            <div className="footer-social-icons">
              <a href="#footer" aria-label="Instagram"><InstagramIcon size={18} /></a>
              <a href="#footer" aria-label="Facebook"><FacebookIcon size={18} /></a>
              <a href="#footer" aria-label="YouTube"><YoutubeIcon size={18} /></a>
              <a href="#footer" aria-label="Twitter"><TwitterIcon size={18} /></a>
            </div>
          </div>
        </div>
        <p className="footer-copyright">
          Copyright 2024 @ Feedr.com - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
