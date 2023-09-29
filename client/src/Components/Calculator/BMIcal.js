import React, { Component } from "react";
import "./cal.css";

export default class BMIcal extends Component {
  constructor() {
    super();

    this.state = {
      heightFeet: "",
      heightInch: "",
      weight: "",
    };

    this.handleHeightFeetChange = this.handleHeightFeetChange.bind(this);
    this.handleHeightInchChange = this.handleHeightInchChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.calculateBMI = this.calculateBMI.bind(this);
  }

  handleHeightFeetChange(event) {
    this.setState({
      heightFeet: event.target.value,
    });
  }

  handleHeightInchChange(event) {
    this.setState({
      heightInch: event.target.value,
    });
  }

  handleWeightChange(event) {
    this.setState({
      weight: event.target.value,
    });
  }

  calculateBMI() {
    if (this.state.weight && this.state.heightFeet && this.state.heightInch) {
      // BMI Formula = (WEIGHT[in pounds] / (HEIGHT[in inches] * HEIGHT[in inches])) * 703;
      let INCHES_IN_FEET = 12;

      var height = Number(this.state.heightFeet);
      // convert feet to inches
      height *= INCHES_IN_FEET;
      // add the inches input field
      height += Number(this.state.heightInch);

      let weight = this.state.weight;

      var bmi = (weight / (height * height)) * 703;
      bmi = bmi.toFixed(2);

      return bmi;
    }
  }

  getBMIResults(bmi) {
    let bmiResults = {
      label: "",
      alertClass: "",
    };

    if (bmi <= 18.5) {
      bmiResults.label = "Underweight";
      bmiResults.alertClass = "alert-danger";
    } else if (bmi <= 24.9) {
      bmiResults.label = "Normal weight";
      bmiResults.alertClass = "alert-success";
    } else if (bmi <= 29.9) {
      bmiResults.label = "Overweight";
      bmiResults.alertClass = "alert-warning";
    } else if (bmi >= 30) {
      bmiResults.label = "Obesity";
      bmiResults.alertClass = "alert-danger";
    } else {
      bmiResults.label = "BMI";
      bmiResults.alertClass = "alert-primary";
    }

    return bmiResults;
  }

  render() {
    let bmi = this.calculateBMI();
    let results = this.getBMIResults(bmi);

    return (
      <div >
        <br/>
         <center>
          <h1>
            <span
              class="badge  text-dark "
              style={{ marginBlockStart: "-1%" }}
            >
              BMI Calculator
            </span>
            <p>Enter your weight and height below.</p>
          </h1>
          </center>
         <div className="card2" style={{ marginLeft: "5%" }}>
          <div className="card" style={{ width: "85rem" }}>
            <div class="card-body">
           
             
        <br/>
        <br/>
        <div className="row" style={{ marginLeft:"22%"}}>
          <div className="col-sm-6">
            <form>
              <div className="form-group ">
                <legend className="bmiwh">Weight (lb) </legend>
                <div className="row">
                  <div className="col-xs-12" style={{ width: "15rem" }}>
                    <input
                      className="form-control"
                      id="bmiWeight"
                      type="number"
                      min="1"
                      max="1000"
                      value={this.state.weight}
                      onChange={this.handleWeightChange}
                    />
                    
                  </div>
                </div>
              </div>

              <div className="form-group">
                <legend className="bmiwh">Height (ft/in)</legend>
                <div className="row">
                  <div className="col-xs-6" style={{ width: "15rem" }}>
                    <input
                      className="form-control"
                      id="bmiHeightFeet"
                      type="number"
                      min="1"
                      max="12"
                      value={this.state.heightFeet}
                      onChange={this.handleHeightFeetChange}
                    />
                    
                  </div>
                  &nbsp; &nbsp;&nbsp; &nbsp;
                  <div className="col-xs-6" style={{ width: "15rem" }}>
                    <input
                      className="form-control"
                      id="bmiHeightInch"
                      type="number"
                      min="0"
                      max="12"
                      value={this.state.heightInch}
                      onChange={this.handleHeightInchChange}
                    />
                   
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-sm-6" style={{ marginTop:'20%', marginLeft: '-40%'}}>
            <BmiDisplay
              bmi={bmi}
              label={results.label}
              alertClass={results.alertClass}
            />
          </div>
        </div>
         </div>
            </div>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>
      </div>
      
    );
  }
}

function BmiDisplay(props) {
  return (
    <div className={"bmi-result alert " + props.alertClass}>
      <div>{props.bmi || "--.-"}</div>
      <div>{props.label}</div>
    </div>
  );
}
