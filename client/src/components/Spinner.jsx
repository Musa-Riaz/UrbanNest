import React from "react";
import { SyncLoader } from "react-spinners";
const Spinner = () => {
  return (
    <div>
      <SyncLoader color="#2fdfe2" style={{display:'flex', justifyContent:"center", alignItems:"center", height:"100vh"}} />
    </div>
  );
};

export default Spinner;
