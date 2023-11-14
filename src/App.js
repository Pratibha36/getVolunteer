import { useState } from "react";
import AllJobs from "./components/AllJobs";
import Header from "./components/Header";
import Introcontent from "./components/Introcontent";
import { Outlet } from "react-router-dom";
import { useStateValue } from './components/StatePovider';
import "./app.css"

function App() {
  const [{ openloginmodal, iserror, errorMessage }, dipatch] = useStateValue();

  return (
    <div >
      <Header />
      <Outlet/>
     </div>
  );
}

export default App;
