import React, {Component} from 'react';
import Tablero from './Tablero';

export default class Juego extends Component {
    constructor(props) {
        super(props);
        this.state={
            xIsNext:true,
            stepNumber:0,
            history : [
                {cuadrados: Array(9).fill(null) }

            ]
        }
    }
jumpTo(step){
    this.setState({
        stepNumber:step,
        xIsNext:(step%2) === 0
    })
}

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length-1];
        const cuadrados = current.cuadrados.slice();
        const ganador = calcularGanador(cuadrados);
        if(ganador || cuadrados[i]){
                return;
        }

        cuadrados[i] = this.state.xIsNext?'X':'O';
        this.setState({
            history: history.concat({
                cuadrados:cuadrados
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }

    render() {
        const history= this.state.history;
        const current = history[this.state.stepNumber];
        const ganador = calcularGanador(current.cuadrados);
        const moves = history.map((step,move)=>{
            const desc = move? 'Ir a #' + move:'Empezar el Juego';
            return(
                <li key={move}>
                   <button onClick={()=> {this.jumpTo(move)}}>
                       {desc}
                   </button>     
                </li>  
            )
        });
        let status;
        if(ganador){
            status='El ganador es '+ ganador;
        }else{
            status= 'El proximo jugador es ' +(this.state.xIsNext?'X':'O');
        }

        return(
            <div className="juego">
                <div className="juego-tablero">
                <Tablero
                onClick={(i)=> this.handleClick(i)}
                cuadrados={current.cuadrados}
                />
                </div>
                <div className="juego-info">
                <div>{status}</div>
                <ul>{moves}</ul>
                </div>
            </div>
        )
    }

}

function calcularGanador(cuadrados) {
    const lines= [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for( let i=0; i< lines.length; i++){
        const[a,b,c] = lines(i);
        if(cuadrados[a] && cuadrados[a] === cuadrados[b] && cuadrados[b] === cuadrados[c]){
            return cuadrados[a];
        }
    }


    return null;
}