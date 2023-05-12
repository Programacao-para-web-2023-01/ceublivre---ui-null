"use client"

export interface ContadorProps {
    reset: () => void
}

export default function Reset({reset}: ContadorProps) {
  return (
    <>
      <button onClick={reset}>Reset</button>
    </>
  )
}
