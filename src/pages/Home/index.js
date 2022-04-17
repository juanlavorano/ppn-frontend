import React from "react";
import Hero from "./Hero";
import useContract from "hooks/useContract";

export default function Home() {
  const contract = useContract();

  return <Hero />;
}
