
import React, { Component } from 'react'
import Leftbar from '../components/leftbar/leftbar'
import Rightbar from '../components/rightbar/rightbar'
import Topbar from '../components/topbar/topbar'
import Overview from './overview/overview'
import Products from './paysure-products/paysure-products'

class Dashboard extends Component {

    render(){
        return(
            <div className="app-admin-section">
            <div className="app-admin-col-1">
            <Leftbar/>
            </div>
            <div className="app-admin-col-2">
            <Topbar/>
            <div className="content-header">Hii there! Bola</div>
              <div className="content-sub">Here are the latest report on Paysure Digital</div>
              <div data-animation="slide" data-duration="500" data-infinite="1" className="content-slider w-slider">
                <div className="mask w-slider-mask">
                  <div className="content-slide w-slide">
                    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Total Revenue</div>
                          <div className="slide-card-value">N200,000</div>
                        </div>
                        <div className="slide-card-icon green"></div>
                      </div>
                    </div>
                  </div>
                  <div className="content-slide w-slide">
                    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Products</div>
                          <div className="slide-card-value">N200,000</div>
                        </div>
                        <div className="slide-card-icon purple"></div>
                      </div>
                    </div>
                  </div>
                  <div className="content-slide w-slide">
                    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Users</div>
                          <div className="slide-card-value">N200,000</div>
                        </div>
                        <div className="slide-card-icon blue"></div>
                      </div>
                    </div>
                  </div>
                  <div className="content-slide w-slide">
                    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Transactions</div>
                          <div className="slide-card-value">N200,000</div>
                        </div>
                        <div className="slide-card-icon yellow"></div>
                      </div>
                    </div>
                  </div>
                  <div className="content-slide w-slide">
                    <div className="content-slide-box">
                      <div className="content-info-card">
                        <div className="div-block-2">
                          <div className="slide-card-header">Services</div>
                          <div className="slide-card-value">N200,000</div>
                        </div>
                        <div className="slide-card-icon red"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-slider-left-arrow w-slider-arrow-left">
                  <div className="w-icon-slider-left"></div>
                </div>
                <div className="content-slider-right-arrow w-slider-arrow-right">
                  <div className="w-icon-slider-right"></div>
                </div>
                <div className="slide-nav w-slider-nav w-slider-nav-invert w-round"></div>
              </div>
              <div className="basic-table-card">
                <div className="content-header-2">Business Revenue</div>
                <div className="analytics-div">
                  <div className="analytics-graph"></div>
                  <div className="analytics-graph-2">
                    <div className="content-header-3">Monthly Target</div>
                    <div className="content-sub-2">Average Total Sales</div>
                  </div>
                </div>
              </div>
              <div className="basic-table-card">
                <div className="content-header-2">Users</div>
              </div>
            </div>
            <div className="app-admin-col-3">
              <Rightbar />
            </div>
          </div>

        )
    }
}

export default Dashboard