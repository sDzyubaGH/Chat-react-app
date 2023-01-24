import { Home } from "./pages/Home";
import "./style.scss"
import { Loading } from "./components/Loading";
import { useContext, useState } from "react";
import { Context } from "./context/Context";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function App() {
  const { auth } = useContext(Context)
  const [currentUser, setCurrentUser] = useState()
  const navigate = useNavigate()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user)
    } else {
      navigate('/login')
    }
  });

  return (
    currentUser
      ? (
        <div className="App" >
          <Home />
        </div>
      )
      : <Loading />
  )
}

export default App;