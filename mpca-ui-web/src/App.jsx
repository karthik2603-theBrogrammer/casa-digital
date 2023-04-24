import LandingPage from "./Components/LandingPage";
import { useSnapshot } from "valtio";
import state from "./store";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
function App() {
  const snap = useSnapshot(state);

  const [documents, setDocuments] = useState([]);
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     collection(db, "gas-high-details"),
  //     (querySnapshot) => {
  //       const newDocuments = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setDocuments(newDocuments);
  //       console.log(newDocuments);
  //     }
  //   );

  //   return () => unsubscribe();
  // }, [db]);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     collection(db, "gas-high-details"),
  //     (querySnapshot) => {
  //       querySnapshot.docChanges().forEach((change) => {
  //         if (change.type === "added") {
  //           const newDocData = change.doc.data();
  //           if (newDocData.ttc && new Date() - newDocData.ttc < 25000) {
  //             toast.success(
  //               `Danger! High gas Value of ${newDocData.smokeValue} detected at ${newDocData.time}`,
  //               {
  //                 position: "top-right",
  //                 autoClose: 5000,
  //                 hideProgressBar: false,
  //                 closeOnClick: true,
  //                 pauseOnHover: true,
  //                 draggable: true,
  //                 progress: undefined,
  //                 theme: "dark",
  //               }
  //             );
  //             // getThiefData();
  //             console.log(
  //               `New document created: ${JSON.stringify(
  //                 newDocData
  //               )} but time now is ${new Date().toLocaleTimeString()}`
  //             );
  //           }
  //           // Perform other actions with the new document data
  //         }
  //       });
  //     }
  //   );
  //   return () => unsubscribe();
  // }, []);

  return (
    <AnimatePresence className = ''>
      {snap.page === "intro" && (
        <LandingPage/>
      )}
      {snap.page === "dashboard" && (
        <div>skndskdnksndk</div>
      )}
    </AnimatePresence>
  );
}

export default App;
