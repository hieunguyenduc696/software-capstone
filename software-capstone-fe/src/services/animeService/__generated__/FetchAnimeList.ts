/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchAnimeList
// ====================================================

export interface FetchAnimeList_Page_media_title {
  __typename: "MediaTitle";
  /**
   * The official english title
   */
  english: string | null;
}

export interface FetchAnimeList_Page_media_coverImage {
  __typename: "MediaCoverImage";
  /**
   * The cover image url of the media at its largest size. If this size isn't available, large will be provided instead.
   */
  extraLarge: string | null;
}

export interface FetchAnimeList_Page_media {
  __typename: "Media";
  /**
   * The id of the media
   */
  id: number;
  /**
   * Short description of the media's story and characters
   */
  description: string | null;
  /**
   * The official titles of the media in various languages
   */
  title: FetchAnimeList_Page_media_title | null;
  /**
   * The cover images of the media
   */
  coverImage: FetchAnimeList_Page_media_coverImage | null;
}

export interface FetchAnimeList_Page {
  __typename: "Page";
  media: (FetchAnimeList_Page_media | null)[] | null;
}

export interface FetchAnimeList {
  Page: FetchAnimeList_Page | null;
}

export interface FetchAnimeListVariables {
  page: number;
  perPage: number;
}
