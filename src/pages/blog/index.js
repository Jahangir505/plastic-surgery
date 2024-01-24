import PublicLayout from "@/HOC/public-layouts/PublicLayout";
import { posts } from "@/assets/data/post-data";
import BlogCard from "@/components/blog-card/BlogCardOverlay";




const Blog = () => {
  const post_items = posts;
  return (
    <PublicLayout pageTitle={"Blog"}>
      <div className='bg-teal-800 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Blog
            </h2>
            <p className='mt-2 text-lg leading-8 text-white'>
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className='mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {post_items.map((post) => (
              <BlogCard post={post} key={post.id} />
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Blog;
