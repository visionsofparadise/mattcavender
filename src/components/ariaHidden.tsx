import React from "react";
import "./layout.css";

export default function Ah({ children }) {
  return <span aria-hidden="true">{children}</span>;
}
