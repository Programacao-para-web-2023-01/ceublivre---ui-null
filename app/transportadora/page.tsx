"use client";

import React, { useEffect, useState } from "react";
import { GetAllTransportadoras } from "../components/ApiCrude";
import {
  Box,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar/Navbar";

export default function Transportadora() {
  let [loading, setLoading] = useState(true);
  let [transportadoras, setTransportadoras] = useState<any>();
  useEffect(() => {
    GetAllTransportadoras().then((res) => setTransportadoras(res));
  }, []);
  useEffect(() => {
    if(transportadoras){
    setLoading(false)};
  }, [transportadoras]);
  return (
    <Grid display="grid">
      <Navbar />
      <Box display="grid" justifyContent="center">
        <Typography fontWeight={'bold'} fontSize={'2rem'}>
        Lista de transportadoras

        </Typography>
        {!loading ? (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                    Transportadora
                </TableCell>
                <TableCell>
                    ID
                </TableCell>
                <TableCell>
                    Telefone
                </TableCell>
              </TableRow>
            </TableHead>
            {transportadoras?.map((item: any) => (
              <TableBody>
                <TableRow>
                  <TableCell>
                    {item.nome_transportadora}
                  </TableCell>
                  <TableCell>{item.key}</TableCell>
                  <TableCell>{item.tele_transportadora}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        ) : (
          <Box margin={"4rem"}>
            <CircularProgress size={90} />
          </Box>
        )}
      </Box>
    </Grid>
  );
}
