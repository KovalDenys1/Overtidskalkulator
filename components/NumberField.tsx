"use client";

import { useState } from "react";

function parse(text: string) {
  const n = Number(text.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function display(value: number) {
  return String(value).replace(".", ",");
}

export default function NumberField({
  id,
  value,
  onValue,
  decimals = true,
  describedBy,
}: {
  id: string;
  value: number;
  onValue: (n: number) => void;
  decimals?: boolean;
  describedBy?: string;
}) {
  const [text, setText] = useState(display(value));
  const [synced, setSynced] = useState(value);

  // An outside change, such as "Tilbakestill", rewrites the text; the visitor's own typing does not.
  if (value !== synced) {
    setSynced(value);
    if (parse(text) !== value) setText(display(value));
  }

  return (
    <input
      id={id}
      type="text"
      inputMode={decimals ? "decimal" : "numeric"}
      autoComplete="off"
      value={text}
      aria-describedby={describedBy}
      onChange={(e) => {
        const next = e.target.value;
        setText(next);
        const n = parse(next);
        if (n !== null && next.trim() !== "") {
          setSynced(n);
          onValue(n);
        }
      }}
      onBlur={() => {
        if (parse(text) === null || text.trim() === "") setText(display(value));
      }}
      className="field px-3"
    />
  );
}
