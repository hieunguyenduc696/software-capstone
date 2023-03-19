import React from "react";
import { IconType } from "react-icons";
import { TKeyPermission, TPortalPages } from "types/models";
import { TranslationKey } from "types/i18n";

export interface IError {
  name: string;
  message: string;
  messageForm: TMessageErrors;
  stack?: string;
}

export type TObject =
  | {
      [key: string]: string | boolean | null | undefined;
    }
  | null
  | undefined;

export type TPaginationBasicPayload = {
  page: number;
  limit: number;
};

export type TPaginationResponse<T> = {
  data: T;
  total: number;
};

export type TMessageError = {
  [key: string]: string[];
};

export type TApiErrors = {
  statusCode: number;
  message: TMessageError[];
};

export type TMessageErrors = {
  statusCode: number;
  message: TMessageError[];
};

export type TResponseCreateUpdate = {
  id: string;
};

export type TModal = {
  title?: string;
  text?: string;
  okText?: string;
  visible?: boolean;
  onAction?:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
};

export type TMenu = {
  key: string;
  icon?: IconType;
  label: TranslationKey;
  breadcrumb?: string;
  children?: TMenu[];
  page?: TPortalPages;
  permission?: TKeyPermission;
};

export type TOptionSelect = {
  name: string;
  value: string;
  [key: string]: string;
};

export type TCurrency = {
  languageCode: string;
  currency: string;
  symbol?: string;
};
