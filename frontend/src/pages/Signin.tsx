import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/Label";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { TextwithLink } from "../components/TextwithLink";
import { RememberMeBox } from "../components/RememberMeBox";
import axios from "axios";
import { Backend_url } from "../config";
import { LoadinSpinner } from "../components/LoadingSppiner";

const Signin = () => {
  const [check, isCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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

  if(!check){
  return  <LoadinSpinner/>
  } else {
    return (
      <div className=" h-screen grid grid-cols-4">
        <div className="rounded bg-slate-100 flex flex-col  justify-center  col-span-2 items-center p-2 h-full ">
          <div className="flex flex-col items-center my-6">
            <Heading text="Already a member" />
            <TextwithLink text="Not a member?" link="signup" url="/auth/signup" />
          </div>

          <div className="w-full flex flex-col items-center">
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
              <div className="mt-1">
                <RememberMeBox
                  onClick={() => {
                    setRememberMe((val) => true);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-3">
            <Button
              text="SignIn"
              onClick={async () => {
                const res = await axios.post(
                  `${Backend_url}/api/v1/user/auth/signin`,
                  {
                    email,
                    password,
                    rememberMe,
                  }
                );
                localStorage.setItem("jwt", res.data.jwt);
                navigate("/dashboard");
              }}
            />
            <TextwithLink link="forgot your password?" url="#" />
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

export default Signin;
