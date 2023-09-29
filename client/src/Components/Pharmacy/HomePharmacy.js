import React, { Component } from "react";
import axios from "axios";

export default class HomePharmacy extends Component {
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
    axios.get("/pharmacy").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
        });
        console.log(this.state.posts);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/pharmacy/delete/${id}`).then((res) => {
      alert("Delete Successfully");
      this.retrivePosts();
    });
  };

  filterData(posts,searchKey){
    console.log({...posts})
    const result = posts.filter((Fee)=>

      Fee.medicineName.toLowerCase().includes(searchKey)||
      Fee.type.toLowerCase().includes(searchKey)||
      Fee.expirationDate.toLowerCase().includes(searchKey)||
      Fee.price.toLowerCase().includes(searchKey)
   
    )
    
    this.setState({posts:result})

  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    console.log(searchKey)

    axios.get("/pharmacy").then((res) => {
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
            <br />
            <br />
            <br />

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
              All Pharmacy Details
            </span>
          </h1>
        </center>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Medicine name</th>
              <th scope="col">Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Expiration date</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td> {posts.medicineName}</td>
                <td>{posts.type}</td>
                <td>{posts.quantity}</td>
                <td>{posts.expirationDate}</td>
                <td>{posts.price}</td>
                <td>
                  <a
                    className="btn btn-warning text-dark"
                    href={`/editMedicine/${posts._id}`}
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
            <a href="/addMedicine" style={{ textDecoration: "none", color: "white" }}>
              Add medicine{" "}
            </a>{" "}
          </button>
        </center>
        <br />
        <br />
        <br />
      </div>
    );
  }
}
