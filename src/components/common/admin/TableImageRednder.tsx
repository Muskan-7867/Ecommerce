import { motion } from "motion/react";
const TableImageRednder = ({ images }: any) => {
  return (
    <motion.div
      layoutId={images[0].publicId}
      className="flex justify-center items-center"
    >
      <img src={images[0].url} className="w-14 aspect-square object-cover" />
    </motion.div>
  );
};

export default TableImageRednder;
