"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Character } from "rickmortyapi";
import { getCharactersByQuery } from "../../actions";
import { useSearchParams } from "next/navigation";
import { useDataStore } from "../../store/index";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

interface InfiniteScrollProps {
  initialData: Character[];
  initialSearchName: string;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  initialData,
  initialSearchName,
}) => {
  const searchParams = useSearchParams();
  const { data, setData, setLoading, setError, filter, favorites } =
    useDataStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setData(initialData);
  }, [initialData, setData]);

  useEffect(() => {
    const name = searchParams.get("name") || initialSearchName;
    const page = parseInt(searchParams.get("page") || "1");

    const loadInitialData = async () => {
      setLoading(true);
      try {
        const newData = await getCharactersByQuery(page, name);
        setData(newData);
        setCurrentPage(page);
        setHasMore(newData.length > 0);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch data",
        );
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [searchParams, initialSearchName, setData, setLoading, setError]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const name = searchParams.get("name") || initialSearchName;
      const nextPage = currentPage + 1;
      const newData = await getCharactersByQuery(nextPage, name);

      if (newData.length === 0) {
        setHasMore(false);
        return;
      }

      setData([...data, ...newData]);
      setCurrentPage(nextPage);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch more data",
      );
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    currentPage,
    data,
    initialSearchName,
    isLoadingMore,
    hasMore,
    searchParams,
    setData,
    setError,
  ]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const scrollThreshold = 200;

    const handleScroll = () => {
      if (timeoutId || isLoadingMore || !hasMore) return;

      const isNearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - scrollThreshold;

      if (isNearBottom) {
        timeoutId = setTimeout(() => {
          loadMore();
          timeoutId = null;
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loadMore, isLoadingMore, hasMore]);

  const filteredData = useMemo(() => {
    const { gender, species, type, favorites: favoritesIndicator } = filter;

    return data.filter((character) => {
      const matchesGender = !gender || character.gender === gender;
      const matchesType =
        !type ||
        (character.type?.toLowerCase() || "").includes(type.toLowerCase());
      const matchesSpecies =
        species.length === 0 || species.includes(character.species);

      const matchesFavorites =
        !favoritesIndicator || favorites.some((fav) => fav.id === character.id);

      return matchesGender && matchesType && matchesSpecies && matchesFavorites;
    });
  }, [data, filter, favorites]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      {isLoadingMore && <LoadingIndicator />}
    </div>
  );
};

const CharacterCard: React.FC<{
  character: Character;
}> = ({ character }) => {
  const { addToFavorites, removeFromFavorites, favorites } = useDataStore();
  const handleChangeFavs = (character: Character) => {
    if (favorites.some((char) => char.id === character.id)) {
      removeFromFavorites(character.id);
    } else {
      addToFavorites(character);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border p-4 transition-shadow hover:shadow-lg">
      <Image
        width={200}
        height={200}
        alt={`${character.name} image`}
        src={character.image}
        className="rounded-md"
      />
      <Link
        href={`character/${character.id}`}
        className="text-lg font-semibold hover:underline"
      >
        {character.name}
      </Link>
      <div className="space-y-1 text-white">
        <p>Type: {character.type || "Unknown"}</p>
        <p>Gender: {character.gender}</p>
        <p>Species: {character.species}</p>
      </div>

      <div
        onClick={() => handleChangeFavs(character)}
        className="cursor-pointer"
      >
        <Heart
          className={`${favorites.some((fav) => fav.id === character.id) ? `fill-white` : null}`}
        />
      </div>
    </div>
  );
};

const LoadingIndicator: React.FC = () => (
  <div className="flex justify-center py-4">
    <p className="text-gray-500">Loading more characters...</p>
  </div>
);
