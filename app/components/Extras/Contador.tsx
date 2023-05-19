"use client"

export interface ContadorProps {
    contador: number
    onIncrement: () => void
}

export default function Contador({contador, onIncrement}: ContadorProps) {
  return (
    <>
      <div><span id="count">{contador}</span></div>
      <button id="btnCounter" onClick={onIncrement}>Clique</button>
    </>
  )
}
