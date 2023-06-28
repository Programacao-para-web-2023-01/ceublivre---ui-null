import { Box, Button } from "@mui/material";
import React from "react";



export default function CreateForm(props: any){
    return(
        <form onSubmit={props.handleSubmit} method="post">
              <div className="nome">
                <label htmlFor="nome">Nome:</label>
                <input
                  onChange={(e) => {
                    props.setPedido((data: any) => ({
                      ...data,
                      nome_pedido: e.target.value,
                    }));
                  }}
                  value={props.pedido?.nome_pedido}
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
                    props.setPedido((data: any) => ({
                      ...data,
                      cep_origem_pedido: e.target.value,
                    }));
                  }}
                  value={props.pedido?.cep_origem_pedido}
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
                    props.setPedido((data: any) => ({
                      ...data,
                      cep_destino_pedido: e.target.value,
                    }));
                  }}
                  value={props.pedido?.cep_destino_pedido}
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
                    props.setPedido((data: any) => ({
                      ...data,
                      valor_declarado_pedido: Number(e.target.value),
                    }));
                  }}
                  value={props.pedido?.valor_declarado_pedido}
                  id="valor"
                  name="valor"
                  type="number"
                  className="text-black"
                />

                <label htmlFor="peso">Peso do objeto enviado (kg):</label>
                <input
                  onChange={(e) => {
                    props.setPedido((data: any) => ({
                      ...data,
                      peso_pedido: Number(e.target.value),
                    }));
                  }}
                  value={props.pedido?.peso_pedido}
                  id="peso"
                  name="peso"
                  type="number"
                  className="text-black"
                />

                <label htmlFor="tipoEnvio">Tipo do envio:</label>
                <select
                  onChange={(e) => {
                    props.handleChange(e, "expresso_pedido");
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
    )
}