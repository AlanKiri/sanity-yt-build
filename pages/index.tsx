import { GetServerSideProps } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import { Layout, VerticalItem } from "../components";
import { sanityClient } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  console.log(posts);
  return (
    <Layout>
      <Head>
        <title>Medium blog</title>
        <meta
          name="description"
          content="My sanity website for self improvement"
        />
      </Head>
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write, read, and connect
          </h1>
          <h2>
            It&apos;s easy and free to post your thinking on any topic and
            connect with millions of readers.{" "}
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="Medium logo"
        />
      </div>
      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <VerticalItem post={post} key={post._id} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = groq`*[_type == "post"]{
    _id,
    title,
    categories[]->{title, accent,slug, _id},
    author->{
    name,
    image,
    slug
  },
  description,
  mainImage,
  slug
    
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
