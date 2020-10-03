import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDvVSDUzyYoitdlK6cZH8GZmAxhjxZ9Vmc",
  authDomain: "tree-savers.firebaseapp.com",
  databaseURL: "https://tree-savers.firebaseio.com",
  projectId: "tree-savers",
  storageBucket: "tree-savers.appspot.com",
  messagingSenderId: "1011769342966",
  appId: "1:1011769342966:web:faa006aea68c11738565d7",
  measurementId: "G-736K204Y09",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;
