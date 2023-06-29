"use client";

import React, { useEffect, useState } from "react";
import {
  CreateTransportadora,
  DeleteTransportadoraById,
  GetAllTransportadoras,
} from "../components/ApiCrude";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import TranspList from "./components/TranspList";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AddTranspForm from "./components/AddTranspForm";
import "./style.css";
import "./style.css";
import { Add, Remove } from "@mui/icons-material";

export default function Transportadora() {
  let [loading, setLoading] = useState(true);
  let [transportadoras, setTransportadoras] = useState<any>();
  let [openPopUp, setOpenPopUp] = useState(false);
  let [createData, setCreateData] = useState<any>();
  let deleteList: any = [];
  async function LoadData() {
    await GetAllTransportadoras().then((res) => {
      if (res?.length) {
        setTransportadoras(res);
      } else {
        console.log(`Erro: ${res.detail[0]?.msg || res.detail}`);
      }
      setTimeout(() => setLoading(false), 500);
    });
  }
  async function UpdateDeleteList(id: any) {
    deleteList.includes(id)
      ? deleteList.splice(deleteList.indexOf(id), 1)
      : deleteList.push(id);
    deleteList.map((id: any) => console.log(id));
  }
  async function handleDelete(id: any) {
    setLoading(true);
    DeleteTransportadoraById(id).then((res) => {
      LoadData();
    });
  }
  async function handleDeleteSelected() {
    setLoading(true);
    await deleteList.map((id: any) =>
      DeleteTransportadoraById(id).then((res) => {
        LoadData();
      })
    );
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setOpenPopUp(false);
    let resposta = await CreateTransportadora(createData);
    console.log(resposta);
    if (!resposta.detail) {
      alert(
        `A transportadora "${createData?.nome_transportadora}" foi criada com sucesso!`
      );
    } else {
      alert(
        `Ocorreu um erro ao criar a Transportadora: ${
          resposta.detail[0]?.msg || resposta.detail
        }`
      );
    }
    LoadData();
  }
  useEffect(() => {
    LoadData();
  }, []);
  return (
    <Grid display="grid">
      <Navbar />
      <Box display="grid" justifyContent="center">
        <Typography fontWeight={"bold"} fontSize={"2rem"}>
          Lista de transportadoras
        </Typography>
        <div style={{width:'100%', display:'inline-flex', justifyContent:'space-between'}}>
          <Button
            sx={{width: "max-content", fontSize: ".8rem" }}
            onClick={handleDeleteSelected}
          >
            <Remove />
            Deletar selecionadas
          </Button>
          <Button
            sx={{width: "max-content", fontSize: ".8rem" }}
            onClick={() => {
              setOpenPopUp(true);
            }}
          >
            <Add />
            Adicionar transportadora
          </Button>
        </div>
        {!loading ? (
          <TranspList
            UpdateDeleteList={UpdateDeleteList}
            setOpenPopUp={setOpenPopUp}
            transportadoras={transportadoras}
            handleDelete={handleDelete}
          />
        ) : (
          <Box display={"grid"} justifyContent="center" margin={"4rem"}>
            <CircularProgress size={90} />
          </Box>
        )}
      </Box>
      <Popup
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        position="right center"
      >
        <AddTranspForm
          createData={createData}
          setCreateData={setCreateData}
          handleSubmit={handleSubmit}
          setOpenPopUp={setOpenPopUp}
        />
      </Popup>
    </Grid>
  );
}
