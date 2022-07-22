import { GetStaticProps } from "next";
import React from "react";
import { HorizontalItem, Layout } from "../../components";
import { sanityClient } from "../../sanity";
import { Category, Post } from "../../typings";

interface Props {
  posts: Post[];
  category: Category;
}

const Category = ({ category, posts }: Props) => {
  console.log(category, posts);
  return (
    <Layout>
      <article className="max-w-3xl mx-auto p-2 md:p-6 mb-10">
        <h1 className="text-3xl mt-10 mb-3">
          Posts with{" "}
          <span className="lowercase text-green-600">{category.title}</span>{" "}
          category
        </h1>
        <div className="grid grid-cols-1 gap-3 md:gap-6">
          {posts.map((post) => (
            <HorizontalItem post={post} key={post._id} />
          ))}
        </div>
      </article>
    </Layout>
  );
};

export default Category;

export const getStaticPaths = async () => {
  const query = `*[_type == "category"]{
        _id,
        slug { 
      current}
      }`;
  const categories = await sanityClient.fetch(query);

  const paths = categories.map((category: Category) => ({
    params: {
      slug: category.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryPosts = `*[_type == "post" && $slug in categories[]->slug.current  ]{
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

  const posts = await sanityClient.fetch(queryPosts, {
    slug: params?.slug,
  });

  const queryCategory = `*[_type=="category" && slug.current == $slug][0]{
      _createdAt,
      _id,
      _type,
      _updatedAt,
      title,
      slug,
      accent,
    }`;

  const category = await sanityClient.fetch(queryCategory, {
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
      category,
    },
    revalidate: 60,
  };
};
