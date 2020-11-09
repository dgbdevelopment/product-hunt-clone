import firebase from "./firebase";
import firebaseContext from "./context";
import useAuth from "hooks/useAuth";


const Firebase = (props) => {

  const user = useAuth();

  return (
    <firebaseContext.Provider value={{user, firebase}}>
      {props.children}
    </firebaseContext.Provider>
  );
};

export default firebase;

export { Firebase, firebaseContext };
