"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import {
  Button,
  Grid,
  CircularProgress,
  Box,
  Typography,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableHead,
} from "@mui/material";
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
            <Typography fontSize="1.5rem" fontWeight="bold">
              Pedido: {pedido.rastreamento_pedido}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Cep origem</TableCell>
                  <TableCell>Cep destino</TableCell>
                  <TableCell>Peso</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>Prazo de entrega</TableCell>
                  <TableCell>Status do pedido</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{pedido.id_pedido}</TableCell>
                  <TableCell>{pedido.nome_pedido}</TableCell>
                  <TableCell>{pedido.cep_origem_pedido}</TableCell>
                  <TableCell>{pedido.cep_destino_pedido}</TableCell>
                  <TableCell>
                    {pedido?.peso_pedido?.toLocaleString("pt-BR")}(kg)
                  </TableCell>
                  <TableCell>
                    {valor_pedido?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell>
                    {prazo_entrega > 0 ? Math.ceil(prazo_entrega) : 0} dia(s)
                  </TableCell>
                  <TableCell>{pedido.status_pedido}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button
              sx={{ width: "max-content", justifySelf: 'center' }}
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
            <Button
              sx={{ width: "max-content" }}
              variant="outlined"
              onClick={() => window.history.back()}
            >
              <KeyboardReturn />
              Voltar
            </Button>
          </Box>
        )}
      </main>
    </>
  );
}
