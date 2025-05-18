import { useForm } from "react-hook-form";
import TextInput from "../utils/input-fields/TextInput";
import DateInput from "../utils/input-fields/DateInput";
import RadioInput from "../utils/input-fields/RadioInput";

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center items-center h-screen">
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Register with Enterprise<span className="text-yellow-400">X</span>
            </h1>
          </div>
          <div className="bg-white p-6 rounded shadow w-80">
            <TextInput
              name="firstName"
              label="First name"
              type="text"
              variant="outlined"
              placeholder="Enter yor first name"
              control={control}
            />
            <TextInput
              name="middleName"
              label="Middle name"
              type="text"
              variant="outlined"
              placeholder="Enter your middle name"
              control={control}
            />
            <TextInput
              name="lastName"
              label="Last name"
              type="text"
              variant="outlined"
              placeholder="Enter your last name"
              control={control}
            />
            <TextInput
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              placeholder="Enter your email"
              control={control}
            />

            <TextInput
              name="phone"
              label="Phone"
              type="tel"
              variant="outlined"
              placeholder="Enter your phone number"
              control={control}
            />

            <TextInput
              name="nid"
              label="NID"
              type="text"
              variant="outlined"
              placeholder="Enter your NID number"
              control={control}
            />
            <DateInput
              name="dateOfBirth"
              label="Date of Birth"
              control={control}
              required
            />
            <RadioInput
              name="gender"
              label="Gender"
              control={control}
              required
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Others", value: "other" },
              ]}
            />

            <TextInput
              name="password"
              defaultValue="12345"
              label="Password"
              type="password"
              variant="outlined"
              placeholder="Enter your password"
              control={control}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
