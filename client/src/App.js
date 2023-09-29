import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import NotFound from "./Components/NotFound/NotFound";
import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authAction1";
import PrivateRoute from "./Components/private-route/PrivateRoute";
import Footer from "./Components/Footer/Footer";
import LoginDashboard from "./Components/Dashboard/LoginDashboard";
import Home from "./Components/Home/Home";

import CreateAppBooking from "./Components/Patient/CreateAppBooking";
import EditAppBooking from "./Components/Patient/EditAppBooking";
import HomeAppBooking from "./Components/Patient/HomeAppBooking";
import CreatePatientCheckin from "./Components/Doctor/CreatePatientCheckin";
import EditPatientCheckin from "./Components/Doctor/EditPatientCheckin";
import HomePatientCheckin from "./Components/Doctor/HomePatientCheckin";
import Login1 from "./Components/Auth/Login1";
import Register2 from "./Components/Auth/Register2";
import Register1 from "./Components/Auth/Register1";
import Login2 from "./Components/Auth/Login2";
import Dashboard2 from "./Components/Dashboard/Dashboard2";
import Dashboard1 from "./Components/Dashboard/Dashboard1";
import DoctorReport from "./Components/Doctor/DoctorReport";
import Navbar1 from "./Components/Navbar/Navbar1";
import BookingReport from "./Components/Patient/BookingReport";
import patientsDetails from "./Components/Doctor/patientsDetails";
import ContactUs from "./Components/ContactUs/ContactUs";
import AboutUs from "./Components/AboutUs/AboutUs";
import Services from "./Components/Services/Services";
import Login3 from "./Components/Auth/Login3";
import Register3 from "./Components/Auth/Register3";
import Dashboard3 from "./Components/Dashboard/Dashboard3";
import CreatePharmacy from "./Components/Pharmacy/CreatePharmacy";
import EditMedicine from "./Components/Pharmacy/EditMedicine";
import HomePharmacy from "./Components/Pharmacy/HomePharmacy";
import BMIcal from "./Components/Calculator/BMIcal";
import PharmacyReport from "./Components/Pharmacy/PharmacyReport";
import BMRcal from "./Components/Calculator/BMRcal";


function App() {
  

    // Check for token to keep user logged in
  if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded)); // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser()); // Redirect to login
      window.location.href = "./login1";
    }
  }

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div style={{ marginTop: "3%" }}>
          <Navbar1 />
        </div>

        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/login1" component={Login1}></Route>
          <Route path="/login2" component={Login2} />
          <Route path="/login3" component={Login3} />
          <Route path="/register1" component={Register1} />
          <Route path="/register2" component={Register2} />
          <Route path="/register3" component={Register3} />
          
         
          <Route path="/loginDash" component={LoginDashboard}></Route>


          <Route path="/CAB" component={CreateAppBooking}></Route>
          <Route path="/UAB/:id" component={EditAppBooking}></Route>
          <Route path="/HAB" component={HomeAppBooking}></Route>
          <Route path="/BR" component={BookingReport}></Route>


          <Route path="/contactus" component={ContactUs}></Route>
          <Route path = "/aboutus" component={AboutUs}></Route>
          <Route path = "/services" component={Services}></Route>
          <Route path = "/bmical" component={BMIcal}></Route>
          <Route path = "/bmrcal" component={BMRcal}></Route>


          <Route path="/CPC" component={CreatePatientCheckin}></Route>
          <Route path="/UPC/:id" component={EditPatientCheckin}></Route>
          <Route path="/HPC" component={HomePatientCheckin}></Route>
          <Route path="/DR" component={DoctorReport}></Route>
          <Route path="/PDS" component={patientsDetails}></Route>

          <Route path="/addMedicine" component={CreatePharmacy}></Route>
          <Route path="/editMedicine/:id" component={EditMedicine}></Route>
          <Route path="/homePharmacy" component={HomePharmacy}></Route>
          <Route path="/pReport" component={PharmacyReport}></Route>


          <Switch>
            <PrivateRoute exact path="/dashboard1" component={Dashboard1} />
            <PrivateRoute exact path="/dashboard2" component={Dashboard2} />
            <PrivateRoute exact path="/dashboard3" component={Dashboard3} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
