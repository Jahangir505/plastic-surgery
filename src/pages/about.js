import PublicLayout from "@/HOC/public-layouts/PublicLayout";

import bgImg from "@/assets/images/plastic.jpg";
import Vision from "@/components/vision/Vision";

const About = () => {
  return (
    <PublicLayout pageTitle={"About"}>
      <div>
        <div
          className="py-34 sm:py-32 lg:pb-40"
          style={{ background: `url(${bgImg.src})`, backgroundSize: "cover" }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Who We Are
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                PlasticEduHub is a non-profit organization dedicated to
                providing educational resources in plastic surgery and
                supporting humanitarian causes.
              </p>
            </div>
          </div>
        </div>
        <Vision />
      </div>
    </PublicLayout>
  );
};

export default About;
