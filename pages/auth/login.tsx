import React from "react";
import Image from "next/image";
import WarehouseBanner from "../../assets/warehouse-banner.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Head from "next/head";
import { useRouter } from "next/router";
// import { useAuth } from "../../context/authContext";
// import Logo from "../../assets/brand/agrofi_logo_crp.jpg";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  //   const { login, user } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //   await login(email, password);

      // if(user)
      router.push("/auth/register");
    } catch (error) {
      console.log(error);
      // custom error handling
    }
  };
  return (
    <>
      <Head>
        <title>Agrofi | Login</title>
      </Head>
      <div className="flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500">
        <h1 className="text-white font-bold text-3xl md:pb-2 pb-8">WellNest</h1>
        <div className="flex-col text-center md:mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="pt-1 text-base">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center md:px-20 px-4 py-4 gap-4 md:py-10">
              <input
                type="email"
                placeholder="Business Email"
                className="outline-none border md:w-96 w-full form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex flex-row justify-between items-center gap-2 md:gap-10">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="outline-none border md:w-80 w-64 form-input shadow px-4 py-2 rounded-lg placeholder:p-1"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={toggleShowPassword}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>
              <button
                type="submit"
                className="bg-sky-500 w-72 md:w-96 py-2 rounded-lg text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
