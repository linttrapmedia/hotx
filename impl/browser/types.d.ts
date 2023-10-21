import { Hotx } from "./Hotx";

export {};
declare global {
  interface Window {
    hotx: Hotx;
  }
}
