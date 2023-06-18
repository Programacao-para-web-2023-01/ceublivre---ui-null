"use client";

import { Box, Button, CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "./style.css";
import { useState } from "react";

export default function CriarEnvio() {
  let url = "http://localhost:8000";
  let token = "123";
  let [pedido, setPedido] = useState<any>();
  let [loading, setLoading] = useState(false);
  let handleChange = (e: any, item: any) => {
    if (e.target.value === "true") {
      setPedido((data: any) => ({
        ...data,
        [item]: true,
      }));
    } else {
      setPedido((data: any) => ({
        ...data,
        [item]: false,
      }));
    }
  };
  let handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      pedido.valor_declarado_pedido < 24.5 ||
      pedido.valor_declarado_pedido > 3000
    ) {
      alert("Valor aceito do pedido entre R$ 24,50 e R$ 3000,00!");
    } else {
      fetch(`${url}/pedidos/create`, {
        method: "POST",
        headers: new Headers({
          Authorization: `${token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(pedido),
        credentials: "include",
      })
        .then((data) => {
          console.log(data);
          alert(
            `O pedido "${pedido?.nome_pedido}" foi cadastrado com sucesso!`
          );
          setLoading(true);
        })
        .then(() => {
          setTimeout(() => {
            setLoading(false), 500;
          });
        })
        .catch((error) => {
          alert("Ocorreu um erro ao cadastrar o Pedido.");
        });
    }
  };
  return (
    <>
      <Navbar />
      <main>
        <h1>Criar envio</h1>
        {!loading ? (
          <form onSubmit={handleSubmit} method="post">
            <div className="nome">
              <label htmlFor="nome">Nome:</label>
              <input
                onChange={(e) => {
                  setPedido((data: any) => ({
                    ...data,
                    nome_pedido: e.target.value,
                  }));
                }}
                value={pedido?.nome_pedido}
                id="nome"
                name="nome"
                type="text"
                className="text-black"
              />
            </div>
            <div className="cepOrigem">
              <label htmlFor="cepOrigem">CEP de origem:</label>
              <input
                onChange={(e) => {
                  setPedido((data: any) => ({
                    ...data,
                    cep_origem_pedido: e.target.value,
                  }));
                }}
                value={pedido?.cep_origem_pedido}
                id="cepOrigem"
                name="cepOrigem"
                type="text"
                className="text-black"
              />
            </div>
            <div className="cepDestino">
              <label htmlFor="cepDestino">CEP de destino:</label>
              <input
                onChange={(e) => {
                  setPedido((data: any) => ({
                    ...data,
                    cep_destino_pedido: e.target.value,
                  }));
                }}
                value={pedido?.cep_destino_pedido}
                id="cepDestino"
                name="cepDestino"
                type="text"
                className="text-black"
              />
            </div>

            <div className="outros">
              <label htmlFor="valor">Valor do objeto enviado (R$):</label>
              <input
                onChange={(e) => {
                  setPedido((data: any) => ({
                    ...data,
                    valor_declarado_pedido: Number(e.target.value),
                  }));
                }}
                value={pedido?.valor_declarado_pedido}
                id="valor"
                name="valor"
                type="number"
                className="text-black"
              />

              <label htmlFor="peso">Peso do objeto enviado (kg):</label>
              <input
                onChange={(e) => {
                  setPedido((data: any) => ({
                    ...data,
                    peso_pedido: Number(e.target.value),
                  }));
                }}
                value={pedido?.peso_pedido}
                id="peso"
                name="peso"
                type="number"
                className="text-black"
              />

              <label htmlFor="tipoEnvio">Tipo do envio:</label>
              <select
                onChange={(e) => {
                  handleChange(e, "expresso_pedido");
                }}
                name="tipoEnvio"
                id="tipoEnvio"
                className="text-black"
              >
                <option value="false">Normal</option>
                <option value="true">Expresso</option>
              </select>
              <Box
                minWidth="50%"
                justifyContent="space-around"
                display="inline-flex"
                justifySelf="center"
                padding="2rem"
              >
                <Button
                  sx={{ minWidth: "25%", minHeight: "5rem" }}
                  variant="outlined"
                  color="warning"
                  type="reset"
                  onClick={() => window.location.reload()}
                >
                  Limpar
                </Button>
                <Button
                  sx={{ minWidth: "25%", minHeight: "5rem" }}
                  variant="outlined"
                  color="success"
                  type="submit"
                >
                  Enviar
                </Button>
              </Box>
            </div>
          </form>
        ) : (
          <CircularProgress />
        )}
      </main>
    </>
  );
}
