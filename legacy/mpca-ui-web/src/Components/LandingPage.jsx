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
import { motion, AnimatePresence } from "framer-motion";
import state from "../store";
import {
  slideAnimation,
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../src/framer-motion/motion";
import { useSnapshot } from "valtio";
const LandingPage = () => {
  const snap = useSnapshot(state);
  return (
    <>
      <motion.section {...slideAnimation("left")}>
        <motion.div {...headContainerAnimation}>
          <motion.div
            {...headTextAnimation}
            className="px-6 py-2 flex flex-col justify-center"
          >
            <h1 class="mb-3 text-[40px] font-extrabold leading-none tracking-tight text-gray-900 md:text-9xl  dark:text-violet-800">
              Hey There!
            </h1>

            <h1 class="mb-2 text-[60px] font-extrabold leading-none tracking-tight text-gray-900 md:text-9xl  dark:text-white">
              Welcome to Casa digital!
            </h1>
          </motion.div>
          <motion.div
            {...headContentAnimation}
            className="flex flex-col gap-3  justify-center px-6"
          >
            <p className="my-1 text-md text-gray-800 md:text-[28px] md:p-6">

              Casa Digital: Real-time IoT data processing for smart homes. 
              Utilizes <span className="font-bold text-warning-content">MQTT, Kafka, and TimescaleDB</span>. 
              Connects sensors, streams data, and stores in TimescaleDB. Node.js integration, plus 
              CLI tool for analysis.
            </p>


          </motion.div>
          <motion.div {...headContentAnimation} className="my-9 mx-4">
            {/* <span
              className="bg-purple-400 rounded-lg text-white p-3 text-1xl "
              onClick={() => (state.page = "dashboard")}
            >
              Proceed
            </span> */}
            <span
              className="bg-purple-400 rounded-lg text-white p-3 text-1xl mx-6 "
              onClick={() => (state.page = "admin")}
            >
              Proceed As Admin
            </span>
          </motion.div>
        </motion.div>
      </motion.section>
      <ToastContainer />
    </>
  );
};

export default LandingPage;
