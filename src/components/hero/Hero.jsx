import heroImg from "@/assets/images/hero.jpg";
import Link from "next/link";
import { useEffect } from "react";
const Hero = () => {
  const getUserList = async () => {
    const response = await fetch("/api/users/user-list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <section className="bg-gray-800 px-4 lg:px-6 py-2.5 text-gray-100">
      <div className="container flex flex-col justify-center p-6 sm:py-12 lg:py-24 lg:flex-row lg:justify-between mx-auto max-w-screen-xl">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h2 className="text-3xl font-bold leadi sm:text-5xl">
            Welcome to Plastic Edu Hub
          </h2>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            Explore our educational resources for plastic surgery.
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            {/* <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900"
            >
              Suspendisse
            </a> */}
            <Link
              rel="noopener noreferrer"
              href="/contact"
              className="px-8 py-3 text-lg font-semibold border rounded border-gray-100"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src={heroImg.src}
            alt=""
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
