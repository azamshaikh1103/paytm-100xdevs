import { useState } from "react";
import Warning from "../components/Warning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Subheading from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="w-1/3 flex flex-col justify-center">
        <div className="rounded-lg w-full bg-white shadow-2xl text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <Subheading label={"Enter your infromation to create an account"} />
          <Inputbox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="Bruce"
            label={"First Name"}
          />
          <Inputbox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Wayne"
            label={"Last Name"}
          />
          <Inputbox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="iambatman@gmail.com"
            label={"Email"}
          />
          <Inputbox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    firstname,
                    lastname,
                    email,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/");
              }}
              label={"Sign up"}
            />
          </div>
          <Warning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
