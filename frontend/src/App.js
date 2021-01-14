import React, { useState } from "react";
import "./App.css";

import UserNav from "./navigation/userNavigation";
import AdminNav from "./navigation/AdminNavigation";
import AuthContext from "./api/authContext";

function App() {
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className='App'>
        <UserNav />
        <AdminNav />
      </div>
    </AuthContext.Provider>
  );
}

export default App;