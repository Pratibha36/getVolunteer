import { useState } from "react";
import AllJobs from "./components/AllJobs";
import Header from "./components/Header";
import Introcontent from "./components/Introcontent";
import { Outlet } from "react-router-dom";

function App() {


  return (
    <div>
      <Header />
      <Outlet/>
     </div>
  );
}

export default App;
