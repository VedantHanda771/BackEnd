import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import SignUp from "./modules/signUp.jsx";

function App() {
  const [msg, setMsg] = useState("blank msg");
  const [result, setResult] = useState("");
  const [errmsg, setErrmsg] = useState("");

  useEffect(() => {
    sendUserData();
  }, []);

  async function sendUserData() {
    const response = await axios.get("http://localhost:3001");
    setMsg(response.data.msg);
    console.log(response);
    console.log(response.status);
  }

  function sendData() {
    axios
      .get("http://localhost:3001/checkData?id=123data")
      .then((response) => setResult(response.data.msg))
      .catch((error) => setErrmsg(error.message));
  }

  return (
    <Router>
      <div className="App">
        <h2>{msg}</h2>
        <button type="button" onClick={sendData}>
          send request to restapi
        </button>
        <p>
          {result}
          {errmsg}
        </p>
        <header>
          <ul>
            <li>
              <Link to="/signup">SignUp/</Link>
            </li>
          </ul>
        </header>
        <section>
          <Routes>
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;