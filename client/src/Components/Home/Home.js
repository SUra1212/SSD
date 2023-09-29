import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div>

        <img class="Homepi" src="./SW1.jpg" />

        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div class="btn-group btn-group-lg btnh3" role="group" aria-label="First group">
            <button type="button" class="btn btn-primary"><a href="/login2" style={{ color: 'white'}}>Doctor Channeling - Channel a doctor</a></button>
            <button type="button" class="btn btn-success"><a href="/login1" style={{ color: 'white'}}>Patient Check-in - Full Spectrum Patient Check-in </a></button>
            <button  type="button" class="btn btn-warning"><a href="/login3" style={{ color: 'white'}}>Pharmacy booking - Order your medicine</a></button>
          </div>
        </div>

        <div class="container mt-4"> <div class="row d-flex justify-content-center">
          <div class="col-md-9"> <div class="card p-4 mt-3"> <h3 class="heading mt-5 text-center">Hi! How can we help You?</h3>
            <div class="d-flex justify-content-center px-5"> <div class="search">
              <input type="text" class="search-input" placeholder="Search..." name="" />
              <a href="#" class="search-icon"> <i class="fa fa-search"></i> </a> </div>
            </div> <div class="row mt-4 g-1 px-4 mb-5"> <div class="col-md-2">
              <div class="card-inner p-3 d-flex flex-column align-items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUmBZqQl5869TznWrwV2NY9NeZfg_G1Rmbrg&usqp=CAU" width="50" />
                <div class="text-center mg-text"> <span class="mg-text">Doctors</span> </div> </div>
            </div> <div class="col-md-2"> <div class="card-inner p-3 d-flex flex-column align-items-center">
              <img src="https://i.imgur.com/ueLEPGq.png" width="50" />
              <div class="text-center mg-text"> <span class="mg-text">Payments</span>
              </div> </div> </div> <div class="col-md-2"> <div class="card-inner p-3 d-flex flex-column align-items-center">
                <img src="https://c8.alamy.com/comp/2G4A35Y/pcr-test-nasal-swab-laboratory-analysis-covid-19-coronavirus-testing-vector-illustration-in-flat-cartoon-style-2G4A35Y.jpg" width="65" />
                <div class="text-center mg-text"> <span class="mg-text">PCR</span> </div> </div> </div>
              <div class="col-md-2"> <div class="card-inner p-3 d-flex flex-column align-items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGfA42rfC4eivF1UdZiCG7l7Aelp4dRD_GA&usqp=CAU" width="50" /> <div class="text-center mg-text">
                  <span class="mg-text">Hospitals</span> </div> </div> </div> <div class="col-md-2">
                <div class="card-inner p-3 d-flex flex-column align-items-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrdmwr_qwug1PjuNegiNbI6hXQ-u5LzJTJwQ&usqp=CAU" width="50" />
                  <div class="text-center mg-text"> <span class="mg-text">Lab Test</span>
                  </div> </div> </div> <div class="col-md-2"> <div class="card-inner p-3 d-flex flex-column align-items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGFihsmncoGua3jZvJTuwpDzP3UGbnDqkBLw&usqp=CAU" width="50" />
                    <div class="text-center mg-text"> <span class="mg-text">Blood Test</span>
                    </div> </div> </div> </div> </div> </div> </div> </div>

        <div class="group textline1">
          <div class="item line1"></div>
          <div class="item text1"><h2>CALCULATORS</h2></div>
          <div class="item line1"></div>
        </div>

        <div className='row'>
          <div className='col hp12'>
            <div class="hero-container ">
              <div class="main-container">
                <div class="poster-container">
                  <a href="#"><img src="./BMI.jpg" class="poster" /></a>
                </div>
                <div class="ticket-container">
                  <div class="ticket__content">
                    <h4 class="ticket__movie-title">BMI Calculator</h4>
                    <p class="ticket__movie-slogan">
                    The Body Mass Index (BMI) Calculator can be used to calculate BMI value and corresponding weight status while taking age into consideration. 
                    </p>
                    <button class="ticket__buy-btn"> <a href="/bmical">Claculate</a></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col hp22'>
            <div class="hero-container ">
              <div class="main-container">
                <div class="poster-container">
                  <a href="#"><img src="./BMR.jpg" class="poster" /></a>
                </div>
                <div class="ticket-container">
                  <div class="ticket__content">
                    <h4 class="ticket__movie-title">BMR Calculator</h4>
                    <p class="ticket__movie-slogan">
                    The basal metabolic rate (BMR) is the amount of energy needed while resting in a temperate environment when the digestive system is inactive
                    </p>
                    <button class="ticket__buy-btn"> <a href="/bmrcal">Claculate</a></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          </div>

        <div class="group textline">
          <div class="item line"></div>
          <div class="item text"><h2>QUICK ACCESS</h2></div>
          <div class="item line"></div>
        </div>

        <div className='row' style={{marginBottom:'-5%'}}>
          <div className='col hp1'>
            <div class="hero-container ">
              <div class="main-container">
                <div class="poster-container">
                  <a href="#"><img src="./labtest.jpg" class="poster" /></a>
                </div>
                <div class="ticket-container">
                  <div class="ticket__content">
                    <h4 class="ticket__movie-title">Lab Test</h4>
                    <p class="ticket__movie-slogan">
                      eChanneling now enables you to get all your laboratory tests done from home and have the reports delivered right to your doorstep!
                    </p>
                    <button class="ticket__buy-btn">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col hp2'>
            <div class="hero-container ">
              <div class="main-container">
                <div class="poster-container">
                  <a href="#"><img src="./ordermedicine.jpg" class="poster" /></a>
                </div>
                <div class="ticket-container">
                  <div class="ticket__content">
                    <h4 class="ticket__movie-title">Order Medicine</h4>
                    <p class="ticket__movie-slogan">
                      Select your preferred pharmacy, order your prescription medicine online and have it delivered straight to your home.
                    </p>
                    <button class="ticket__buy-btn">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col hp3'>
            <div class="hero-container ">
              <div class="main-container">
                <div class="poster-container">
                  <a href="#"><img src="./claimrefund.jpg" class="poster" /></a>
                </div>
                <div class="ticket-container">
                  <div class="ticket__content">
                    <h4 class="ticket__movie-title">Claim Refund</h4>
                    <p class="ticket__movie-slogan">
                      Couldn't utilize the service of the professional you channeled? Don't fret, your money will be transferred back to you!
                    </p>
                    <button class="ticket__buy-btn">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col hp4'>
            <div class="hero-container ">
              <div class="main-container">
                <div class="poster-container">
                  <a href="#"><img src="./concierge.jpg" class="poster" /></a>
                </div>
                <div class="ticket-container">
                  <div class="ticket__content">
                    <h4 class="ticket__movie-title">Concierge Service</h4>
                    <p class="ticket__movie-slogan">
                      Give your loved ones the best health care with no waiting time and cashless pay. The concierge provides personalized healthcare at a premium price!
                    </p>
                    <button class="ticket__buy-btn">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>

    );
  }
}
