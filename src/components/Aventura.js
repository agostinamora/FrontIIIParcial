import React from "react";
import data from "./data";
import OpcionesAB from "./OpcionesAB";
import Historial from "./Historial";

export default class Aventura extends React.Component {
    historia = [];
    quantityOptions = 2;
    historiaCompleta = ( data.length - 1 ) / this.quantityOptions;

    constructor(props) {
        super(props);
        let newJson = [];
        for (let i = 0; i < data.length; i++) {
            let current = data[i];
            newJson[current.id] = current;
        }
        this.historia = newJson;
        this.state = {
            contador : 0,
            historial : [],
            seleccionPrevia : "",
            opcionActual : "1",
            
        }
    }

handleClick = (e) => {
    const opcion = e.target.id;
    let counter = this.state.contador;
    counter++;
    let currentOption = (counter + 1).toString() + opcion.toLowerCase();

    if (this.state.contador >= this.historiaCompleta) {
        alert("Ya no hay más historia");
    } else {
        this.setState({
            contador : counter, seleccionPrevia : opcion, opcionActual : currentOption
        });
    }
}

componentDidUpdate(prevProps, prevState) {
    if (prevState.contador !== this.state.contador) {
        this.setState({
            historial : [...this.state.historial, this.state.seleccionPrevia]
        });
    } 
};


    render() {
        let History = this.historia;
    return (
        <div className = "layout">
            <h1 className = "historia">{History[this.state.opcionActual].historia}</h1>
            <OpcionesAB handleClick={this.handleClick} opcionA = {History[this.state.opcionActual].opciones.a} opcionB = {History[this.state.opcionActual].opciones.b}> </OpcionesAB>
            <Historial
                seleccionPrevia={this.state.seleccionPrevia}
                historial={this.state.historial.map(
                    (e, index) => (
                    <li key={index}>{e}</li>
                    ),
                data[this.state.contador].id
                )}
            />
        </div> 
        );
    }
}
