"use client";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "./style.css";
import { useEffect, useState } from "react";
import { KeyboardReturn } from "@mui/icons-material";
import { GetPedidoById } from "../components/ApiCrude";
import { UpdatePedido } from "../components/ApiCrude";
import SearchPedido from "./components/SearchPedido";
import UpdateForm from "./components/UpdateForm";

export default function Admin() {
  let [pesquisa, setPesquisa] = useState<any>();
  let [pedido, setPedido] = useState<any>();
  let [pedidoInputs, setPedidoInputs] = useState<any>();
  let [pedidoSelects, setPedidoSelects] = useState<any>();
  let [pedidoDisabled, setPedidoDisabled] = useState<any>();
  let [loading, setLoading] = useState(false);
  let [pedidoUpdate, setPedidoUpdate] = useState<any>();
  async function handleSearch(e: any) {
    e.preventDefault();
    setLoading(true);
    let resposta = await GetPedidoById(pesquisa);
    setPedido(resposta);
  }
  let handleChange = (e: any, item: any) => {
    if (e.target.value === "true") {
      setPedidoUpdate((data: any) => ({
        ...data,
        [item]: true,
      }));
    } else {
      setPedidoUpdate((data: any) => ({
        ...data,
        [item]: false,
      }));
    }
  };
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
      let resposta = await UpdatePedido(pedidoUpdate, pedidoUpdate.id_pedido);
      if (!resposta.detail) {
        alert(
          `O pedido "${pedidoUpdate?.id_pedido}" foi atualizado com sucesso!`
        );
      } else {
        alert(`Ocorreu um erro ao atualizar o Pedido: ${resposta.detail[0]?.msg || resposta.detail}`);
        setLoading(false);
    }
    handleSearch(e);
  }
  useEffect(() => {
    if (pedido?.id_pedido) {
      setPedidoUpdate(pedido);
      setPedidoInputs(
        Object.keys(pedido)
          .filter((item) => !item.includes("datahora"))
          .filter((item) => !item.includes("id_pedido"))
          .filter((item) => !item.includes("rastreamento"))
          .filter((item) => !item.includes("status"))
          .filter((item) => !item.includes("prazo"))
          .filter((item) => !item.includes("envio"))
          .filter((item) => typeof pedido[item] !== "boolean")
      );
      setPedidoSelects(
        Object.keys(pedido)
          .filter(
            (item) => item.includes("status")
          )
          .filter((item) => !item.includes("tem_entrega"))
      );
      setPedidoDisabled(
        Object.keys(pedido).filter(
          (item) =>
            item.includes("envio") ||
            item.includes("prazo_entrega") ||
            item.includes("rastreamento") ||
            typeof pedido[item] === 'boolean'
        )
      );
    }
    setTimeout(() => setLoading(false), 500);
  }, [pedido]);
  return (
    <>
      <Navbar />
      <Grid display="grid" justifyContent="center" alignItems="center">
        <Typography textAlign="center" variant="h3" paddingY="2rem">
          Editar pedido
        </Typography>
        {!pedido ? (
          <SearchPedido 
          handleSearch={handleSearch}
          setPesquisa={setPesquisa}
          />
        ) : loading ? (
          <CircularProgress style={{ justifySelf: "center" }} size="5rem" />
        ) : !pedido.id_pedido ? (
          <Box display="inline-flex" gap="1rem">
            <Typography variant="h5">Pedido não encontrado</Typography>
            <Button variant="outlined" onClick={() => window.location.reload()}>
              <KeyboardReturn />
              Voltar
            </Button>
          </Box>
        ) : (
          <UpdateForm
            pedido={pedido}
            pedidoInputs={pedidoInputs}
            pedidoSelects={pedidoSelects}
            pedidoDisabled={pedidoDisabled}
            pedidoUpdate={pedidoUpdate}
            setPedidoUpdate={setPedidoUpdate}
            setPedidoInputs={setPedidoInputs}
            setPedidoSelects={setPedidoSelects}
            setPedidoDisabled={setPedidoDisabled}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Grid>
    </>
  );
}
