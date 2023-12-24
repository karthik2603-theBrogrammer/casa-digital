import React, { useState } from "react";
import {
  slideAnimation,
  headContainerAnimation,
  headTextAnimation,
} from "../../src/framer-motion/motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
const Admin = () => {
  const [pinEntered, setPinEntered] = useState("");
  const handleSubmit = async () => {
    if (pinEntered === "") {
      toast.error(`Enter Pin!`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (pinEntered !== "karthikbest") {
      toast.error(`Invalid Pin!`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });



      try {
        const userRef = doc(db, "admin", "cZBCRUvrSiVpopbws3nF");
        await updateDoc(userRef, {
            validEntry: 0,
            time:  new Date().toLocaleString(),
        });
        console.log("Document updated successfully!");
        toast.error(`Invalid Entry ${error}!`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
      } catch (error) {
        

      }
    }else if(pinEntered === "karthikbest"){
        try {
            const userRef = doc(db, "admin", "cZBCRUvrSiVpopbws3nF");
            await updateDoc(userRef, {
                validEntry: 1,
                time:  new Date().toLocaleString(),
            });
            console.log("Document updated successfully!");
            toast.success(` Welcome Admin!`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
          } catch (error) {
            toast.error(`Error ${error}!`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });

          }

    }
  };
  return (
    <>
      <motion.section {...slideAnimation("left")}>
        <motion.div {...headContainerAnimation}>
          <motion.div
            {...headTextAnimation}
            className="px-6 py-2 flex flex-col justify-center"
          >
            <h1 class="mb-3 text-[40px] font-extrabold leading-none tracking-tight text-white md:text-9xl  dark:text-white">
              Welcome Admin!
            </h1>
            <h1 class="mb-3 text-[40px] font-extrabold leading-none tracking-tight text-white text-3xl md:text-6xl  dark:text-white">
              Enter Your Pin!
            </h1>
            <input
              type="text"
              value={pinEntered}
              onChange={(e) => setPinEntered(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-[50%] max-w-xs my-8 sm:self-center md:self-start"
            />
            <button
              className="btn btn-outline btn-primary w-[30%] text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </motion.div>
        </motion.div>
      </motion.section>
      <ToastContainer />
    </>
  );
};

export default Admin;
