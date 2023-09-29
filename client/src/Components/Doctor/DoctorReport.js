import React, { Component } from "react";
import axios from "axios";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

export default class DoctorReport extends Component {
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

  createPdf = (pdfBody) => {

    var doc = new jsPDF('portrait', 'px', 'a3');
    var totalPagesExp = "{total_pages_count_string}"; //placeholder for total number of pages 
    doc.autoTable({
      didDrawPage: function (data) {

        // Header
        doc.setFontSize(14);
        var fileTitle = "Patient Check-in Report";
        var img = './Reportimg.jpg';
        doc.text(fileTitle, 30, 250);
        doc.addImage(img, 'JPEG', 2, 2, 628, 200);

        // Footer
        var pageSize = doc.internal.pageSize;
        //jsPDF 1.4+ uses getHeight, <1.4 uses .height
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

        doc.autoTable({
          html: '#my-table',
          startY: pageHeight - 630,
          theme: 'grid'
        });

        var str = "Page " + doc.internal.getNumberOfPages()
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
      margin: {
        bottom: 60, //this decides how big your footer area will be
        top: 40 //this decides how big your header area will be.
      }
    });
    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save('Patient Check-in Report.pdf'); //this downloads a copy of the pdf in your local instance.
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

            <button className="btn btn-success" style={{ marginLeft: '17%' }}>
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

        <center>
          <h1><span class="badge  text-dark opacity-90 fs-3" style={{ marginBlockStart: '-3%' }}>Patient Report</span></h1>
        </center>

        <table id="my-table" class=" container table table-bordered ">
          <thead class="table-info">
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

              </tr>
            ))}
          </tbody>
        </table>
        <center>
          <button className="btn btn-warning text-dark " >
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
