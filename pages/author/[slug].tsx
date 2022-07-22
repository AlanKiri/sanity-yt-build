import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Layout from "../../components/layout";
import { sanityClient, urlFor } from "../../sanity";
import { Author, Post } from "../../typings";
import PortableText from "react-portable-text";
import { VerticalItem } from "../../components";

interface Props {
  posts: Post[];
  author: Author;
}

const Author = ({ author, posts }: Props) => {
  return (
    <Layout>
      <img
        className="w-full h-40 object-cover"
        src={urlFor(author.banner).url()}
        alt="Main image"
      />
      <article className="max-w-3xl mx-auto p-2 md:p-6 mb-10">
        <h1 className="text-3xl mt-10 mb-3">{author.name}</h1>
        <div className="bg-yellow-500/10 p-2 rounded-lg">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={author.bio}
            serializers={{
              h1: (props: any) => {
                <h1 className="text-2xl font-bold my-5" {...props} />;
              },
              h2: (props: any) => {
                <h2 className="text-xl font-bold my-5" {...props} />;
              },
              li: ({ children }: any) => {
                <li className="ml-4 list-disc">{children}</li>;
              },
              link: ({ href, children }: any) => {
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>;
              },
            }}
          />
        </div>
        <h3 className="mt-10 text-2xl mb-3">{author.name}&apos;s posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
          {posts.map((post) => (
            <VerticalItem post={post} key={post._id} />
          ))}
        </div>
      </article>
    </Layout>
  );
};

export default Author;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "author"]{
          _id,
          slug { 
        current}
        }`;
  const authors = await sanityClient.fetch(query);

  const paths = authors.map((author: Author) => ({
    params: {
      slug: author.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryPosts = `*[_type == "post" &&  author->slug.current == $slug]{
  _createdAt,
  _id,
  title,
  mainImage,
  slug,
  categories[]->{title, accent,slug, _id},
  description,
  author-> {
  image,
  name,
  slug
}
}`;

  const posts = await sanityClient.fetch(queryPosts, {
    slug: params?.slug,
  });

  const queryAuthor = `*[_type=="author" && slug.current == $slug][0]{
    _createdAt,
    _id,
    _type,
    _updatedAt,
    bio,
    image,
    banner,
    name,
    slug
  }`;

  const author = await sanityClient.fetch(queryAuthor, {
    slug: params?.slug,
  });

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      author,
    },
    revalidate: 60,
  };
};
