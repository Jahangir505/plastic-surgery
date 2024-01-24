import React from "react";
import missionImg from "@/assets/images/mission.jpg";

const Mission = () => {
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <img
          class="w-full dark:hidden"
          src={missionImg.src}
          alt="dashboard image"
        />

        <div class="mt-4 md:mt-0">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
            Our Mission
          </h2>
          <p class="mb-6 text-lg text-gray-500 md:text-lg dark:text-gray-400">
            To provide high-quality educational resources for students and
            professionals in plastic surgery, and to support those in need
            through our non-profit initiatives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
