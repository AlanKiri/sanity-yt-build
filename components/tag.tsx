import Link from "next/link";
import React from "react";

interface Props {
  category: {
    _id: string;
    accent: string;
    title: string;
    slug: { _type: string; current: string };
  };
}

const Tag = ({ category }: Props) => {
  function getContrastYIQ(hexcolor: string) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "text-black" : "text-white";
  }

  return (
    <Link
      href={{
        pathname: `/category/[slug]`,
        query: { slug: category.slug.current },
      }}
    >
      <div
        className={`cursor-pointer tracking-wider flex py-1 px-2 items-center mr-1 rounded-lg ${getContrastYIQ(
          category.accent
        )} `}
        style={{ backgroundColor: category.accent }}
      >
        {category.title}
      </div>
    </Link>
  );
};

export default Tag;
