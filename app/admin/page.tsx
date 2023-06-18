"use client";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "./style.css";
import { useEffect, useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SearchIcon from "@mui/icons-material/Search";

export default function Admin() {
  let [pesquisa, setPesquisa] = useState<any>();
  let url = "http://localhost:8000";
  let token = "123";
  let [pedido, setPedido] = useState<any>();
  let [pedidoInputs, setPedidoInputs] = useState<any>();
  let [pedidoSelects, setPedidoSelects] = useState<any>();
  let [loading, setLoading] = useState(false);
  let [pedidoUpdate, setPedidoUpdate] = useState<any>();
  let handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${url}/pedidos/id/${pesquisa}`, {
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
      })
      .catch((error) => setPedido(error));
  };
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
  let handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      (pedidoUpdate.valor_declarado_pedido < 24.5 
        || 
        pedidoUpdate.valor_declarado_pedido > 3000)
    ) {
      alert("Valor aceito do pedido entre R$ 24,50 e R$ 3000,00!");
    } else {
      fetch(`${url}/pedidos/${pedidoUpdate?.id_pedido}`, {
        method: "PUT",
        headers: new Headers({
          Authorization: `${token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(pedidoUpdate),
        credentials: "include",
      })
        .then((data) => {
          alert(
            `O pedido "${pedidoUpdate?.id_pedido}" foi atualizado com sucesso!`
          );
          handleSearch(e);
        })
        .catch((error) => {
          alert("Ocorreu um erro ao atualizar o Pedido.");
        });
    }
  };
  useEffect(() => {
    if (pedido?.id_pedido) {
      setPedidoUpdate(pedido);
      setPedidoInputs(
        Object.keys(pedido)
          .filter((item) => !item.includes("datahora"))
          .filter((item) => !item.includes("id_pedido"))
          .filter((item) => !item.includes("rastreamento"))
          .filter((item) => !item.includes("status"))
          .filter((item) => typeof pedido[item] !== "boolean")
      );
      setPedidoSelects(
        Object.keys(pedido).filter(
          (item) => typeof pedido[item] === "boolean" || item.includes("status")
        )
      );
    }
    setTimeout(() => setLoading(false), 500);
  }, [pedido]);
  useEffect(() => {
    console.log(pedidoUpdate);
  }, [pedidoUpdate]);
  return (
    <>
      <Navbar />
      <Grid display="grid" justifyContent="center" alignItems="center">
        <Typography textAlign="center" variant="h3" paddingY="2rem">
          Editar pedido
        </Typography>
        {!pedido ? (
          <form
            onSubmit={handleSearch}
            style={{
              display: "inline-flex",
              gap: "1rem",
            }}
          >
            <div style={{ display: "grid" }}>
              <label htmlFor="IdPedido">id do pedido:</label>
              <div>
                <input
                  onChange={(e) => setPesquisa(e.target.value)}
                  id="IdPedido"
                  type="text"
                />
              </div>
            </div>
            <div style={{ display: "grid", alignItems: "end" }}>
              <Button variant="outlined" type="submit">
                <SearchIcon />
                Buscar
              </Button>
            </div>
          </form>
        ) : loading ? (
          <CircularProgress style={{ justifySelf: "center" }} size="5rem" />
        ) : !pedido.id_pedido ? (
          <Box display="inline-flex" gap="1rem">
            <Typography variant="h5">Pedido não encontrado</Typography>
            <Button variant="outlined" onClick={() => window.location.reload()}>
              <KeyboardReturnIcon />
              Voltar
            </Button>
          </Box>
        ) : (
          <Grid>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Pedido: {pedido?.id_pedido}
            </Typography>
            <form
              style={{ display: "grid" }}
              onSubmit={handleSubmit}
              method="get"
            >
              <Grid
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                gap="2rem"
              >
                {pedidoInputs?.map((item: any) => (
                  <div style={{ display: "grid" }}>
                    <label htmlFor={item}>
                      {item
                        .replaceAll("_", " ")
                        .replaceAll(" pedido", "")
                        .replace("prazo entrega", "prazo para entrega (dias)")
                        .replace("peso", "peso (kg)")
                        .replace("valor declarado", "valor declarado (R$)")
                        .replace("valor envio", "valor envio (R$)")
                        .replace("expresso", "entrega expressa")
                        .replace("tem ", "")}
                    </label>
                    {typeof pedido[item] !== "number" ? (
                      <input
                        id={item}
                        type="text"
                        value={pedidoUpdate[item]}
                        onChange={(e) =>
                          setPedidoUpdate((data: any) => ({
                            ...data,
                            [item]: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <input
                        id={item}
                        type="number"
                        value={pedidoUpdate[item]}
                        onChange={(e) =>
                          setPedidoUpdate((data: any) => ({
                            ...data,
                            [item]: Number(e.target.value),
                          }))
                        }
                      />
                    )}
                  </div>
                ))}
                {pedidoSelects?.map((item: any) => (
                  <div style={{ display: "grid" }}>
                    <label htmlFor={item}>
                      {item.replaceAll("_", " ").replaceAll(" pedido", "")}
                    </label>
                    {typeof pedido[item] === "boolean" ? (
                      <select
                        id={item}
                        value={pedidoUpdate[item]}
                        onChange={(e) => handleChange(e, [item])}
                      >
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    ) : (
                      <select
                        id={item}
                        value={pedidoUpdate[item]}
                        onChange={(e) =>
                          setPedidoUpdate((data: any) => ({
                            ...data,
                            [item]: e.target.value,
                          }))
                        }
                      >
                        <option value="Em andamento">Em andamento</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Separado para envio">
                          Separado para envio
                        </option>
                      </select>
                    )}
                  </div>
                ))}
              </Grid>
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
                  onClick={() => window.location.reload()}
                >
                  Cancelar
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
            </form>
          </Grid>
        )}
      </Grid>
    </>
  );
}
