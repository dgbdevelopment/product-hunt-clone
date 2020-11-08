import firebase from './firebase';
import firebaseContext from './context';

const Firebase = (props) => {

  return ( 
    <firebaseContext.Provider value={firebase}>
      {props.children}
    </firebaseContext.Provider>
   );
}

export default firebase;
 
export {Firebase};