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
              Welcome to casaDigital
            </h1>
          </motion.div>
          <motion.div
            {...headContentAnimation}
            className="flex flex-col gap-3  justify-center px-6"
          >
            <p className="my-1 text-md text-gray-800 md:text-[28px]">
              casaDigital has been built as our MPCA Semester 4 Project. It makes
              use of the iOt technology, namely the ESP8266 and Arduino-Uno as
              the microcontrollers. The Arduino Uno houses(pun intended) the
              components and transmits the data to the ESP8266 that recieves the
              data from the home and transmits to the Node Sever. From there its
              sent to the cloud and with the help of SSR i.e Server Side
              Rendering, a popular cloud feature, its reflected onto your
              frontend web user interface you are seeing currently.
            </p>

          
          </motion.div>
          <motion.div {...headContentAnimation} className="my-9 mx-4">
            <span
              className="bg-purple-400 rounded-lg text-white p-3 text-1xl "
              onClick={() => (state.page = "dashboard")}
            >
              Proceed
            </span>
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
