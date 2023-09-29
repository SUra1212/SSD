import React, { Component } from "react";
import axios from "axios";

export default class patientsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.retrivePosts();
  }

  retrivePosts() {
    axios.get("/appbooking").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
        });
        console.log(this.state.posts);
      }
    });
  }

  filterData(posts, searchKey) {
    const result = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchKey) ||
        post.pname.toLowerCase().includes(searchKey) ||
        post.mobile.toLowerCase().includes(searchKey) ||
        post.date.toLowerCase().includes(searchKey) ||
        post.email.toLowerCase().includes(searchKey) ||
        post.nicpass.toLowerCase().includes(searchKey) ||
        post.area.toLowerCase().includes(searchKey)
    );
    this.setState({ posts: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/appbooking").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  render() {
    return (
      <div>
        <nav class="navbar b">
          <div class="container">
            <form class="d-flex nav1 " role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={this.handleSearchArea}
              ></input>
              &nbsp;
              <button class="btn btn-outline-warning " type="submit">
                Search
              </button>
            </form>
            <button className="btn btn-success" style={{ marginLeft: "17%" }}>
              <a
                href="/dashboard1"
                style={{ textDecoration: "none", color: "white" }}
              >
                Dashboard
              </a>
            </button>

            <a class="navbar-brand" href="#"></a>
          </div>
        </nav>
        <br />
        <center>
          <h1>
            <span
              class="badge  text-dark opacity-90 fs-3"
              style={{ marginBlockStart: "-1%" }}
            >
              All Appointment Booking Details
            </span>
          </h1>
        </center>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Date</th>
              <th scope="col">Email</th>
              <th scope="col">NIC/Passport</th>
              <th scope="col">Area</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td> <a href="/CPC">{posts.title}</a></td>
                <td> <a href="/CPC">{posts.pname}</a></td>
                <td>{posts.mobile}</td>
                <td>{posts.date}</td>
                <td>{posts.email}</td>
                <td>{posts.nicpass}</td>
                <td>{posts.area}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
