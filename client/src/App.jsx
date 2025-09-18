
import React from "react";
import CompanyPage from "./pages/CompanyPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <CompanyPage />

      <ToastContainer
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" 
      />
    </>
  );
}

export default App;
