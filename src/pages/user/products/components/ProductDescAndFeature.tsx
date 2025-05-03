import { Product } from "../../../../types/Product";

const ProductDescAndFeature = ({ product }: { product: Product }) => {
  return (
    <div className=" w-full">
    
      <p className="text-gray-700 mt-6 text-sm w-full overflow-auto">
        {product.description}
      </p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900">Features:</h2>

        <ul className="mt-2">
          <li className="flex items-center">
            <ul className="list-disc ml-5 text-gray-600">
              {product.features
                ?.split("/n")
                .map((feature: string, index: number) => (
                  <li key={index}>{feature.trim()}</li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDescAndFeature;