import HomeLayout from "@/HOC/public-layouts/PublicLayout";
import { useEffect, useRef } from "react";

const Library = () => {
  const iframeRef = useRef(null);

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

  return (
    <HomeLayout pageTitle={"Library"}>
      <div className="m-4 overflow-hidden">
        <iframe
          ref={iframeRef}
          src="https://e.pcloud.link/publink/show?code=kZpJFeZTICsqTQRcSmNnag0Kp4EYmCAxKdV"
          width="100%"
          frameBorder="0"
          seamless="seamless"
        ></iframe>
      </div>
    </HomeLayout>
  );
};

export default Library;
