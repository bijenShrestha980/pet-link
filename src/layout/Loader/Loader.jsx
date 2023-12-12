import { motion } from "framer-motion";

// const Loader = (props) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 100 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.7 }}
//       className={`w-full min-h-full flex justify-center items-center absolute top-[50%] m-0 ${props.className}`}
//       style={{
//         transform: "translateY(-50%)",
//       }}
//     >
//       <span className="loader"></span>
//     </motion.div>
//   );
// };

// const Loader = (props) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 100 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.7 }}
//       className={`w-full min-h-full flex justify-center items-center absolute top-[50%] m-0 ${props.className}`}
//       style={{
//         transform: "translateY(-50%)",
//       }}
//     >
//       <div class="loader-16"></div>
//     </motion.div>
//   );
// };

const Loader = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className={`w-full flex justify-center items-center m-0 ${props.className}`}
    >
      <div className="loader-container">
        <div className="loader-03-left"></div>
        <div className="loader-03-right"></div>
      </div>
    </motion.div>
  );
};

export default Loader;
