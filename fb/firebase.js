import app from "firebase/app";
import 'firebase/auth';
import firbeaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firbeaseConfig);
    }
    this.auth = app.auth();
  }
  register = async (username, email, password) => {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    return await newUser.user.updateProfile({
      displayname: username
    })
  };
}

const firebase = new Firebase();

export default firebase;
