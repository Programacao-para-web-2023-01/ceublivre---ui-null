"use client";
import Navbar from "../components/Navbar/Navbar";
import "./style.css";


export default function Admin(){
    return(
        <>
        <Navbar/>
        <main>
        <h1>
            Atualizar status do pedido
        </h1>
        <form method="get">
        <div className="rastreamento-pedido">
                <label htmlFor="rastreamentopedido">Rastreamento do pedido:</label>
                <input id="rastreamentopedido" name="rastreamentopedido" type="text" className="text-black"/>
            </div>
            <div className="status-pedido">
                <label htmlFor="statuspedido">Status do pedido:</label>
                <input id="statuspedido" name="statuspedido" type="text" className="text-black"/>
            </div>
        </form>
        </main>
        </>
    )
}