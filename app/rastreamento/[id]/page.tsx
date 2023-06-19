"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { Button, Grid, CircularProgress, Box, Typography } from "@mui/material";
import { KeyboardReturn } from "@mui/icons-material";
import { GetPedidoByCode } from "@/app/components/ApiCrude";

export default function rastreamentoID({ params }: { params: { id: string } }) {
  let [pedido, setPedido] = useState<any>({});
  let [loading, setLoading] = useState(true);
  let valor_pedido =
    pedido?.valor_declarado_pedido + pedido?.valor_envio_pedido;
  let prazo_entrega =
    pedido?.prazo_entrega_pedido -
    Math.trunc(
      Number(Date.now()) - Number(new Date(pedido?.datahora_criacao))
    ) /
      (1000 * 60 * 60 * 24);
  async function getPedido() {
    let pesquisa = params.id;
    let resposta = await GetPedidoByCode(pesquisa);
    setPedido(resposta);
    setLoading(false);
  }
  useEffect(() => {
    getPedido();
  }, []);
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between p-24 text-xl">
        {pedido?.id_pedido ? (
          <Grid display="grid">
            <table>
              <thead>
                <tr>
                  <th scope="col">Pedido: {pedido.rastreamento_pedido}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nome:</td>
                  <td>{pedido.nome_pedido}</td>
                </tr>
                <tr>
                  <td>Cep origem:</td>
                  <td>{pedido.cep_origem_pedido}</td>
                </tr>
                <tr>
                  <td>Cep destino:</td>
                  <td>{pedido.cep_destino_pedido}</td>
                </tr>
                <tr>
                  <td>Peso:</td>
                  <td>{pedido?.peso_pedido?.toLocaleString("pt-BR")}(kg)</td>
                </tr>
                <tr>
                  <td>Preço:</td>
                  <td>
                    {valor_pedido?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
                <tr>
                  <td>Prazo de entrega:</td>
                  <td>{prazo_entrega > 0 ? Math.ceil(prazo_entrega) : 0} dia(s)</td>
                </tr>
                <tr>
                  <td>Status do pedido:</td>
                  <td>{pedido.status_pedido}</td>
                </tr>
              </tbody>
            </table>
            <Button
              onClick={() => {
                window.history.back();
              }}
            >
              <KeyboardReturn fontSize="large" />
              Voltar
            </Button>
          </Grid>
        ) : loading ? (
          <CircularProgress size={70} />
        ) : (
          <Box display="inline-flex" gap="1rem">
            <Typography variant="h5">Pedido não encontrado</Typography>
            <Button variant="outlined" onClick={() => window.history.back()}>
              <KeyboardReturn />
              Voltar
            </Button>
          </Box>
        )}
      </main>
    </>
  );
}
