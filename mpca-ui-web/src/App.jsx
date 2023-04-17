import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "gas-high-details"),
      (querySnapshot) => {
        const newDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(newDocuments);
        console.log(newDocuments);
      }
    );

    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "gas-high-details"),
      (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const newDocData = change.doc.data();
            if (newDocData.ttc && new Date() - newDocData.ttc < 25000) {
              toast.success(
                `Danger! High gas Value of ${newDocData.smokeValue} detected at ${newDocData.time}`,
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                }
              );
              // getThiefData();
              console.log(
                `New document created: ${JSON.stringify(
                  newDocData
                )} but time now is ${new Date().toLocaleTimeString()}`
              );
            }
            // Perform other actions with the new document data
          }
        });
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-[#5b21b6] h-[100vh] w-[100vw] text-white p-6 flex items-center justify-center">
      <div className="w-[80%] font-sans ">
        <h1 className="text-6xl my-9"> Welcome To Our MPCA Web UI.</h1>
        <h3 className="text-3xl">By:</h3>
        <h2 className="text-3xl">Kaipa Siddharth Rao</h2>
        <h2 className="text-3xl">Karthik Namboori</h2>
        <h2 className="text-3xl">Krishna Bhat</h2>
        <h2 className="text-3xl">Keshav Dalmia</h2>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
