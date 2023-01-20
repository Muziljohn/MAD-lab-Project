import firebase from "firebase/compat/app";
import auth from "firebase/compat/auth";
import firestore from "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDIoCZdwuz8eCyHxLSxGqjOSOnjPza0r_M",
  authDomain: "donewithit-97115.firebaseapp.com",
  projectId: "donewithit-97115",
  storageBucket: "donewithit-97115.appspot.com",
  messagingSenderId: "816446356025",
  appId: "1:816446356025:web:eb96a5d7a12a2bc9f82be8",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });
export { firebase };
