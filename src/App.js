import "./styles.css";
import { Routes, Route } from "react-router-dom";

import { Inbox } from "./pages/Inbox";
import { Spam } from "./pages/Spam";
import { Starred } from "./pages/Starred";
import { Trash } from "./pages/Trash";
import { Details } from "./pages/Details";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/spam" element={<Spam />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/starred" element={<Starred />} />
          <Route path="/details/:mailId" element={<Details />} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
