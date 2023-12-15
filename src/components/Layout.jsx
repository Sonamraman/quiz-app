import React from "react";

const Layout = ({ children }) => {
  return (
    <div
      style={{ background: "#000080", height: "100vh" }}
      className="flex overflow-hidden flex-col flex-1"
    >
      <div
        className=" overflow-auto md:w-[70%] sm:w-[100%] inner-container"
        style={{
          background: "white",
          color: "#000",
          height: "100%",
          margin: "auto",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
