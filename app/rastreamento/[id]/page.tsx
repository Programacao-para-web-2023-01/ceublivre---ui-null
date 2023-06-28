"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { Button, Grid, CircularProgress, Box, Typography, TableBody, TableRow, TableCell } from "@mui/material";
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
              <thead style={{fontSize:'1.5rem'}}>
                <tr>
                  <th scope="col">Pedido: {pedido.rastreamento_pedido}</th>
                </tr>
              </thead>
              <TableBody>
                <TableRow>
                  <TableCell>id:</TableCell>
                  <TableCell>{pedido.id_pedido}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nome:</TableCell>
                  <TableCell>{pedido.nome_pedido}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cep origem:</TableCell>
                  <TableCell>{pedido.cep_origem_pedido}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cep destino:</TableCell>
                  <TableCell>{pedido.cep_destino_pedido}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Peso:</TableCell>
                  <TableCell>{pedido?.peso_pedido?.toLocaleString("pt-BR")}(kg)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Preço:</TableCell>
                  <TableCell>
                    {valor_pedido?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Prazo de entrega:</TableCell>
                  <TableCell>{prazo_entrega > 0 ? Math.ceil(prazo_entrega) : 0} dia(s)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status do pedido:</TableCell>
                  <TableCell>{pedido.status_pedido}</TableCell>
                </TableRow>
              </TableBody>
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
