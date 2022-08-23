import { useCallback, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchRecommendations } from "../lib/supabase";
import locationsHash from "../lib/locationsHash";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import HotRepositories from "./HotRepositories";
import ListRepositories from "./ListRepositories";
import SecondaryNav from "./SecondaryNav";
import { useRepositoriesList } from "../hooks/useRepositoriesList";

export declare interface PostWrapProps {
  textToSearch?: string;
}

const parseLimitValue = (limit: string | null): number => {
  if (!limit) {
    return 25;
  }
  const value = parseInt(limit);

  if (isNaN(value) || value <= 0) {
    return 25;
  }
  if (value > 100) {
    return 125;
  }
  return value;
};

const PostsWrap = ({ textToSearch }: PostWrapProps): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchedData, setFetchedData] = useState<DbRepo[]>([]);
  const repodata = useRepositoriesList();
  const { user } = useSupabaseAuth();
  const location = useLocation();

  console.log(repodata);
  const activeLink = locationsHash[location.pathname] ?? "popular";
  const limit = parseLimitValue(searchParams.get("limit"));

  const handleLoadingMore = () => {
    setSearchParams({ limit: String(limit + 25) });
  };

  const fetchData = useCallback(async () => {
    const data = await fetchRecommendations(activeLink, limit, user, textToSearch);

    setFetchedData(data);
  }, [limit]);

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [activeLink, limit, textToSearch]);

  return (
    <div className="bg-darkestGrey">
      <SecondaryNav
        activeLink={activeLink}
        user={user}
      />

      <HotRepositories />

      <ListRepositories
        activeLink={activeLink}
        fetchedData={fetchedData}
        handleLoadingMore={handleLoadingMore}
        limit={limit}
      />
    </div>
  );
};

export default PostsWrap;
