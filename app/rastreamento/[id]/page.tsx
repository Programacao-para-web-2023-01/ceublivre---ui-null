"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { Button, Grid, CircularProgress } from "@mui/material";
import { KeyboardReturn } from "@mui/icons-material";

export default function rastreamentoID({ params }: { params: { id: string } }) {
  const token = `root`;
  const url = "http://localhost:8000";
  let [pedido, setPedido] = useState<any>({});
  let [loading, setLoading] = useState(true);
  let valor_pedido =
    pedido?.valor_declarado_pedido + pedido?.valor_envio_pedido;
  let prazo_entrega =
    Math.trunc(
      (Number(new Date(pedido?.datahora_criacao)) - Date.now()) /
        (1000 * 60 * 60 * 24)
    ) + Number(pedido?.prazo_entrega_pedido);

  useEffect(() => {
    fetch(`${url}/pedidos/code/${params.id}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `${token}`,
        "Content-Type": "application/json",
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPedido(data);
        setLoading(false);
      })
      .catch((error) => setPedido(error));
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-between p-24 text-xl">
        {!loading ? (
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
                  <td>
                    {prazo_entrega <= pedido.prazo_entrega_pedido
                      ? 0
                      : prazo_entrega}
                  </td>
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
        ) : (
          <CircularProgress size={70} />
        )}
      </main>
    </>
  );
}
