import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

export default function UpdateForm(props: any){
    return(
        <Grid>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Pedido: {props.pedido?.id_pedido}
            </Typography>
            <form
              style={{ display: "grid" }}
              onSubmit={props.handleSubmit}
              method="get"
            >
              <Grid
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                gap="2rem"
              >
                {props.pedidoInputs?.map((item: any) => (
                  <div style={{ display: "grid" }}>
                    <label htmlFor={item}>
                      {item
                        .replaceAll("_", " ")
                        .replaceAll(" pedido", "")
                        .replace("peso", "peso (kg)")
                        .replace("valor declarado", "valor declarado (R$)")
                        .replace("expresso", "entrega expressa")}
                    </label>
                    {typeof props.pedido[item] !== "number" ? (
                      <input
                      required
                        id={item}
                        type="text"
                        value={props.pedidoUpdate[item]}
                        onChange={(e) =>
                          props.setPedidoUpdate((data: any) => ({
                            ...data,
                            [item]: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <input
                      required
                        id={item}
                        type="number"
                        min="0"
                        step="0.01"
                        value={props.pedidoUpdate[item]}
                        onChange={(e) =>
                          props.setPedidoUpdate((data: any) => ({
                            ...data,
                            [item]: Number(e.target.value),
                          }))
                        }
                      />
                    )}
                  </div>
                ))}
                {props.pedidoSelects?.map((item: any) => (
                  <div style={{ display: "grid" }}>
                    <label htmlFor={item}>
                      {item.replaceAll("_", " ").replaceAll(" pedido", "")}
                    </label>
                    {typeof props.pedido[item] === "boolean" ? (
                      <select
                        id={item}
                        value={props.pedidoUpdate[item]}
                        onChange={(e) => props.handleChange(e, [item])}
                      >
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    ) : (
                      <select
                        id={item}
                        value={props.pedidoUpdate[item]}
                        onChange={(e) =>
                          props.setPedidoUpdate((data: any) => ({
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
                {props.pedidoDisabled?.map((item: any) => (
                  <div style={{ display: "grid" }}>
                    <label htmlFor={item}>
                      {item
                        .replaceAll("_", " ")
                        .replaceAll(" pedido", "")
                        .replace("valor envio", "valor envio (R$)")
                        .replace("rastreamento", "código de rastreamento")}
                    </label>
                    <input
                      disabled
                      id={item}
                      value={props.pedidoUpdate[item].toLocaleString()}
                    />
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
    )
}
