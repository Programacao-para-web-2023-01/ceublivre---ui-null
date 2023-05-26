"use client";

import "./style.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/rastreamento">Rastreamento</a>
        </li>
        <li>
          <a href="/contact">Transportadoras</a>
        </li>
        <li>
          <a href="/criar-envio">Envio</a>
        </li>
      </ul>
    </nav>
  );
}
