import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface Props {
  post: Post;
}

function Post({ post }: Props ) {
  console.log(post)
  return(
    <main>
      <Header />
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
    }
  }
}