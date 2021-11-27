import { Joke } from "@prisma/client";
import { Link } from "react-router-dom";

import { LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Joke | null };

export let loader: LoaderFunction = async ({ params }) => {
  let joke = await db.joke.findUnique({ where: { id: params?.jokeId } });
  if (!joke) throw new Error("Joke not found");
  let data: LoaderData = { joke };
  return data;
};

export default function JokeRoute() {
  let { joke } = useLoaderData<LoaderData>();
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{joke?.content}</p>
      <Link to=".">{joke?.name}</Link>
    </div>
  );
}
