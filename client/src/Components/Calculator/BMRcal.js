import React, { Component } from 'react'
import './BMR.css'

class BMRcal extends Component {

    constructor() {

        super();

        this.state = {

            gender: '',
            weight: '',
            age:'',
            heightfeet: '',
            heightinches: '',
            activity:'',
            bmr: '',
            error: '',
            flag: false,
            system: ''
            


        }

    }

    handleAgeChange= (event) => {

        this.setState({age:event.target.value });
    }
    handleWeightChange= (event) => {

        this.setState({weight:event.target.value });
    }
    handleHeightFeetChange= (event) => {

        this.setState({heightfeet:event.target.value });
    }
    handleHeightInchesChange= (event) => {

        this.setState({heightinches:event.target.value });
    }
    handleGenderChange= (event) => {

        this.setState({gender:event.target.value });
    }
    handleActivityChange= (event) => {

        this.setState({activity:event.target.value });
    }
    handleSystemChange= (event) => {

        this.setState({system:event.target.value });
    }

    calculateBMR() {


        let age = this.state.age;
        let weight = this.state.weight;
        let heightFeet = this.state.heightfeet;  //will be used as height in CM for metric system
        let heightInches= this.state.heightinches;
        let gender = this.state.gender;
        
        if(this.state.system ==1)
        {
            if(age == '' || weight == '' || gender == '' || heightFeet == '' || heightInches == '')
            {
                this.setState({error: 'All fields are required'});
                return;
            }
        }
        else if(this.state.system ==2)
        {   if(age == '' || weight == '' || gender == '' || heightFeet == '')
        {
            this.setState({error: 'All fields are required'});
            return;
        }

        }



        var bmrCalc = '';
        if(this.state.system==1)
        {
        let height = ( (heightFeet * 30.48) + (heightInches*2.54) );
        if(gender == 1) //Female
        {  bmrCalc = 655.1 + ( 4.35 * weight ) + ( 4.7 * height ) - ( 4.7 * age ) }
        else if (gender == 2) //Male
        {  bmrCalc=  66 + ( 6.2 * weight ) + ( 12.7 * height) - ( 6.76 * age )  }
        }
        else if(this.state.system ==2)
        {
            if(gender == 1) //Female
            {  bmrCalc = 655 + ( 9.563 * weight ) + ( 1.850 * heightFeet ) - ( 4.676 * age ) }
            else if (gender == 2) //Male
            {  bmrCalc=  66.5 + ( 13.75 * weight) + ( 5.003 * heightFeet) - ( 6.755 * age )  }
                 

        }

        this.setState({bmr:bmrCalc});
        this.setState({flag:true});
        this.setState({error: ''});
    }

    calculateAct() {
        let ActCalc;

        
        if (this.state.activity == '1.2')
        {  ActCalc = this.state.bmr * 1.2;}
        else if(this.state.activity == '1.375') 
        {ActCalc = this.state.bmr * 1.375;}
        else if(this.state.activity == '1.55') 
        {ActCalc = this.state.bmr * 1.55;}
        else if(this.state.activity == '1.725') 
        {ActCalc = this.state.bmr * 1.725;}
        else if(this.state.activity == '1.9') 
        {ActCalc = this.state.bmr * 1.9;}
        this.setState({activity:ActCalc});

    }


    render() {

        let error;
        if(this.state.error)
        {error= <div className='error' >{this.state.error} </div>}
        let result;
        if(this.state.bmr)
        {result = <div className="result">{this.state.bmr}</div>}
        
        let resultAct;
        if(this.state.bmr)
        {resultAct = <div className="result">{this.state.activity}</div>}
            
            
            
               
            if(this.state.flag == true)
        {
            var a = true;

        }
        var b = true;
        if(this.state.system == 2)
        {
            var b=false;
        }

        if(this.state.system == 1)
        {
            var ft = 'ft';
            var inch = 'in';
        }
        
        

        return (
            <div>
                <br/>
                <center>
                <h1><span class="badge text-dark">BMR &amp; Daily Calorie Calculator</span></h1>
                </center>
                <br/>
                <div className="form1" style={{marginLeft:'30%'}}>
                    
                    {error}
                    <br/>
                    <div className="inputwrap1">
                        <label className="label maintop">Gender</label>
                        <label><input type="radio" checked={this.state.gender === '1'} onChange={this.handleGenderChange} className="genderF inputBMR" name="gender" value="1" />Female</label>
                        <label><input type="radio" checked={this.state.gender === '2'} onChange={this.handleGenderChange} className="genderM inputBMR" name="gender" value="2" />Male</label>
                    </div>
                    <div className="inputwrap1">
                        <label className="label maintop">System</label>
                        <label><input type="radio"  checked={this.state.system === '1'} onChange={this.handleSystemChange} className="inputBMR"  name="Imperial" value="1" />Imperial</label>
                        
                        <label><input type="radio"  checked={this.state.system === '2'} onChange={this.handleSystemChange} className="inputBMR"  name="Metric" value="2" />Metric</label>
                        
                    </div>
                    <div className="inputwrap1">
                        <label className="label maintop" >Weight (Pounds/Kg)</label>
                        <input type="number" value={this.state.weight} onChange={this.handleWeightChange} name="weight" className="weight inputBMR" min="0" max="999" />
                    </div>
                    <div className="inputwrap1">
                        <label className="label maintop">Height  (ft|inches /cm)</label>
                        <input type="number"  value={this.state.heightfeet} onChange={this.handleHeightFeetChange} name="heightFeet" className="heightFeet inputBMR" min="0" max="8" />
                        
                       {b && <input type="number" value={this.state.heightinches} onChange={this.handleHeightInchesChange} name="heightInches" className="heightInches inputBMR" min="0" max="11" />} 
                    </div>
                    <div className="inputwrap1">
                        <label className="label maintop">Age</label>
                        <input type="number" value={this.state.age} onChange={this.handleAgeChange} className="age inputBMR" name="age" min="0" max="120" />
                    </div>
                    <button className='button1bmr' type="button" onClick={() => this.calculateBMR()}>Calculate BMR</button>
                    {result}
                    
                    { a == true &&  <div className="workout1"> 
            
            <div className="inputwrap1">
                            <label className="label">Workout in a Week</label>
                            <select className="activity" value={this.state.activity} onChange={this.handleActivityChange} name="activity">
                                <option value="">Select your Activity</option>
                                <option value="1.2">Sedentary (Very little or no exercise, and desk job)</option>
                                <option value="1.375">Lightly Active (Light exercise 1 to 3 days per week)</option>
                                <option value="1.55">Moderately Active (Moderate exercise 3 to 5 days per week)</option>
                                <option value="1.725">Very Active (Heavy exercise 6 to 7 days per week)</option>
                                <option value="1.9">Extremely Active (Very intense exercise, and physical job, exercise multiple times per day)</option>
                            </select>
                        </div>
                        <button  className='button1bmr' type="button" onClick={() => this.calculateAct()}>Calculate Calories</button>
                        {resultAct}
                    </div>}

                   
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

export default BMRcal;