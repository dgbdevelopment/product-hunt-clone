import { useState, useEffect } from "react";
import firebase from "fb/index";

const useAuth = () => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    return () => subscribe();
  }, []);
  return user;
};

export default useAuth;
