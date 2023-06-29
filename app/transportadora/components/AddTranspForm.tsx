import { Close } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React from "react";

export default function AddTranspForm(props: any) {
  function mphone(v: any) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
      r = r.replace(/^(\d*)/, "($1");
    }
    props.setCreateData((data: any) => ({ ...data, tele_transportadora: r }));
  }
  return (
    <form
      onSubmit={props.handleSubmit}
      method="post"
      style={{ display: "grid", gap: "1rem" }}
    >
      <div style={{ display: "inline-flex", justifyContent: "space-between" }}>
        <Typography fontWeight="bold" variant="h5">
          Adicionar transportadora
        </Typography>
        <Button onClick={() => props.setOpenPopUp(false)}>
          <Close />
        </Button>
      </div>
      <div style={{ display: "grid" }} className="nome">
        <label htmlFor="nome">Nome</label>
        <input
          required
          id="nome"
          type="text"
          placeholder="Nome"
          value={props.createData?.nome_transportadora}
          onChange={(e) => {
            props.setCreateData((data: any) => ({
              ...data,
              nome_transportadora: e.target.value,
            }));
          }}
        />
      </div>
      <div style={{ display: "grid" }} className="tele">
        <label htmlFor="tele">Telefone</label>
        <input
          required
          id="tele"
          type="tel"
          placeholder="(99)99999-9999"
          value={props.createData?.tele_transportadora}
          onChange={(e) => {
            mphone(e.target.value);
          }}
        />
      </div>
      <Button style={{ fontSize: "1.2rem" }} color="success" type="submit">
        Enviar
      </Button>
    </form>
  );
}
