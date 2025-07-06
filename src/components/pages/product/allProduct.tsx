import { useAllProductsQuery } from "../../../redux/features/products/product-api";

const AllProduct = () => {
  const { data, isLoading } = useAllProductsQuery({});
  console.log(data);
  return <div>this is all product page</div>;
};

export default AllProduct;
