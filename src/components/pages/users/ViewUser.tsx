import { useParams } from "react-router-dom";
import { useSingleUserQuery } from "../../../redux/features/user/user-api";
import { useGetSellerByIdQuery } from "../../../redux/features/seller/seller-api";
import { useEffect, useState } from "react";
import { useGetStakeHolderByIdQuery } from "../../../redux/features/stake-holder/stakeHolder-api";
import SellerDetails from "../../utils/users/SellerDetails";
import StakeHolderDetails from "../../utils/users/StakeHolderDetails";

export default function ViewUser() {
  const [isSeller, setSeller] = useState<string>("");
  const [isStackHolder, setStackHolder] = useState<string>("");

  const { data: id } = useParams();
  const { data: singleUser } = useSingleUserQuery(id ?? "");

  useEffect(() => {
    if (singleUser?.data?.role === "seller") {
      setSeller(singleUser?.data?._id);
    } else if (singleUser?.data?.role === "admin") {
      setStackHolder(singleUser?.data?._id);
    }
  }, [singleUser]);

  const { data: singleSeller } = useGetSellerByIdQuery(isSeller, {
    skip: !isSeller,
  });
  const { data: singleStackHolder } = useGetStakeHolderByIdQuery(
    isStackHolder,
    {
      skip: !isStackHolder,
    }
  );

  return (
    <div>
      {singleUser?.data?.role === "seller" && singleSeller?.data && (
        <SellerDetails seller={singleSeller.data} />
      )}

      {singleUser?.data?.role === "admin" && singleStackHolder?.data && (
        <StakeHolderDetails stakeHolder={singleStackHolder.data} />
      )}
    </div>
  );
}
