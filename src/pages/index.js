import PublicLayout from "@/HOC/public-layouts/PublicLayout";
import { posts } from "@/assets/data/post-data";
import BlogCardSimple from "@/components/blog-card/BlogCardSimple";
import FeaturedVideo from "@/components/featured-video/FeaturedVideo";
import Hero from "@/components/hero/Hero";
import Mission from "@/components/mission/Mission";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Home = () => {
  const blog_data = posts;
  const { data: session } = useSession();
  console.log(session);
  return (
    <PublicLayout pageTitle={"Home"}>
     <Head>
		<title>Home | Plastic Edu Hub</title>
	 </Head>
      <Hero />
      <Mission />
      <FeaturedVideo />
      <div className='bg-white py-10 sm:py-14'>
        <div className='mx-auto max-w-7xl px-6 lg:px-4 mb-5'>
          {/* <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray sm:text-4xl'>
              Blog
            </h2>
            <p className='mt-2 text-lg leading-8 text-gray'>
              Learn how to grow your business with our expert advice.
            </p>
          </div> */}
          <div className='mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {blog_data.slice(0,3).map((post) => (
              <BlogCardSimple post={post} key={post.id} />
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <Link className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border    focus:z-10 focus:ring-4 focus:ring-gray-200 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700" href="/blog">View All Post</Link>
        </div>
      </div>
      <div className='relative bg-gray-900'>
			<div className='relative h-80 overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2'>
				<img
					className='h-full w-full object-cover'
					src='https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply'
					alt=''
				/>
				<svg
					viewBox='0 0 926 676'
					aria-hidden='true'
					className='absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]'
				>
					<path
						fill='url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)'
						fillOpacity='.4'
						d='m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z'
					/>
					<defs>
						<linearGradient
							id='60c3c621-93e0-4a09-a0e6-4c228a0116d8'
							x1='926.392'
							x2='-109.635'
							y1='.176'
							y2='321.024'
							gradientUnits='userSpaceOnUse'
						>
							<stop stopColor='#776FFF' />
							<stop
								offset={1}
								stopColor='#FF4694'
							/>
						</linearGradient>
					</defs>
				</svg>
			</div>
      {/* Support Our Cause */}
			<div className='relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40'>
				<div className='pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32'>
					<h2 className='text-base font-semibold leading-7 text-indigo-400'>
          Support Our Cause
					</h2>
					<p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
						We’re here to help
					</p>
					<p className='mt-6 text-base leading-7 text-gray-300'>
          Learn how your contributions help people in need, including children and war victims.
					</p>
					<div className='mt-8'>
						<a
							href='#'
							className='inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
						>
							Donate Now
						</a>
					</div>
				</div>
			</div>
		</div>
      {/* <h1>Welcome to Plastic Edu Hub</h1>
      <p>Explore our educational resources for plastic surgery.</p> */}
    </PublicLayout>
  );
};

export default Home;
