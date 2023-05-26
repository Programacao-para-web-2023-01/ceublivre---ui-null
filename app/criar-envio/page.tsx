"use client";

import Navbar from "../components/Navbar/Navbar";
import "./style.css";

export default function CriarEnvio() {

  return (
    <>
      <Navbar />
      <main>
        <h1>Criar envio</h1>
        <form action={`criar-envio/dados`} method="get">
          <div className="cepOrigem">
            <label htmlFor="cepOrigem">CEP de origem:</label>
            <input id="cepOrigem" name="cepOrigem" type="text" className="text-black"/>
          </div>

          <div className="cepDestino">
            <label htmlFor="cepDestino">CEP de destino:</label>
            <input id="cepDestino" name="cepDestino" type="text" className="text-black"/>
          </div>

          <div className="outros">
            <label htmlFor="valor">Valor do objeto enviado:</label>
            <input id="valor" name="valor" type="number" className="text-black"/>

            <label htmlFor="peso">Peso do objeto enviado:</label>
            <input id="peso" name="peso" type="text" className="text-black"/>

            <label htmlFor="tipoEnvio">Tipo do envio:</label>
            <select name="tipoEnvio" id="tipoEnvio" className="text-black">
              <option value="false">Normal</option>
              <option value="true">Expresso</option>
            </select>
            <button type="submit">Próximo</button>
          </div>
        </form>
      </main>
    </>
  );
}
