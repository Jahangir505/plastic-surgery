import React from 'react'
import visionImg from "@/assets/images/vision.jpg";

const Vision = () => {
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <img
          class="w-full dark:hidden"
          src={visionImg.src}
          alt="dashboard image"
        />

        <div class="mt-4 md:mt-0">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          Our Vision
          </h2>
          <p class="mb-6 text-lg text-gray-500 md:text-lg dark:text-gray-400">
          To be a leading online platform for plastic surgery education and a source of support for those in need.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Vision