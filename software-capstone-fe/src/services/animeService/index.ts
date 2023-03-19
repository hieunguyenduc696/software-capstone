import { apolloClient } from "../../graphql";
import { FETCH_ANIME_LIST } from "./queries";
import { FetchAnimeList } from "./__generated__/FetchAnimeList";

class AnimeService {
  async fetchAnimeList(
    page: number,
    perPage: number = 10
  ): Promise<FetchAnimeList["Page"]> {
    try {
      const response = await apolloClient.query({
        query: FETCH_ANIME_LIST,
        variables: { page, perPage },
      });

      if (!response || !response.data) {
        throw new Error("Some thing went wrong");
      }

      return response.data.Page;
    } catch (error) {
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AnimeService();
