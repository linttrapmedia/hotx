import { Hotx } from "./hotx/runtime/Hotx";

export {};
declare global {
  interface Window {
    hotx: Hotx;
  }
}
