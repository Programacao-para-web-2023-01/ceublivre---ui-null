"use client"

import { useEffect, useState } from "react";

export default function Clock() {
  // let s = 0;
  const [s, setS] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [reset, setReset] = useState(false);
  const [hora, setHora] = useState("00");
  const [minuto, setMinuto] = useState("00");
  const [segundo, setSegundo] = useState("00");

  function update() {
    let tmp = s;
    let se = tmp % 60;
    tmp -= se;
    tmp /= 60;
    let mi = tmp % 60;
    tmp -= mi;
    tmp /= 60;

    setHora(tmp.toString().length == 1 ? "0" + tmp.toString() : tmp.toString());
    setMinuto(mi.toString().length == 1 ? "0" + mi.toString() : mi.toString());
    setSegundo(se.toString().length == 1 ? "0" + se.toString() : se.toString());
  }

  useEffect(() => {
    if (reset) {
      setReset(false);
      setS(0);
    }
    if (isPaused) return;
    const interval = setInterval(() => {
      setS(s + 1);
      update();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPaused, reset, s]);

  function StartPause () {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  }

  function Reset () {
    setS(0);
    setHora("00");
    setMinuto("00");
    setSegundo("00");
    setReset(true);
  }

  return (
    <>
      <div><span>{hora}</span>:<span>{minuto}</span>:<span>{segundo}</span></div>
      <button onClick={StartPause}>{!isPaused ? 'Pause' : 'Start'}</button>
      <button onClick={Reset}>Reset</button>
    </>
  )
}
