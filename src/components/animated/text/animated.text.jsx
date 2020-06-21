import React from "react";

export default function AnimatedText({ style, text }) {
  return (
    <div style={style}>
      <h1>{text}</h1>
    </div>
  );
}
