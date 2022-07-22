import Link from "next/link";
import React from "react";
import { urlFor } from "../sanity";
import { Post } from "../typings";
import Tag from "./tag";

interface Props {
  post: Post;
}

const HorizontalItem = ({ post }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row ">
      <img
        src={urlFor(post.mainImage).url()!}
        alt="Main image"
        className="w-full sm:w-60 mr-5"
      />
      <div className="flex flex-col">
        <div className="flex py-5 sm:p-0 overflow-y-hidden gap-y-5 flex-wrap max-h-14 sm:max-h-8 ">
          {post.categories.map((category) => (
            <Tag key={category._id} category={category} />
          ))}
        </div>
        <div className="flex items-end mr-5">
          <Link
            key={post._id}
            href={{
              pathname: `/post/[slug]`,
              query: { slug: post.slug.current },
            }}
          >
            <p className="text-xl font-medium mr-1 whitespace-nowrap cursor-pointer hover:underline">
              {post.title}
            </p>
          </Link>
          <Link
            href={{
              pathname: `/author/[slug]`,
              query: { slug: post.author.slug.current },
            }}
          >
            <>
              <p className="text-base whitespace-nowrap overflow-hidden text-ellipsis mr-1 ">
                by{" "}
                <span className="cursor-pointer hover:underline">
                  {post.author.name}
                </span>
              </p>
              <img
                className="h-6 w-6 rounded-full cursor-pointer"
                src={urlFor(post.author.image).url()!}
                alt="Author profile picture"
              />
            </>
          </Link>
        </div>
        <p className="flex max-h-12 text-ellipsis overflow-hidden">
          {post.description}
        </p>
      </div>
    </div>
  );
};

export default HorizontalItem;
