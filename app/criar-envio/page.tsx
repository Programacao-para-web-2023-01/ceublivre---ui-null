"use client";

import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "./style.css";
import { useEffect, useState } from "react";
import { CreatePedido } from "../components/ApiCrude";
import { KeyboardReturn } from "@mui/icons-material";
import CreateForm from "./components/CreateForm";

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
  async function handleSubmit(e: any) {
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
      alert(`Ocorreu um erro ao cadastrar o Pedido: ${cadastroPrev.detail[0]?.msg ||cadastroPrev.detail}`);
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
            <CreateForm 
            handleChange={handleChange}
            setPedido={setPedido}
            pedido={pedido}
            handleSubmit={handleSubmit}
            />
          )}
        </Grid>
      </main>
    </>
  );
}
