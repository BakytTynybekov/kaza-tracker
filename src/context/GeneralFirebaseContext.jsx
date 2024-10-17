import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { createContext, useState } from "react";
import * as firebaseApp from "../firebase/firebase";

export const GeneralFirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState(false);

  const loginWithEmail = async (email, password) => {
    try {
      const newUser = await signInWithEmailAndPassword(
        firebaseApp.auth,
        email,
        password
      );
      setUser(newUser);
    } catch (error) {
      alert(error.message);
    }
  };

  const signUpWithEmail = async (email, password, name) => {
    try {
      let response = await createUserWithEmailAndPassword(
        firebaseApp.auth,
        email,
        password,
        name
      );
      setUser(response?.user);
    } catch (error) {
      alert(error?.message);
    }
  };

  onAuthStateChanged(firebaseApp.auth, (createdUser) => {
    setUser(createdUser);
  });

  const logOut = async () => {
    try {
      await signOut(firebaseApp.auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteData = async (id) => {
    await deleteDoc(doc(firebaseApp.fireStore, "users", id));
  };

  const addOrder = async (order) => {
    await setDoc(doc(firebaseApp.fireStore, "users", user.uid), order);
  };

  const getUserData = async (id) => {
    const docRef = doc(firebaseApp.fireStore, "users", id);
    const data = await getDoc(docRef);
    if (data.exists()) {
      console.log(data.data());
      setUserData(data.data());
      setStatus(true);
    }
  };

  const changeUserData = async (id, data) => {
    await updateDoc(doc(firebaseApp.fireStore, "users", id), data);
  };

  const data = {
    userData,
    user,
    loginWithEmail,
    logOut,
    signUpWithEmail,
    addOrder,
    getUserData,
    changeUserData,
    deleteData,
  };
  return (
    <GeneralFirebaseContext.Provider value={data}>
      {children}
    </GeneralFirebaseContext.Provider>
  );
};
