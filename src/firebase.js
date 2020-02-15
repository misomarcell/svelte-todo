import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAFkDsIKxdKsurbSqeQzAdZ5Trcac1noP0",
    authDomain: "marcell-svelte-todo.firebaseapp.com",
    databaseURL: "https://marcell-svelte-todo.firebaseio.com",
    projectId: "marcell-svelte-todo"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();