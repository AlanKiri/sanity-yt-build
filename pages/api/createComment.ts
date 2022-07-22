import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

const createComment = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { _id, name, email, comment } = JSON.parse(request.body);

  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Couldn't submit comment", error });
  }
  return response.status(200).json({ message: "Commited successfully" });
};

export default createComment;
