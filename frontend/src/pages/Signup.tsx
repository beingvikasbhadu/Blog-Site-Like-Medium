import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/Label";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { TextwithLink } from "../components/TextwithLink";
import axios from "axios";
import { Backend_url } from "../config";
import { LoadinSpinner } from "../components/LoadingSppiner";

const Signup = () => {
  const [check, isCheck] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${Backend_url}/api/v1/service/is-signin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        console.log(res.data.is_signin);
        if (res.data.is_signin) {
          navigate("/dashboard");
        }
        isCheck(true);
      });
  }, []);

  if (!check) {
    return <LoadinSpinner />;
  } else {
    return (
      <div className=" h-screen grid grid-cols-4">
        <div className="rounded bg-slate-100 flex flex-col  justify-center  col-span-2 items-center p-2 h-full ">
          <div className="flex flex-col items-center my-6">
            <Heading text="Create An Account" />
            <TextwithLink
              text="Already a member?"
              link="signin"
              url="/auth/signin"
            />
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="mt-1 w-2/4">
              <Label text="Name" />
              <InputBox
                placeholder="johndoe"
                onChange={(e) => {
                  setName((val) => e.target.value);
                }}
              />
            </div>
            <div className="mt-1 w-2/4">
              <Label text="Email" />
              <InputBox
                placeholder="johndoe@gmail.com"
                onChange={(e) => {
                  setEmail((val) => e.target.value);
                }}
              />
            </div>
            <div className="mt-2 w-2/4">
              <Label text="Password" />
              <InputBox
                placeholder="*******"
                type="password"
                onChange={(e) => {
                  setPassword((val) => e.target.value);
                }}
              />
            </div>
            <div className="mt-2 w-2/4">
              <Label text="Confirm Password" />
              <InputBox
                placeholder="*******"
                type="password"
                onChange={(e) => {
                  setConfirmPassword((val) => e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center mt-3">
            <Button
              text="SignUp"
              onClick={async () => {
                if (confirmPassword == password) {
                  const res = await axios.post(
                    `${Backend_url}/api/v1/user/auth/signup`,
                    {
                      name,
                      email,
                      password,
                    }
                  );
                  localStorage.setItem("jwt", res.data.jwt);
                  navigate("/dashboard");
                } else {
                  alert("Passwords do not match");
                }
              }}
            />
          </div>
        </div>
        <div className=" font-mono bg-slate-200 text-blue col-span-2 flex items-center  ">
          <div className="font-bold mx-5">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
            excepturi distinctio! Porro, officia deserunt est laboriosam iure
            nulla exercitationem quo nemo amet nam inventore praesentium
            soluta."
          </div>
        </div>
      </div>
    );
  }
};

export default Signup;
