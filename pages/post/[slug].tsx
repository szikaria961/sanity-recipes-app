import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface Props {
  post: Post;
}

function Post({ post }: Props ) {
  return(
    <main>
      <Header />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mx-10 mb-3">{post.title}</h1>
        <h2>Prep Time: {post.prepTime}</h2>
        <h2>Cook Time: {post.cookTime}</h2>
        <div>
          <PortableText dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} 
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} 
          content={post.body} />
        </div>
      </article>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id, 
    slug {
      current
    }
  }`

  const posts = await sanityClient.fetch(query);
  
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current
    }
  }))

  return { 
    paths,
    fallback: "blocking" // says 404 if page doesn't exists
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id, 
    _createdAt,
    title,
    slug,
    body,
    author -> {
      name,
      image
    },
    mainImage,
    cookTime,
    prepTime,
    totalTime,
  }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60, //updates old cache every 60 sec
  }
}