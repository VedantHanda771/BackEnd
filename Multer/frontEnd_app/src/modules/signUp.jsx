import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  function sendSignupData() {
    const data = { name: name, email: email, pass: pass, dob: dob, gender: gender };
    axios.post("http://localhost:3001/signupsubmit", data)
      .then(response => {
        console.log(response.data);
        setMsg(response.data.msg);
      })
      .catch((error) => setMsg(error.message));
  }

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Account</h2>
      <h3 className="signup-message">{msg}</h3>
      
      <div className="signup-field">
        <label>Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
      </div>

      <div className="signup-field">
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@xyz.com" />
      </div>

      <div className="signup-field">
        <label>Password</label>
        <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Enter your password" />
      </div>

      <div className="signup-field">
        <label>Date of Birth</label>
        <input type="date" onChange={(e) => setDob(e.target.value)} />
      </div>

      <div className="signup-field">
        <label>Gender</label>
        <select onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <button className="signup-button" onClick={sendSignupData}>Submit</button>
    </div>
  );
}
