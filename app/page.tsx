"use client";

import Navbar from "./components/Navbar/Navbar";
import fundo_home_transportadora from "./img/fundo_home_transportadora.jpg";

// import { useEffect, useState } from 'react'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <img
          src={
            "https://static.vecteezy.com/ti/vetor-gratis/p3/9951673-ilustracao-de-desenho-animado-de-transporte-por-caminhao-com-servicos-de-entrega-de-carga-ou-caixa-de-papelao-enviada-ao-consumidor-em-design-de-estilo-plano-vetor.jpg"
          }
          alt=""
        />
      </main>
    </>
  );
}
