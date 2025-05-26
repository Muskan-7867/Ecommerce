// In TableImageRender.tsx
import { motion } from "framer-motion";
import { ProductImage } from "../../../types/Product"; 

interface TableImageRenderProps {
  images: ProductImage[];
}

const TableImageRender: React.FC<TableImageRenderProps> = ({ images }) => {
  return (
    <motion.div
      layoutId={images[0].publicId}
      className="flex justify-center items-center"
    >
      <img src={images[0].url} className="w-14 aspect-square object-cover" />
    </motion.div>
  );
};

export default TableImageRender;
