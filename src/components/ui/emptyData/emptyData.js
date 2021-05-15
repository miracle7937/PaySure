import React from 'react'
import './emptyData.css'
export default function EmptyData(props) {
    return(
        <div className="emptyData-div">
        <div className="emptyData-icon"></div>
        <div className="emptyData-text">
          Oops! No Record Found.
        </div>
        </div>
    )
}