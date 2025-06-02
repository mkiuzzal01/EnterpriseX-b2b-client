import { useAllUsersQuery } from "../../../redux/features/users/usersApi";
import Loader from "../Loader";

const Profile = () => {
  const { data, isLoading } = useAllUsersQuery({ undefined });

  if (isLoading) return <Loader />;
  
  console.log(data);

  return (
    <div className="container mx-auto">
      <h1>This is profile</h1>
    </div>
  );
};

export default Profile;
