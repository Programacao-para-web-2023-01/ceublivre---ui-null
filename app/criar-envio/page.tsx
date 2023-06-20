"use client";

import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "./style.css";
import { useEffect, useState } from "react";
import { CreatePedido } from "../components/ApiCrude";
import { KeyboardReturn } from "@mui/icons-material";

export default function CriarEnvio() {
  let [cadastro, setCadastro] = useState<any>();
  let [pedido, setPedido] = useState<any>({ expresso_pedido: false });
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
  async function handleSubmit(e: { preventDefault: () => void }) {
    setLoading(true);
    e.preventDefault();
    let cadastroPrev = await CreatePedido(pedido);
    setCadastro(cadastroPrev);
    if (!cadastroPrev.detail) {
      setLoading(false);
      setTimeout(
        () =>
          alert(
            `O pedido "${pedido?.nome_pedido}" foi cadastrado com sucesso!`
          ),
        100
      );
    } else {
      alert(`Ocorreu um erro ao cadastrar o Pedido: ${cadastroPrev.detail}`);
    }
    setLoading(false);
  }
  return (
    <>
      <Navbar />
      <main>
        <h1>Criar envio</h1>
        <Grid display="grid">
          {loading ? (
            <CircularProgress style={{ justifySelf: "center" }} size="5rem" />
          ) : cadastro && !cadastro.detail? (
            <Box display="inline-flex" gap="1rem" justifySelf="center">
              <Typography variant="h5">
                Código de rastreamento: <b>{cadastro?.rastreamento_pedido}</b>
              </Typography>
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
              >
                <KeyboardReturn />
                Voltar
              </Button>
            </Box>
            
          ) : (
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
                    sx={{
                      minWidth: "25%",
                      minHeight: "5rem",
                      fontSize: "1.1rem",
                    }}
                    variant="outlined"
                    color="warning"
                    type="reset"
                    onClick={() => window.location.reload()}
                  >
                    Limpar
                  </Button>
                  <Button
                    sx={{
                      minWidth: "25%",
                      minHeight: "5rem",
                      fontSize: "1.1rem",
                    }}
                    variant="outlined"
                    color="success"
                    type="submit"
                  >
                    Enviar
                  </Button>
                </Box>
              </div>
            </form>
          )}
        </Grid>
      </main>
    </>
  );
}
