import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default class EditMedicine extends Component {
  constructor(props) {
    super(props);
    this.state={
      medicineName:"",
      type:"Tablet",
      quantity:"",
      expirationDate: "",
      price:"",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onChangeQuantity=(e)=>{
    console.log(this.state.type)
    if(this.state.type == 'Tablet' || this.state.type == 'Inhaler'){
        this.setState({
            quantity:e.target.value.replace(/\D/g,'')+" Boxes"
        })
    }else if(
        this.state.type == 'Syrup'||
        this.state.type == 'Drops'||
        this.state.type == 'Topical'
    ){
        this.setState({
            quantity:e.target.value.replace(/\D/g,'')+" Bottles"
        })
    }
     

}

onChangePrice=(e)=>{
    console.log(e.target.value)
    this.setState({
        price:"Rs."+e.target.value.replace(/\D/g,'')
    })
}


  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const { medicineName,type,quantity,expirationDate,price } = this.state;

    const data = {
      medicineName: medicineName,
      type: type,
      quantity: quantity,
      expirationDate: expirationDate,
      price: price,
    };
 //validation
        if(
            medicineName.length === 0||
            type.length === 0||
            quantity.length === 0 ||
            expirationDate.length === 0 ||
            price.length === 0 
        ){
           Swal.fire({
            icon: 'error',
            title: 'Warning',
            text: 'Fill out all fields!',
          })
        }else{
    axios.put(`/pharmacy/update/${id}`, data).then((res) => {
      let path = "/homePharmacy";
      if (res.data.success) {
        alert("Medicine details Updated Successfully");
        this.props.history.push(path);
        this.setState({
          medicineName:"",
          type:"",
          quantity:"",
          expirationDate:"",
          price:"",
        });
      }
    });
  };
}

  componentDidMount() {
    const id = this.props.match.params.id
    console.log(id)

    axios.get(`/pharmacy/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          medicineName: res.data.post.medicineName,
          type: res.data.post.type,
          quantity: res.data.post.quantity,
          expirationDate: res.data.post.expirationDate,
          price: res.data.post.price,
        });

        console.log(this.state.post);
      }
    });
  }

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
            <a class="navbar-brand" href="#"></a>
          </div>
        </nav>
        <div className="card2">
          <div className="card" style={{ width: "65rem" }}>
            <div class="card-body">
              <form>
                <br />
                <center>
                  <h1 className="anm"> Edit medicine</h1>
                </center>
                <br />
                <br />

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>Patient Name</lable>
                  <input
                    type="text"
                    className="form-control"
                    name="medicineName"
                    placeholder="Enter your name"
                    value={this.state.medicineName}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>Title</lable>
                  <select
                    name="type"
                    onChange={this.handleInputChange}
                    value={this.state.type}
                    className="form-control"
                  >
                     <option>Tablet</option>
                     <option>Syrup</option>
                     <option>Inhaler</option>
                     <option>Drops</option>
                     <option>Topical</option>
                  </select>
                </div>

                
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>Quantity</lable>
                  <input
                      type="text"
                      className="form-control"
                      name="quantity"
                      placeholder="Enter medicine quantity"
                      value={this.state.quantity}
                      onChange={this.onChangeQuantity}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>Expiration date</lable>
                  <input
                    type="date"
                    className="form-control"
                    name="expirationDate"
                    placeholder="Choose date"
                    value={this.state.expirationDate}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <lable style={{ marginBottom: "5px" }}>Price</lable>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    placeholder="Enter price"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                  />
                </div>
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
                  &nbsp; Update
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
