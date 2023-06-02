"use client";

import { useEffect, useState } from "react";

export default function rastreamentoID({ params }: { params: { id: string } }) {
  const token = `root`;
  const url = 'http://localhost:8000';
  let [pedido, setPedido] = useState({});
  let data_type = Object.keys(pedido);
  let data_values = Object.values(pedido);

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
  console.log(data_type)  
  console.log(data_values)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <table>
        <td>
        {data_type.map((item)=><tr>{item}</tr>)}
        </td>
        <td>
        {data_values.map((item)=><tr>{`${item}`}</tr>)}
        </td>
      </table>
    </main>
  );
}
