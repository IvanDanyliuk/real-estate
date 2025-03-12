import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

export const REFRESH_PATH = "/auth/refresh";
const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

const getAccessTokenOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});

const getRefreshTokenOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
})

type Params = {
  res: Response,
  accessToken: string,
  refreshToken: string,
};

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => {
  return res
    .cookie("accessToken", accessToken, getAccessTokenOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenOptions());
};

export const clearAuthCookies = (res: Response) => {
  return res.clearCookie("accessToken").clearCookie("refreshToken", { path: REFRESH_PATH })
}