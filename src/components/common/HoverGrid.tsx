"use client";

import { useEffect, useState } from "react";

export default function HoverGrid() {
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });
  const BOX_SIZE = 50; // Size of each mini box

  useEffect(() => {
    const updateGrid = () => {
      const cols = Math.floor(window.innerWidth / BOX_SIZE) + 1;
      const rows = Math.floor(window.innerHeight / BOX_SIZE) + 1;
      setDimensions({ cols, rows });
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  const totalBoxes = dimensions.cols * dimensions.rows;

  if (totalBoxes === 0) return null;

  return (
    <div 
      className="absolute inset-0 z-0 grid overflow-hidden pointer-events-auto opacity-50"
      style={{
        gridTemplateColumns: `repeat(${dimensions.cols}, ${BOX_SIZE}px)`,
        gridTemplateRows: `repeat(${dimensions.rows}, ${BOX_SIZE}px)`
      }}
    >
      {Array.from({ length: totalBoxes }).map((_, i) => (
        <div
          key={i}
          className="w-full h-full border-[0.5px] border-transparent hover:bg-[#603434]/20 hover:border-[#603434]/30 transition-all hover:duration-0 duration-1000"
        />
      ))}
    </div>
  );
}
