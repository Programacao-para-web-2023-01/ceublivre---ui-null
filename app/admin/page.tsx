"use client";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import "./style.css";
import { useEffect, useState } from "react";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';



export default function Admin(){
    let [pesquisa, setPesquisa] = useState<any>(); 
    let url = 'http://localhost:8000';
    let token = '123';
    let [pedido, setPedido] = useState<any>();
    let [pedidoInputs, setPedidoInputs]= useState<any>();
    let [pedidoSelects, setPedidoSelects]= useState<any>();
    let [loading, setLoading] = useState(false);
    let [pedidoUpdate, setPedidoUpdate] = useState<any>();
    let handleSearch =(e: { preventDefault: () => void; })=>{
        e.preventDefault();
        setLoading(true);
        fetch(`${url}/pedidos/id/${pesquisa}`,{
            method: 'GET',
            headers: new Headers({
              'Authorization': `${token}`,
              'Content-Type': 'application/json'
            }),
            credentials:'include'
          }).then(res=>res.json())
          .then(data=>{setPedido(data), console.log(data)})
          .catch(error=>setPedido(error));
    }
    let handleSubmit =(e: { preventDefault: () => void; })=>{
        setTimeout(()=>alert('Pedido atualizado com sucesso!'),300);
    }
    useEffect(()=>{
        if(pedido?.id_pedido){
            setPedidoUpdate(pedido);
            setPedidoInputs(Object.keys(pedido)
            .filter(item=> !item.includes('datahora'))
            .filter(item=> !item.includes('id_pedido'))
            .filter(item=> !item.includes('rastreamento'))
            );
            setPedidoSelects(Object.keys(pedido)
            .filter(item=> typeof pedido[item] === "boolean"
            || item.includes('status')
            )
            );
        }
        setTimeout(()=>setLoading(false),500);
    },[pedido])
    useEffect(()=>{
        console.log(pedidoUpdate)
    },[pedidoUpdate])
    return(
        <>
            <Navbar/>
            <Grid display='grid' justifyContent='center' alignItems='center'>
                <Typography variant="h3" paddingY='2rem'>
                    Atualizar status do pedido
                </Typography>
                    { !pedido?
                    <form onSubmit={handleSearch} 
                    style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem'}}>
                        <div style={{display:'grid'}}>
                            <label htmlFor="IdPedido">Id do pedido:</label>
                            <input onChange={(e)=>setPesquisa(e.target.value)} id="IdPedido" type="text"/>
                        </div>
                        <div style={{display:'grid', alignItems:'end'}}>
                            <Button type="submit"
                            style={{height:'2rem'}}>
                                Buscar
                            </Button>
                        </div>
                    </form>
                    :loading ?
                    <CircularProgress style={{justifySelf:'center'}} size='5rem'/>
                    :!pedido.id_pedido?
                    <Box display='grid' gridTemplateColumns='1fr 1fr'>
                        <Typography variant="h5">
                            Pedido não encontrado
                        </Typography>
                        <Button onClick={()=>window.location.reload()}><KeyboardReturnIcon/>Voltar</Button>
                    </Box>:
                    <Grid>
                        <Typography variant="h5" sx={{fontWeight:'bold'}}>
                            Pedido: {pedido?.id_pedido}
                        </Typography>
                        <form onSubmit={handleSubmit} method="get">
                            <Grid display='grid' gridTemplateColumns='1fr 1fr 1fr 1fr' gap='2rem'>
                            {pedidoInputs?.map((item: any)=>
                            <div style={{display:'grid'}}>
                                <label htmlFor={item}>{item
                                .replaceAll('_', ' ').replaceAll(' pedido', '')
                                .replace('prazo entrega', 'prazo para entrega (dias)')
                                .replace('peso', 'peso (kg)')
                                .replace('valor declarado', 'valor declarado (R$)')
                                .replace('valor envio', 'valor envio (R$)')
                                .replace('expresso', 'entrega expressa')
                                .replace('tem ', '')
                            }
                                </label>
                                {(typeof pedido[item]) !== 'number'?
                                <input id={item} type='text' value={pedidoUpdate[item]}
                                onChange={(e)=>setPedidoUpdate((data: any)=>({...data, [item]: e.target.value}))}/>:
                                <input id={item} type='number' value={pedidoUpdate[item]}
                                onChange={(e)=>setPedidoUpdate((data: any)=>({...data, [item]: Number(e.target.value)}))}/>
                            }
                            </div>
                            )
                            }
                            {pedidoSelects?.map((item: any)=>
                            <div style={{display:'grid'}}>
                                <label htmlFor={item}>{item
                                .replaceAll('_', ' ').replaceAll(' pedido', '')}
                                </label>
                                {typeof pedido[item] === 'boolean'?
                                <select id={item} value={pedidoUpdate[item]}
                                onChange={(e)=>setPedidoUpdate((data: any)=>({...data, [item]: Boolean(e.target.value)}))}>
                                    <option value="true" selected={pedidoUpdate[item]}>true</option>
                                    <option value="false" selected={pedidoUpdate[item]}>false</option>
                                </select>:
                                <select id={item} value={pedidoUpdate[item]}
                                onChange={(e)=>setPedidoUpdate((data: any)=>({...data, [item]: Boolean(e.target.value)}))}>
                                    <option value="Em andamento" selected={pedidoUpdate[item]}>Em andamento</option>
                                    <option value="Enviado" selected={pedidoUpdate[item]}>Enviado</option>
                                </select>
                                }
                            </div>
                            )
                            }
                            </Grid>
                            <div style={{display:'grid', alignItems:'end', padding:'2rem'}}>
                                <Button type="submit"
                                style={{height:'2rem'}}>
                                    Atualizar
                                </Button>
                            </div>
                        </form>
                    </Grid>
                    }
            </Grid>
        </>
    )
}