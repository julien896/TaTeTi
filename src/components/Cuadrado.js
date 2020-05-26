import React from 'react'


const Cuadrado = (props) => {
    return ( 
        <button className="cuadrado" onClick={props.onClick}>
            {props.value}
        </button>
     );
}
 
export default Cuadrado;