"use server";

import Image from "next/image";
import { getEpisode } from "./actions";
import Link from "next/link";

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { air_date, characters, episode, name } = await getEpisode(Number(id));

  return (
    <div className="grid grid-cols-4">
      <div />
      <div className="col-span-2 flex flex-col items-center gap-4">
        <p className="text-md font-bold">
          Episode:{" "}
          <span className="font-thin">
            {episode} {name}
          </span>
        </p>
        <p className="text-md font-bold">
          Air Date: <span className="font-thin">{air_date}</span>
        </p>
        <p className="text-2xl font-bold text-white">Characters</p>
        <div className="grid grid-cols-3 gap-4">
          {characters.map((char) => {
            const { name, image, id } = char;
            return (
              <div
                className="flex flex-col items-center gap-2 border border-white p-4 shadow hover:shadow-white hover:drop-shadow-xl"
                key={id}
              >
                <Image
                  src={image}
                  width={200}
                  height={200}
                  alt="character image"
                />
                <Link href={`/character/${id}`}>
                  <p className="hover:underline">{name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div />
    </div>
  );
}
