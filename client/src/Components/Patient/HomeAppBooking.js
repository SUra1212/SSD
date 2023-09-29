import React, { Component } from "react";
import axios from "axios";

export default class HomeAppBooking extends Component {
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

  onDelete = (id) => {
    axios.delete(`/appbooking/delete/${id}`).then((res) => {
      alert("Delete Successfully");
      this.retrivePosts();
    });
  };

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
                href="/dashboard2"
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
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td> {posts.title}</td>
                <td>{posts.pname}</td>
                <td>{posts.mobile}</td>
                <td>{posts.date}</td>
                <td>{posts.email}</td>
                <td>{posts.nicpass}</td>
                <td>{posts.area}</td>
                <td>
                  <a
                    className="btn btn-warning text-dark"
                    href={`/UAB/${posts._id}`}
                  >
                    <i className="fas fa-edit"></i>&nbsp; Edit
                  </a>
                  &nbsp; &nbsp;
                  <a
                    className="btn btn-danger text-dark "
                    href="#"
                    onClick={() => this.onDelete(posts._id)}
                  >
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <center>
          <button className="btn btn-success">
            <a href="/CAB" style={{ textDecoration: "none", color: "white" }}>
              Add My Appointments{" "}
            </a>{" "}
          </button>
        </center>
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
