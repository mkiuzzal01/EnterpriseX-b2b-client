import { useAllMainCategoryQuery } from "../../../../redux/features/category/category-api";

export default function MainCategory() {
  const { data, isLoading } = useAllMainCategoryQuery({});
  console.log(data);
  return <div>MainCategory</div>;
}
