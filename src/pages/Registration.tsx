import { useForm } from "react-hook-form";
import TextInput from "../utils/input-fields/TextInput";

type RegistrationProps = {
  password?: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  phone?: string;
  nid: string;
  dateOfBirth: string;
  gender: string;
  dateOfJoining: string;
  address: {
    presentAddress: string;
    permanentAddress: string;
  };
  bankAccountInfo: {
    paymentMethod: string;
    bankName: string;
    accountNumber: string;
  };
};

const Registration = () => {
  const { control, handleSubmit } = useForm<RegistrationProps>();

  const onSubmit = (data: RegistrationProps) => {
    console.log(data);
    alert("Registration successful!");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
      >
        <TextInput name="password" control={control} />
      </form>
    </div>
  );
};

export default Registration;
