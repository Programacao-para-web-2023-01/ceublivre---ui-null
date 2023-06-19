import React, { useState } from "react";

export async function GetPedidoById(pesquisa: string) {
  let url = "http://localhost:8000";
  let token = "123";
  let pedido = fetch(`${url}/pedidos/id/${pesquisa}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `${token}`,
      "Content-Type": "application/json",
    }),
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
  return pedido;
}

export async function GetPedidoByCode(pesquisa: string) {
  let url = "http://localhost:8000";
  let token = "123";
  let pedido = fetch(`${url}/pedidos/code/${pesquisa}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `${token}`,
      "Content-Type": "application/json",
    }),
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
  return pedido;
}

export async function CreatePedido(pedido: Object){
  let url = "http://localhost:8000";
  let token = "123";
  let resposta = await
  fetch(`${url}/pedidos/create`, {
    method: "POST",
    headers: new Headers({
      Authorization: `${token}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(pedido),
    credentials: "include",
  })
  return resposta.json()
}
