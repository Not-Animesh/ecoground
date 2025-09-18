import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex flex-col items-start bg-zinc-900 w-full min-h-screen mx-auto"
      style={{
        maxWidth: "1520.8px",
        paddingLeft: "160.4px",
        paddingRight: "260.4px",
      }}
    >
      {children}
    </div>
  );
};