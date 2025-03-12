"use client";
import React from "react";

export type BallButtonProps = {
  className?: string;
};

const BallButton: React.FC<BallButtonProps> = ({ className }) => {
  return (
    <>
      <div className="absolute top-0">
        <button>Hola</button>
      </div>
    </>
  );
};

export default BallButton;
