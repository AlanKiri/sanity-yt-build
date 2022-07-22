import { GetServerSideProps } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import Link from "next/link";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Layout, VerticalItem } from "../components";
import { sanityClient } from "../sanity";
import { Author, Post } from "../typings";

interface Props {
  posts: Post[];
  authors: Author[];
}

const Authors = ({ posts, authors }: Props) => {
  return (
    <Layout>
      <Head>
        <title>Medium blog</title>
        <meta
          name="description"
          content="My sanity website for self improvement"
        />
      </Head>
      <article className="px-10">
        {authors.map((author) => {
          return (
            <>
              <h3 className="text-3xl mt-10 mb-3">
                Posts by{" "}
                <Link
                  key={author._id}
                  href={{
                    pathname: `/author/[slug]`,
                    query: { slug: author.slug.current },
                  }}
                >
                  <span className="text-green-600 hover:underline cursor-pointer">
                    {author.name}
                  </span>
                </Link>
              </h3>
              <Swiper
                key={author._id}
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
                    if (post.author.slug.current == author.slug.current) {
                      return (
                        <SwiperSlide>
                          <VerticalItem key={post._id} post={post} />
                        </SwiperSlide>
                      );
                    }
                  })}
                </div>
              </Swiper>
            </>
          );
        })}
      </article>
    </Layout>
  );
};

export default Authors;

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
  "authors":*[_type == "author"]{
    _createdAt,
    _id,
    _type,
    _updatedAt,
    bio,
    image,
    banner,
    name,
    slug
  }}`;

  const { posts, authors } = await sanityClient.fetch(query);

  return {
    props: {
      posts,
      authors,
    },
  };
};
