export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  categories: {
    title: string;
    accent: string;
    slug: { _type: string; current: string };
    _id: string;
  }[];
  author: {
    name: string;
    image: string;
    slug: { _type: string; current: string };
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  comments: Comment[];
  body: [object];
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

export interface Author {
  _createdAt: string;
  _id: string;
  _type: string;
  _updatedAt: string;
  image: {
    asset: {
      url: string;
    };
  };
  banner: {
    asset: {
      url: string;
    };
  };
  name: string;
  bio: [object];
  slug: {
    _type: string;
    current: string;
  };
}

export interface Category {
  _createdAt: string;
  _id: string;
  _type: string;
  _updatedAt: string;
  accent: string;
  slug: {
    _type: string;
    current: string;
  };
  title: string;
}
