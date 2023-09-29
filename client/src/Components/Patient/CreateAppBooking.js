import Axios from "axios";
import React, { Component } from "react";
import "./Allcss.css";
import swal from "@sweetalert/with-react";
import DOMPurify from "dompurify";

export default class CreateAppBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      pname: "",
      mobile: "",
      date: "",
      email: "",
      nicpass: "",
      area: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { title, pname, mobile, date, email, nicpass, area } = this.state;
    const data = {
      title: title,
      pname: pname,
      mobile: mobile,
      date: date,
      email: email,
      nicpass: nicpass,
      area: area,
    };
    console.log(data);

     //email validation
    const uemail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //phone number validation
    const ph = /^[0-9\b]+$/;
    if (!ph.test(String(mobile)) || mobile.length != 10) {
      swal(
        "Invalid Contact Number !",
        "contact number should be valid pattern",
        "error"
      );
    } else if (!uemail.test(String(email))) {
      swal(
        "Invalid email address !",
        "Please enter valid email address",
        "error"
      );

      } else if (
      title.length === 0 ||
      pname.length === 0 ||
      mobile.length === 0 ||
      date.length === 0 ||
      email.length===0 ||
      nicpass.length === 0 ||
      area.length === 0
    ) {
      swal("Please fill all the details");
    } else {
      Axios.post("/appbooking/save", data).then((res) => {
        let path = "/CAB";
        if (res.data.success) {
          alert("Appointment Booked Successfully");
          this.props.history.push(path);
          this.setState({
            title: "",
            pname: "",
            mobile: "",
            date: "",
            email: "",
            nicpass: "",
            area: "",
          });
        }
      });
    }
  };
  render() {
     const { title, pname, mobile, date, email, nicpass, area } = this.state;

     // Sanitize the data before rendering
     const sanitizedTitle = DOMPurify.sanitize(title);
     const sanitizedPname = DOMPurify.sanitize(pname);
     const sanitizedMobile = DOMPurify.sanitize(mobile);
     const sanitizedDate = DOMPurify.sanitize(date);
     const sanitizedEmail = DOMPurify.sanitize(email);
     const sanitizedNicpass = DOMPurify.sanitize(nicpass);
     const sanitizedArea = DOMPurify.sanitize(area);
    return (
      <div>
        <nav class="navbar navbar-expand-lg nav">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ">
                <li class="nav-item">
                  <div>
                    <button className="btn btn-success">
                      <a
                        href="/HAB"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Details
                      </a>{" "}
                    </button>
                    <button className="btn btn-success">
                      <a
                        href="/dashboard2"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Dashboard
                      </a>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="card2" style={{ marginLeft: "15%" }}>
          <div className="card" style={{ width: "65rem" }}>
            <div class="card-body">
              <form>
                <br />
                <center>
                  <h1 className="anm">My Appointment Booking</h1>
                </center>
                <br />
                <br />
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>Title</lable>
                  <select
                    name="title"
                    onChange={this.handleInputChange}
                    value={this.state.title}
                    defaultValue="Select Title"
                    className="form-control"
                  >
                    <option defaultValue>Mr</option>
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Mast</option>
                    <option>Dr</option>
                    <option>Prof</option>
                    <option>Baby</option>
                  </select>
                </div>
                <h3 className="title">
                  <span
                    className="badge bg-light text-dark"
                    dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
                  ></span>
                </h3>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>Patient Name</lable>
                  <input
                    type="text"
                    className="form-control"
                    name="pname"
                    placeholder="Enter your name"
                    value={this.state.pname}
                    onChange={this.handleInputChange}
                  />
                </div>
                <h3 className="title">
                  <span
                    className="badge bg-light text-dark"
                    dangerouslySetInnerHTML={{ __html: sanitizedPname }}
                  ></span>
                </h3>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>Mobile</lable>
                  <input
                    type="number"
                    className="form-control"
                    name="mobile"
                    placeholder="Enter your mobile"
                    value={this.state.mobile}
                    onChange={this.handleInputChange}
                  />
                </div>
                <h3 className="title">
                  <span
                    className="badge bg-light text-dark"
                    dangerouslySetInnerHTML={{ __html: sanitizedMobile }}
                  ></span>
                </h3>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>Date</lable>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    placeholder="Choose date"
                    value={this.state.date}
                    onChange={this.handleInputChange}
                  />
                </div>
                <h3 className="title">
                  <span
                    className="badge bg-light text-dark"
                    dangerouslySetInnerHTML={{ __html: sanitizedDate }}
                  ></span>
                </h3>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>Email</lable>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <h3 className="title">
                  <span
                    className="badge bg-light text-dark"
                    dangerouslySetInnerHTML={{ __html: sanitizedEmail }}
                  ></span>
                </h3>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>NIC/Passport</lable>
                  <input
                    type="text"
                    className="form-control"
                    name="nicpass"
                    placeholder="Enter your NIC or Passport"
                    value={this.state.nicpass}
                    onChange={this.handleInputChange}
                  />
                </div>
                {/* Display sanitized area using dangerouslySetInnerHTML */}
                <h3 className="title">
                  <span
                    className="badge bg-light text-dark"
                    dangerouslySetInnerHTML={{ __html: sanitizedNicpass }}
                  ></span>
                </h3>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>Area</lable>
                  <input
                    type="text"
                    className="form-control"
                    name="area"
                    placeholder="Enter your area"
                    value={this.state.area}
                    onChange={this.handleInputChange}
                  />
                </div>
                {/* Display sanitized area using dangerouslySetInnerHTML */}
                <h3 className="title">
                  <span
                    className="badge bg-light text-dark"
                    dangerouslySetInnerHTML={{ __html: sanitizedArea }}
                  ></span>
                </h3>
              </form>
              <br></br>
              <center>
                <a
                  className="btn btn-warning btn-lg text-dark"
                  type="submit"
                  style={{ marginTop: "15px" }}
                  onClick={this.onSubmit}
                >
                  <i className="far fa-check-square"></i>
                  &nbsp; Save
                </a>
              </center>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
