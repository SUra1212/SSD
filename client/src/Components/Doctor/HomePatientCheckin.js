import React, { Component } from "react";
import axios from "axios";

export default class HomePatientCheckin extends Component {
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
    axios.get("/pcheck").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
        });
        console.log(this.state.posts);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/pcheck/delete/${id}`).then((res) => {
      alert("Delete Successfully");
      this.retrivePosts();
    });
  };

  filterData(posts, searchKey) {
    const result = posts.filter(
      (post) =>
        post.paname.toLowerCase().includes(searchKey) ||
        post.diagnose.toLowerCase().includes(searchKey) ||
        post.ddate.toLowerCase().includes(searchKey) ||
        post.phone.toLowerCase().includes(searchKey) ||
        post.dname.toLowerCase().includes(searchKey) ||
        post.med1.toLowerCase().includes(searchKey) ||
        post.med2.toLowerCase().includes(searchKey) ||
        post.med3.toLowerCase().includes(searchKey) ||
        post.med4.toLowerCase().includes(searchKey)
    );
    this.setState({ posts: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/pcheck").then((res) => {
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
              All Patient Check-In Details
            </span>
          </h1>
        </center>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Patient Name</th>
              <th scope="col">Diagnose</th>
              <th scope="col">Date</th>
              <th scope="col">Phone</th>
              <th scope="col">Doctor Name</th>
              <th scope="col">Panadol</th>
              <th scope="col">Asprin</th>
              <th scope="col">Ibuproten</th>
              <th scope="col">Other</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td> {posts.paname}</td>
                <td>{posts.diagnose}</td>
                <td>{posts.ddate}</td>
                <td>{posts.phone}</td>
                <td>{posts.dname}</td>
                <td>{posts.med1}</td>
                <td>{posts.med2}</td>
                <td>{posts.med3}</td>
                <td>{posts.med4}</td>
                <td>
                  <a
                    className="btn btn-warning text-dark"
                    href={`/UPC/${posts._id}`}
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
        <br />
        <center>
          <button className="btn btn-success">
            <a href="/CPC" style={{ textDecoration: "none", color: "white" }}>
              Add Patient Check-in{" "}
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
