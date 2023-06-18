"use client";

import Navbar from "./components/Navbar/Navbar";


// import { useEffect, useState } from 'react'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <ul>
          <li>
            <a href="/consulta-pedido">Consulta do pedido</a>
          </li>
        </ul>
      </main>
    </>
  );
}
