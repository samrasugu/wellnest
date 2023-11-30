import React from "react";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

interface IformInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Register() {
  const [submitted, setSubmitted] = React.useState(false);

  const [registrationError, setRegistrationError] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter();

  const [signingUp, setSigningUp] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IformInputs>({
    // mode: "onBlur",
    defaultValues: {
      firstName: "",
      email: "",
      lastName: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IformInputs> = async (data: IformInputs, e) => {
    e?.preventDefault();

    setSigningUp(true);

    await fetch("/api/register/registerUser", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message == "success") {
          setSigningUp(false);
          setSubmitted(true);
        } else {
          setRegistrationError(data.message);
          setSigningUp(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Register - WellNest</title>
      </Head>

      <div className="flex md:flex-row flex-col-reverse">
        <div className="md:w-1/2 hidden md:flex flex-col h-screen items-start justify-between px-16 py-6 bg-gradient-to-r from-sky-500 to-indigo-500">
          <div className="flex flex-col gap-40">
            <h1 className="text-white font-bold text-5xl pb-8 pt-10">
              WellNest
            </h1>
            <h2 className="text-white text-5xl">Take charge of your health</h2>
          </div>
          <p className="text-white">&copy;WellNest 2023</p>
        </div>
        <div className="md:w-1/2 w-full h-screen flex flex-col justify-center items-center text-center py-8">
          <div className="lg:hidden block"></div>
          <h2 className="md:pt-10 pt-4 text-2xl md:text-3xl font-bold text-black">
            Register
          </h2>
          {submitted ? (
            <div className="flex flex-col px-10 py-10 my-10 bluebackground text-green-primary max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold">Thank you for registering</h2>
              <p className="text-xl font-medium">
                Email verification link sent to your email inbox
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:px-28 px-10 md:py-10 py-6 justify-center gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  className="outline-none border form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <p className="text-red-500">First Name is required</p>
                )}
                <input
                  type="text"
                  placeholder="Last Name"
                  className="outline-none border form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <p className="text-red-500">Last Name is required</p>
                )}
                <input
                  type="text"
                  placeholder="Email"
                  className="outline-none border form-input shadow px-4 py-2 rounded-lg p-1 placeholder:p-1"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500">Email is required</p>
                )}

                <div className="flex flex-row justify-between items-center gap-2 md:gap-10">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="outline-none border md:w-80 w-64 form-input shadow px-4 py-2 rounded-lg placeholder:p-1"
                    {...register("password", { required: true })}
                  />
                  <button type="button" onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500">Password is required</p>
                )}

                {registrationError && (
                  <p className="text-red-400">{registrationError}</p>
                )}

                {signingUp ? (
                  <CircularProgress />
                ) : (
                  <button
                    type="submit"
                    className="bg-green-primary py-4 rounded-lg text-white bg-sky-500"
                  >
                    Sign up
                  </button>
                )}

                <p className="text-gray-500 text-sm pt-3">
                  Already have an account?{" "}
                  <Link href="/auth/login">
                    <span className="cursor-pointer underline text-blue-800 font-bold text-sm">
                      Sign in
                    </span>
                  </Link>{" "}
                </p>

                <p className="text-black text-sm pt-3">
                  By signing up on WellNest you agree to our{" "}
                  <Link href="">
                    <span className="cursor-pointer text-blue-800 font-bold text-sm">
                      Terms
                    </span>
                  </Link>{" "}
                  &{" "}
                  <Link href="">
                    <span className="cursor-pointer text-blue-800 font-bold text-sm">
                      Privacy Policy
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
