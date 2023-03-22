import { sanityClient } from '../sanity';
import Head from 'next/head'
import Header from '../components/Header';
import { Post } from '../typings';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <div className="p-5 max-w-7xl mx-auto">
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
    </div>
  )
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
