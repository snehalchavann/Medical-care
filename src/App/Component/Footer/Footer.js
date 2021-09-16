import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
import './Footer.css';
  
const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
            <FooterLink href="#">Testimonials</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="/#/Medicines">OrderMedicine</FooterLink>
            <FooterLink href="/#/Health_Care_Products">Healthcare Products</FooterLink>
            <FooterLink href="/#/Lab_Tests">Lab Tests</FooterLink>
          </Column>
          <Column>
            <Heading>Policy Info</Heading>
            <FooterLink href="/#/privacyPolicy">Privacy Policy</FooterLink>
            <FooterLink href="/#/terms">Terms and Condition</FooterLink>
            <FooterLink href="#">Return Policy</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            {/* <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink> */}
            <div class="social-container">
            <a href="https://www.youtube.com/c/jamesqquick"
            className="youtube social">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a href="https://www.facebook.com/learnbuildteach/"
            className="facebook social">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.twitter.com/jamesqquick" className="twitter social">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://www.instagram.com/learnbuildteach"
            className="instagram social">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            </div>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
