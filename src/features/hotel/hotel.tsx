import React from "react";

const Hotel = () => {
    const icon = require('../../assets/icons/hotel.svg').default
    console.log(icon)
    return (
        <div>
            <p>Hotel </p>
            <img src={icon} style={{color: 'green'}}  />
        </div>
    )

}

export default Hotel;