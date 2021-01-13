import React, { useState } from "react";
import "./App.css";

import UserNav from "./navigation/userNavigation";
import AdminNav from "./navigation/AdminNavigation";
import AuthContext from "./api/authContext";

function App() {
  const [user, setUser] = useState();
  return (
    <div className='App'>
      <AdminNav />
    </div>

  );
}

export default App;
