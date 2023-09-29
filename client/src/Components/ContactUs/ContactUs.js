import React, { Component } from "react";
import "./ContactUs.css";

export default class ContactUs extends Component {
  render() {
    return (
      <div>
        <div class="about-section typewriter">
          <h1>
            {" "}
            <b>Contact Us.</b>
          </h1>
          <br />
          <br />
          <i class="fas fa-map-marker-alt"></i>
          <div class="topic">
            <b>Address</b>
          </div>
          <div class="text-one">Malabe Road</div>
          <div class="text-two">Colombo, Sri Lanka</div>
          <br />
          <br />

          <i class="fas fa-phone-alt"></i>
          <div class="topic">
            <b>Phone</b>
          </div>
          <div class="text-one">077 0000000</div>
          <div class="text-two">011 1233459</div>
          <br />
          <br />

          <i class="fas fa-envelope"></i>
          <div class="topic">
            <b>Email</b>
          </div>
          <div class="text-one">suwaarana123@gmail.com</div>
        </div>
      </div>
    );
  }
}
