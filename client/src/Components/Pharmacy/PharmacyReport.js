import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default class PharmacyReport extends Component {
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

  //pdfCreation
  createPdf = (pdfBody) => {
    var doc = new jsPDF("portrait", "px", "a3");
    var totalPagesExp = "{total_pages_count_string}"; //placeholder for total number of pages
    doc.autoTable({
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(14);
        var fileTitle = "Medicine details Report";
        var img = "./Reportimg.jpg";
        doc.text(fileTitle, 30, 250);
        doc.addImage(img, "JPEG", 2, 2, 628, 200);

        // Footer
        var pageSize = doc.internal.pageSize;
        //jsPDF 1.4+ uses getHeight, <1.4 uses .height
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

        doc.autoTable({
          html: "#my-table",
          startY: pageHeight - 630,
          theme: "grid",
        });

        var str = "Page " + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
      margin: {
        bottom: 60, //this decides how big your footer area will be
        top: 40, //this decides how big your header area will be.
      },
    });
    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save("Medicine details.pdf"); //this downloads a copy of the pdf in your local instance.
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
                href="/dashboard3"
                style={{ textDecoration: "none", color: "white" }}
              >
                Dashboard
              </a>
            </button>
            <a class="navbar-brand" href="#"></a>
          </div>
        </nav>

        <center>
          <h1>
            <span
              class="badge  text-dark opacity-90 fs-3"
              style={{ marginBlockStart: "-3%" }}
            >
              Medicine Report
            </span>
          </h1>
        </center>

        <table id="my-table" class=" container table table-bordered ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Medicine name</th>
            <th scope="col">Type</th>
            <th scope="col">Quantity</th>
            <th scope="col">Expiration date</th>
            <th scope="col">Price</th>
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
              </tr>
            ))}
          </tbody>
        </table>
        <center>
          <button className="btn btn-warning text-dark ">
            <a onClick={this.createPdf}>
              <i className="fa fa-file-pdf-o"></i>&nbsp;Download PDF
            </a>
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
