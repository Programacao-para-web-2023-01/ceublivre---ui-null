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
        {!loading ? (
          <Table>
            <thead>
              <tr>
                <th
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                  scope="col"
                >
                  Lista de transportadoras
                </th>
              </tr>
            </thead>
            {transportadoras?.map((item: any) => (
              <TableBody>
                <TableRow>
                  <TableCell>
                    Transportadora: {item.nome_transportadora}
                  </TableCell>
                  <TableCell>id: {item.key}</TableCell>
                  <TableCell>Telefone: {item.tele_transportadora}</TableCell>
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
