import axios from "axios"
import React,{Component} from "react"
import "./Allcss.css"

import Swal from "sweetalert2"

export default class CreatePharmacy extends Component {

    constructor(props){
        super(props)
        this.state={
            medicineName:"",
            type:"Tablet",
            quantity:'',
            expirationDate: "",
            price:"",
        }

    }


    handleInputChange=(e)=>{
        const {name,value}=e.target
        //console.log({...this.state});
        this.setState({
            ...this.state,
            [name]:value
        })

    }

    onChangeQuantity=(e)=>{
        console.log(this.state.type)
        if(this.state.type === 'Tablet' || this.state.type === 'Inhaler'){
            this.setState({
                quantity:e.target.value.replace(/\D/g,'')+" Boxes"
            })
        }else if(
            this.state.type === 'Syrup'||
            this.state.type === 'Drops'||
            this.state.type === 'Topical'
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


    onSubmit=(e)=>{

        e.preventDefault();

        const {medicineName,type,quantity,expirationDate,price}=this.state
        const data ={
            medicineName:medicineName,
            type:type,
            quantity:quantity,
            expirationDate:expirationDate,
            price:price

        }

        //console.log(data)

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
            axios.post("/pharmacy/save",data).then((res)=>{
                let path="/addMedicine"
                if(res.data.success){
                    alert("Details Saved Successfully")
                    this.props.history.push(path)
                    this.setState({
                        medicineName:"",
                        type:"",
                        quantity:'',
                        expirationDate: "",
                        price:"",
                    })
                }
            })
        }

    }

    render(){
        return(
            <div>
                <nav class="navbar navbar-expand-lg nav" >
                    <div class="container-fluid">
                        <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ">
                            <li class="nav-item">
                            <div>
                                <button className="btn btn-success">
                                <a
                                    href="/homePharmacy"
                                    style={{ textDecoration: "none", color: "white" }}
                                >
                                    Details
                                </a>{" "}
                                </button>
                            </div>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
                <div className="card2" style={{ marginLeft: "15%" }}>
                    <div className="card" style={{ width: "65rem" }}>
                        <div className="card-body">
                            <form>
                                <br />
                                <center>
                                    <h1 className="anm">Add pharmacy booking</h1>
                                </center>
                                <br />
                                <br />
                                <div className="form-group" style={{ marginBottom: "15px" }}>
                                    <lable style={{ marginBottom: "5px" }}>Medicine Name</lable>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="medicineName"
                                        placeholder="Enter medicine name"
                                        value={this.state.medicineName}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div
                                    className="form-group col-md-6"
                                    style={{ marginBottom: "15px", marginLeft: "-1.5%" }}
                                >
                                    <lable style={{ marginBottom: "5px" }}>Medicine type</lable>
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
                                        placeholder="Choose expiration date"
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
                    <br/>
                    <br/>
                    <br/>

                </div>
                        
            </div>






        )
    }


}