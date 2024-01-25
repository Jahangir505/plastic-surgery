import HomeLayout from "@/HOC/public-layouts/PublicLayout";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Link from "next/link";

const Library = () => {
  const { data: session, status } = useSession();
  const iframeRef = useRef(null);
  console.log("Session", session);
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight - 355;
      console.log(windowHeight);
      // Adjust the height of the iframe to the window height (or any other logic you prefer)
      if (iframeRef.current) {
        iframeRef.current.style.height = `${windowHeight}px`;
        iframeRef.current.style.overflow = `hidden`;
      }
    };

    // Set initial height
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (status === "loading") {
    return (
      <HomeLayout pageTitle={"Library"}>
        <div class="h-screen w-screen bg-gray-300 flex items-center">
          <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
            <div class="max-w-lg">
              <h2>Loading....</h2>
            </div>
            <div class="max-w-md"></div>
          </div>
        </div>
      </HomeLayout>
    );
  }

  console.log(typeof session === "undefined", session === null);

  if (typeof session === "undefined" || session === null) {
    return (
      <HomeLayout pageTitle={"Library"}>
        <div class="h-96 w-screen bg-gray-300 flex items-center">
          <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
            <div class="max-w-lg">
              <div class="text-5xl text-red-800 font-bold">401</div>
              <p class="text-2xl md:text-3xl text-red-800 leading-normal">
                Sorry you are not authenticated user.{" "}
              </p>
              <p class="mb-8">Please login first and try again</p>

              <Link
                href="/auth/login"
                class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
              >
                Go to Login
              </Link>
            </div>
            <div class="max-w-md"></div>
          </div>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout pageTitle={"Library"}>
      {session.user.roles === "Subscriber" ? (
        <div className="m-4 overflow-hidden">
          <iframe
            ref={iframeRef}
            src="https://e.pcloud.link/publink/show?code=kZpJFeZTICsqTQRcSmNnag0Kp4EYmCAxKdV"
            width="100%"
            frameBorder="0"
            seamless="seamless"
          ></iframe>
        </div>
      ) : (
        <div class="h-96 w-screen bg-gray-300 flex items-center">
          <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
            <div class="max-w-lg">
              <div class="text-5xl text-red-800 font-bold">Ops!</div>
              <p class="text-2xl md:text-3xl text-red-800 font-light leading-normal">
                Sorry you are not Subscriber.
              </p>
              <p class="mb-8">You can not access this page. Please subscribe first and try again</p>

              <Link
                href="/auth/login"
                class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
              >
                Subscribe
              </Link>
            </div>
            <div class="max-w-md"></div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
};

export default Library;
