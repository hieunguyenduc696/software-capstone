import axios from "axios";
import { appConfig } from "config";
import { Moment } from "moment";
import queryString from "query-string";
import { RangeValue } from "rc-picker/lib/interface";
import { TObject } from "types";

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const saveStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const saveAccount = (email: string, password: string) => {
  const str = window.btoa(`${email}_${password}`);
  saveStorage("RM", str);
};

export const loadAccount = (): {
  identifier: string;
  password: string;
} | null => {
  let str = getStorage("RM");
  if (str) {
    str = window.atob(str);
    const temp = str.split("_");
    return temp.length === 2
      ? { identifier: temp[0], password: temp[1] }
      : null;
  }

  return null;
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const parseUrl = (url: string) => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params: { [key: string]: string } = {};
  let match;
  while ((match = regex.exec(url))) {
    if (match[1]) {
      params[match[1]] = match[2] || "";
    }
  }
  return params;
};
export const getRandomArrayString = (list: string[]): string => {
  const index = Math.floor(Math.random() * list.length);
  return list[index] || "";
};

export const timer = (ms: number, isRandom: boolean) =>
  new Promise((res) => {
    if (isRandom) {
      setTimeout(res, getRandomInt(500, 700));
    } else {
      setTimeout(res, ms);
    }
  });

export const safeParseJson = (data: string): TObject => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

export const safeParseJsonType = <T extends {}>(data: string): T => {
  return JSON.parse(data);
};

export const serializeObject = function (obj: TObject): string {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p] || ""));
    }
  return str.join("&");
};

export const copyValueFromHTML = (value: string | number): void => {
  const el = document.createElement("textarea");
  el.value = `${value}`;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const sleepNext = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const firstCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getRangeOfHeader = (range: string) => {
  const matches = /([A-Z]+)([0-9]+):([A-Z]+)([0-9]+)/.exec(range.toUpperCase());
  if (
    matches &&
    matches.length &&
    matches[1] &&
    matches[2] &&
    matches[3] &&
    matches[4]
  ) {
    return `${matches[1]}${parseInt(matches[4]) + 1}`;
  }
  return "A1";
};

export const shortNumber = (n: number): string => {
  function round(n: number, precision: number) {
    const prec = Math.pow(10, precision);
    return Math.round(n * prec) / prec;
  }

  var abbrev = "kmb";
  var base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000));
  var suffix = abbrev[Math.min(2, base - 1)];
  base = abbrev.indexOf(suffix) + 1;
  return suffix ? round(n / Math.pow(1000, base), 2) + suffix : "" + n;
};

export const randomString = (length: number): string => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const setRedirectUrl = (): string => {
  const { pathname } = window.location;

  return `redirect_url=${pathname}`;
};

export const getRedirectUrl = (): string => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  return urlSearchParams.get("redirect_url") || "/";
};

export const getValidRedirectUrl = (): string => {
  const queryUrl = queryString.parseUrl(window.location.href);

  if (
    queryUrl.query?.redirect_url &&
    typeof queryUrl.query.redirect_url === "string" &&
    window.location.href.indexOf(queryUrl.query.redirect_url) >= 0
  ) {
    return queryUrl.query.redirect_url.replace(window.location.origin, "");
  }

  return "";
};

export const addHyphen = (value: string): string => {
  if (value.indexOf("-") >= 0) {
    return value;
  }

  let newValue = "";
  let count = 1;

  for (let i = 0, len = value.length; i < len; i++, count++) {
    newValue += `${value[i]}`;
    if (count % 3 === 0) {
      newValue += `-`;
    }
  }

  return newValue.substr(0, newValue.length - 1);
};

export const delay = async (seconds: number) =>
  new Promise((r) => setTimeout(r, seconds));

export const copyToClipBoard = (text: string): void => {
  navigator.clipboard.writeText(text);
};

export const getImagesFromHTML = (htmlString: string): string[] => {
  if (!htmlString) return [];

  const regex = new RegExp('(?<=src=")[^"]+(?=")', "gm");

  return htmlString.match(regex) || [];
};

export const getFileName = (urlString: string): string => {
  if (!urlString) return "";

  return urlString.substring(urlString.lastIndexOf("/") + 1);
};

export const composeInitials = (string?: string, delimeter: string = " ") => {
  if (!string) {
    return "";
  }

  const stringArray = string.split(delimeter);
  let initials = stringArray[0].substring(0, 1).toUpperCase();

  if (stringArray.length > 1) {
    initials += stringArray[stringArray.length - 1]
      .substring(0, 1)
      .toUpperCase();
  }
  return initials;
};

export const isNumeric = (str: string) => {
  if (typeof str !== "string") return false;
  return !isNaN(parseFloat(str));
};

export const downloadURI = (uri: string, name: string): void => {
  axios({
    url: uri,
    method: "GET",
    responseType: "blob",
  }).then((response: any) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

export const copyContent = (value: string) => {
  const el = document.createElement("textarea");
  el.value = value;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const downloadURIByDom = (uri: string, name: string): void => {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const checkDisabledDateRange = (
  current: Moment,
  dateRange?: RangeValue<Moment>
): boolean => {
  if (current && dateRange && dateRange.length) {
    return !!(
      (dateRange[0] && current < dateRange[0]) ||
      (dateRange[1] && current > dateRange[1])
    );
  }

  return false;
};

export const getImageLink = (name: string) => {
  return `${appConfig.IMAGE_URL}${name}`;
};
