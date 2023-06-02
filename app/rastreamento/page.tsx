"use client";

import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import "./style.css";

export default function Rastreamento() {
  const [rast, setRast] = useState("");
  return (
    <>
      <Navbar />
      <main>
        <form action={`rastreamento/${rast}`} method="get">
          <label htmlFor="inRastreamento">
            Digite o código de rastreamento:
          </label>
          <input
            value={rast}
            onChange={(e) => setRast(e.target.value)}
            className="text-black"
            type="text"
            id="inRastreamento"
          />
          <button type="submit">Buscar</button>
        </form>
      </main>
    </>
  );
}
