"use client";
import Phone from "@/components/inputs/Phone";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from 'next/image';


const SignUpForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    country: ""
  });
  const [conPass, setConPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const geSsearchData = searchParams.get("callbackUrl");

  useEffect(() => {
    if (session) {
      if (geSsearchData) {
        router.push(geSsearchData);
      }
    }
  }, [session, router, geSsearchData]);

  useEffect(() => {
    if (session) {
      router.push("/auth/dashboard");
    }
  }, [session, router]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      if (user.password !== conPass) {
        alert("Password does not match!");
        return false;
      }
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email.toLowerCase(),
          password: user.password,
          profile: user,
          role: "User"
        })
      });

      console.log(response);

      if (response.status !== 200) {
        setErrorMessage(response);
        Swal.fire({
          title: "Error!",
          text: data.error,
          icon: "error",
          confirmButtonText: "Ok"
        });
      } else {
        // Redirect to the base URL after successful login
        router.push("/auth/login");
        router.refresh();
        Swal.fire({
          title: "Success!",
          text: "Registration Success",
          icon: "success",
          confirmButtonText: "Ok"
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred during sign-in.");
    }
  };
  return (
    // <HomeLayout>
    <section className="bg-gray-50 bg-gray-900">
      <Head>
        <title>Login | Plastic Edu Hub</title>
      </Head>
      <div className="flex flex-col w-auto items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 text-white"
        >

          {/* <Image
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            layout="responsive"
            width={32}
            height={32}
            className="mr-2"
          /> */}


          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Plastic Edu Hub
        </Link>
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-gray">
              Sign up a new user
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-2 group">
                  {/* <label
                    for="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 text-gray"
                  >
                    First Name
                  </label> */}
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Jahangir"
                    required=""
                    onChange={(e) =>
                      setUser({
                        ...user,
                        firstName: e.target.value
                      })
                    }
                    value={user.firstName}
                  />
                </div>
                <div class="relative z-0 w-full mb-2 group">
                  {/* <label
                    for="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 text-gray"
                  >
                    Last Name
                  </label> */}
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Hossain"
                    required=""
                    onChange={(e) =>
                      setUser({
                        ...user,
                        lastName: e.target.value
                      })
                    }
                    value={user.lastName}
                  />
                </div>
              </div>

              <div class="relative z-0 w-full mb-5 group">
                {/* <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 text-gray"
                >
                  Email
                </label> */}
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="example@gmail.com"
                  required=""
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value
                    })
                  }
                  value={user.email.toLowerCase()}
                />
              </div>
              <Phone 
                user={user}
                setUser={setUser}
              />

              <div class="relative z-0 w-full mb-5 group">
                {/* <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 text-gray"
                >
                  Password
                </label> */}
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required=""
                  onChange={(e) =>
                    setUser({
                      ...user,
                      password: e.target.value
                    })
                  }
                  value={user.password}
                />
              </div>
              <div class="relative z-0 w-full mb-5 group">
                {/* <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 text-gray"
                >
                  Confirm Password
                </label> */}
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required=""
                  onChange={(e) => setConPass(e.target.value)}
                  value={conPass}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 text-gray-400">
                Have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary-600 hover:underline text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    // </HomeLayout>
  );
};

export default SignUpForm;
