import { Add, Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";


export default function TranspList(props: any) {
  return (
    <TableContainer sx={{ maxHeight: '70vh' }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2} align="center">Transportadora</TableCell>
          <TableCell>ID</TableCell>
          <TableCell colSpan={2}>Telefone</TableCell>
        </TableRow>
      </TableHead>
      {props.transportadoras?.length ? (
        props.transportadoras.map((item: any) => (
          <TableBody>
            <TableRow>
            <TableCell><Checkbox onChange={()=>{ props.UpdateDeleteList(item.key)}} /> </TableCell>
              <TableCell>{item.nome_transportadora}</TableCell>
              <TableCell>{item.key}</TableCell>
              <TableCell>{item.tele_transportadora}</TableCell>
              <TableCell><Button 
                onClick={()=>props.handleDelete(item.key)}
              color="error"><Delete/></Button> </TableCell>
            </TableRow>
          </TableBody>
        ))
      ) : (
        <TableBody>
          <TableRow>
            <TableCell colSpan={3}>
              <b>Não foram encontradas transportadoras</b>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
    </TableContainer>
  );
}
