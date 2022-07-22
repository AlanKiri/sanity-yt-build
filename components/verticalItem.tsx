import Link from "next/link";
import React from "react";
import { urlFor } from "../sanity";
import { Post } from "../typings";
import Tag from "./tag";

interface Props {
  post: Post;
}

const VerticalItem = ({ post }: Props) => {
  return (
    <Link
      key={post._id}
      href={{
        pathname: `/post/[slug]`,
        query: { slug: post.slug.current },
      }}
    >
      <div className="border rounded-lg group cursor-pointer overflow-hidden">
        <img
          className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
          src={urlFor(post.mainImage).url()!}
          alt="Main image"
        />
        <div className="flex px-5 py-5 overflow-y-hidden gap-y-5 flex-wrap max-h-14 ">
          {post.categories.map((category) => (
            <Tag key={category._id} category={category} />
          ))}
        </div>
        <div className="flex justify-between px-5 pb-5 bg-white">
          <div className="w-3/4">
            <p className="text-lg font-bold mr-1 whitespace-nowrap">
              {post.title}
            </p>
            <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">
              {post.description} by {post.author.name}
            </p>
          </div>
          <img
            className="h-12 w-12 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt="Author profile picture"
          />
        </div>
      </div>
    </Link>
  );
};

export default VerticalItem;
