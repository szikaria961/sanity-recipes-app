import { sanityClient, urlFor } from '../sanity';
import Head from 'next/head'
import Header from '../components/Header';
import { Post } from '../typings';
import Link from 'next/link';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className='p-5 max-w-7xl mx-auto'>
      <Head>
        <title>Recipes App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className='bg-sky-500 text-white p-10 rounded-lg'>
        <div className='space-y-5'>
          <h2 className='text-3xl max-w-xl font-mono'>
            <span className='text-black'>Ammi's Recipe App</span> serves as a digital repository for my moms's delectable homemade recipes, all conveniently accessible in one place.
          </h2>
          <h3 className='max-w-screen-lg'>
            This application enables me to seamlessly incorporate and refine all of my mom's recipe content through the Sanity CMS, providing her with a platform to showcase her exquisite culinary creations with the wider community.
          </h3>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p6'>
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='border rounded-lg group cursor-pointer overflow-hidden'>
              <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={
                urlFor(post.mainImage).url()!} alt="" />
                <div className='flex justify-between p-5 bg-white'>
                  <div>
                    <p> 
                    <span className='font-bold text-lg'>
                        {post.title} <></>
                      </span> 
                      by {post.author.name}
                    </p>
                    <p>Prep Time: {post.prepTime}</p>
                    <p>Cook Time: {post.cookTime}</p>
                  </div>
                  <img className='h-12 w-12 rounded-full' src={urlFor(post.author.image).url()!} alt="" />
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id, 
    title,
    slug,
    author -> {
      name,
      image
    },
    mainImage,
    cookTime,
    prepTime,
    totalTime,
  }`;

  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  }
}
