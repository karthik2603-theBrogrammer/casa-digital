import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
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
import state from "../store";
import {
  slideAnimation,
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../src/framer-motion/motion";
import { useSnapshot } from "valtio";
import DetailCards from "./DetailCards";
const Dashboard = () => {
  const [smokeDocuments, setSmokeDocuments] = useState([]);
  const [waterDocuments, setWaterDocuments] = useState([]);
  const [tempDocuments, setTempDocuments] = useState([]);
  const [motionDocuments, setMotionDocuments] = useState([]);
  const [viewing, setViewing] = useState(null);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "gas-high-details"),
      (querySnapshot) => {
        const newDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSmokeDocuments(newDocuments);
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
            if (
              newDocData.ttc &&
              new Date() - newDocData.ttc < 25000 &&
              newDocData.smokeValue > 390
            ) {
              toast.success(
                `Danger! High gas Value of ${newDocData.smokeValue} detected at ${newDocData.time}`,
                {
                  position: "bottom-center",
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
  // for Water level in the Tank
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "water-level-details"),
      (querySnapshot) => {
        const newDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWaterDocuments(newDocuments);
        console.log(newDocuments);
      }
    );
    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "water-level-details"),
      (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const newDocData = change.doc.data();
            if (
              newDocData.ttc &&
              new Date() - newDocData.ttc < 25000 &&
              newDocData.waterLevel < 50
            ) {
              toast.success(
                `Alert! Your Water Tank is low with value ${newDocData.waterLevel} detected at ${newDocData.time}. Please fill or else you cant have bath!.`,
                {
                  position: "bottom-center",
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
  // for temperature
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "temp-details"),
      (querySnapshot) => {
        const newDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTempDocuments(newDocuments);
        console.log(newDocuments);
      }
    );
    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "temp-details"),
      (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const newDocData = change.doc.data();
            if (
              newDocData.ttc &&
              new Date() - newDocData.ttc < 25000 &&
              newDocData.temperature > 32
            ) {
              toast.success(
                `Its ${newDocData.temperature}! Switch on the Cooler!.`,
                {
                  position: "bottom-center",
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
  //
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "motion-detected-details"),
      (querySnapshot) => {
        const newDocuments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMotionDocuments(newDocuments);
        console.log(newDocuments);
      }
    );
    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "motion-detected-details"),
      (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const newDocData = change.doc.data();
            if (newDocData.ttc && new Date() - newDocData.ttc < 25000) {
              toast.success(`Intruder Alert!.`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
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
    <>
      <motion.section {...slideAnimation("right")}>
        <motion.div {...headContainerAnimation}>
          <motion.div
            {...headTextAnimation}
            className="px-6 py-2 flex flex-col justify-center"
          >
            <h1 class="my-4 text-[60px] font-extrabold leading-none tracking-tight text-gray-900 md:text-9xl  dark:text-white">
              Dashboard
            </h1>
            {tempDocuments.length !== 0 && (
              <h1 class="my-4 text-[20px] font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl  dark:text-white">
                Welcome! How Are You today? The Temperature is:{" "}
                <span className="text-gray-600 mx-3 py-4">
                  {
                    tempDocuments[
                      Math.floor(Math.random() * tempDocuments.length + 1)
                    ]?.temperature
                  }
                </span>
              </h1>
            )}
          </motion.div>
          <motion.div className="dropdown dropdown-hover self-center relative left-7 md:left-9">
            <label tabIndex={0} className="btn m-1">
              {viewing === null ? "See Details" : viewing}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu  text-white p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li onClick={() => setViewing("Gas Details")}>
                <a>Gas Details</a>
              </li>
              <li onClick={() => setViewing("Water Details")}>
                <a>Water Details</a>
              </li>
              <li onClick={() => setViewing("Temperature Details")}>
                <a>Temperature Details</a>
              </li>
              <li onClick={() => setViewing("Motion Details")}>
                <a>Motion Details</a>
              </li>
            </ul>

            {smokeDocuments.length !== 0 &&
            waterDocuments.length !== 0 &&
            tempDocuments.length !== 0 ? (
              viewing === "Gas Details" ? (
                <DetailCards details={smokeDocuments} type = 'Gas Details'/>
              ) : viewing === "Water Details" ? (
                <DetailCards details={waterDocuments} type = 'Water Details'/>
              ) : viewing === "Temperature Details" ? (
                <DetailCards details={tempDocuments} type = 'Temperature Details'/>
              ) : (
                <h1>Not Available</h1>
              )
            ) : (
              <h1>Getting Details</h1>
            )}
          </motion.div>
        </motion.div>
      </motion.section>
      <ToastContainer />
    </>
  );
};
export default Dashboard;
