import { Icon } from ".nuxt/components";
import { OperatingSystem } from "@/types";
import { Component } from "nuxt/schema";

export const getOperatingSystem = (): [OperatingSystem, string] => {
  // use the navigator object to parse the user agent and return the OS
  const userAgent =
    navigator.userAgent || navigator.vendor || (<any>window).opera;
  if (userAgent.includes("Windows")) return ["Windows", "uil:windows"];
  if (userAgent.includes("Mac")) return ["Mac", "uil:apple-alt"];
  if (userAgent.includes("Linux")) return ["Linux", "uil:linux"];
  if (userAgent.includes("Android")) return ["Android", "uil:android-alt"];
  if (userAgent.includes("iOS")) return ["iOS", "uil:apple-alt"];
  throw new Error("Could not detect operating system");
};
