import { Button } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchPedido(props: any){
    return(
        <form
            onSubmit={props.handleSearch}
            style={{
              display: "inline-flex",
              gap: "1rem",
            }}
          >
            <div style={{ display: "grid" }}>
              <label htmlFor="IdPedido">id do pedido:</label>
              <div>
                <input
                  onChange={(e) => props.setPesquisa(e.target.value)}
                  id="IdPedido"
                  type="text"
                />
              </div>
            </div>
            <div style={{ display: "grid", alignItems: "end" }}>
              <Button variant="outlined" type="submit">
                <SearchIcon />
                Buscar
              </Button>
            </div>
          </form>
    )
}


