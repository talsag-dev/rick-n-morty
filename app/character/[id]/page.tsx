import Image from "next/image";
import { getCharacter } from "./actions";
import Link from "next/link";

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const {
    episode,
    gender,
    image,
    location,
    name,
    origin,
    species,
    status,
    type,
  } = await getCharacter(Number(id));

  return (
    <>
      <div className="grid grid-cols-4">
        <div />
        <div className="col-span-2">
          <div className="flex flex-col items-center gap-6">
            <p className="text-3xl font-bold text-white">{name}</p>

            <Image alt="Character Image" height={200} width={200} src={image} />

            <p>
              <span className="font-bold">Status :</span> {status}
            </p>
            <p>
              <span className="font-bold">Gender :</span> {gender}
            </p>
            <p>
              <span className="font-bold">Location :</span> {location.name}
            </p>
            <p>
              <span className="font-bold">Origin :</span> {origin.name}
            </p>
            {type && (
              <p>
                <span className="font-bold">Type :</span> {type}
              </p>
            )}
            <p>
              <span className="font-bold">Specie :</span> {species}
            </p>
            <div className="mt-8 grid grid-cols-4 gap-4">
              {episode.map((ep, index) => {
                const episodeNumber = ep.split("/").at(-1);
                return (
                  <Link
                    key={index}
                    href={`/episode/${episodeNumber}`}
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-gray-700 p-4 transition hover:bg-gray-800"
                  >
                    <p className="text-lg font-semibold text-white">
                      Episode {episodeNumber}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div />
      </div>
    </>
  );
}
