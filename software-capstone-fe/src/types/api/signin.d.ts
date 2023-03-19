import { TUserType } from "types/models";

export type TSignInPayloadRequest = {
  identifier: string;
  password: string;
  isRemember: boolean;
};

export type TSignInPayloadResponse = {
  jwt: string;
  user: TUserType;
};
