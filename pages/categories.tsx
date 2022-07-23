import { GetServerSideProps } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import React, { useState } from "react";
import { Layout, Search, Tag, VerticalItem } from "../components";
import { sanityClient } from "../sanity";
import { Category, Post } from "../typings";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

interface Props {
  posts: Post[];
  categories: Category[];
}

const Categories = ({ posts, categories }: Props) => {
  const [search, setSearch] = useState("");
  return (
    <Layout>
      <Head>
        <title>Medium blog</title>
        <meta
          name="description"
          content="My sanity website for self improvement"
        />
      </Head>
      <div className="flex gap-5 px-10 ">
        <Search search={search} setSearch={setSearch} />

        {search == "" && (
          <div className="hidden md:flex gap-5 ">
            {categories.map((category) => (
              <a
                key={category._id}
                href={`#${category._id}`}
                className="my-auto"
              >
                <p className="font-medium text-xl underline ">
                  {category.title}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
      <article className="px-10">
        {categories
          .filter((category) => {
            if (category.slug.current.includes(search.toLowerCase())) {
              return category;
            }
          })
          .map((category) => (
            <div key={category._id} id={`${category._id}`}>
              <h3 className="text-3xl mt-10 mb-3">
                Posts with category{" "}
                <Link
                  key={category._id}
                  href={{
                    pathname: `/category/[slug]`,
                    query: { slug: category.slug.current },
                  }}
                >
                  <span className="text-green-600 hover:underline cursor-pointer">
                    {category.title}
                  </span>
                </Link>
              </h3>
              <Swiper
                key={category._id}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={30}
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                <div className="flex">
                  {posts.map((post) => {
                    if (
                      post.categories.filter(
                        (e) => e.slug.current === category.slug.current
                      ).length > 0
                    ) {
                      return (
                        <SwiperSlide>
                          <VerticalItem key={post._id} post={post} />
                        </SwiperSlide>
                      );
                    }
                  })}
                </div>
              </Swiper>
            </div>
          ))}
      </article>
    </Layout>
  );
};

export default Categories;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = groq`{"posts":*[_type == "post"]{
    _id,
    title,
    categories[]->{_id,
      title,
      accent,
          slug { 
        current}},
    author->{
    name,
    image,
    slug
  },
  description,
  mainImage,
  slug
    
  },
  "categories":*[_type == "category"]{
    _id,
title,
accent,
    slug { 
  current}
  }}`;

  const { posts, categories } = await sanityClient.fetch(query);

  return {
    props: {
      posts,
      categories,
    },
  };
};
