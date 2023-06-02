"use client";

import { useEffect, useState } from "react";

export default function rastreamentoID({ params }: { params: { id: string } }) {
  const token = `root`;
  const url = 'http://localhost:8000';
  let [pedido, setPedido] = useState({});
  useEffect(()=>{
    fetch(`${url}/pedidos/code/${params.id}`,{
    method: 'GET',
    headers: new Headers({
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    }),
    credentials:'include'
  }).then(res=>res.json())
  .then(data=>{setPedido(data), console.log(data)})
  .catch(error=>setPedido(error))
  },[])
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>
        {pedido.nome_pedido}  
        </h1>
        <h2>
        {pedido.destino_pedido}
        </h2>
        <h2>
        {pedido.origem_pedido}
        </h2>
      </div>
    </main>
  );
}
