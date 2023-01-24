import { getAuth } from "firebase/auth";
import { redirect } from "react-router-dom";
import { app } from "./firebase";

export const loader = async () => {
  const auth = getAuth(app)
  const user = auth.currentUser;

  console.log(user)
  if (!user) {
    return redirect('/login')
  } else return null
};