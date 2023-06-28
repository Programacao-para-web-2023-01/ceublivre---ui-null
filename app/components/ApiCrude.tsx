import { GetServerSideProps, GetStaticProps } from "next";
import React, { useState } from "react";

let url = "http://localhost:8000";
let token = "123";

export async function GetPedidoById(pesquisa: string) {
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

export async function UpdatePedido(pedidoUpdate: Object, id_pedido: string){
  let resposta = await fetch(`${url}/pedidos/${id_pedido}`, {
    method: "PUT",
    headers: new Headers({
      Authorization: `${token}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(pedidoUpdate),
    credentials: "include",
  })
  return resposta.json()
}

export async function GetTransportadoraById(pesquisa: string) {
  let transportadora = fetch(`${url}/transportadora/${pesquisa}`, {
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
  return transportadora;
}

export async function GetAllTransportadoras (){
  let transportadora = await fetch(`${url}/transportadora`, {
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
  return transportadora;
}
