import { gql } from "@apollo/client";

export const FETCH_ANIME_LIST = gql`
  query FetchAnimeList($page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
      media {
        id
        description
        title {
          english
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;
