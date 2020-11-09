import app from "firebase/app";
import 'firebase/auth';
import "firebase/firestore";
import "firebase/storage";
import firbeaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firbeaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }
  register = async (username, email, password) => {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    return await newUser.user.updateProfile({
      displayName: username
    })
  };
  login = async (email, password) => {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }
  logOut = async () => {
    await this.auth.signOut()
  }
  addProduct = async (product) => {
    await this.db.collection('products').add(product);    
  }
}

const firebase = new Firebase();

export default firebase;
