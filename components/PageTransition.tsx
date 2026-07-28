import { ViewTransition } from "react";
import type { ReactNode } from "react";

/* Every chapter enters and leaves through this. The map form answers to the
   transition type the link carried: "nav-forward" slides the old chapter left
   and brings the new one in from the right, "nav-back" mirrors it.

   `default: "none"` is what keeps a first load, a reload or a browser back
   button silent — those navigations carry no type, and animating them would
   mean the page slides for no reason the reader can account for. */
const DIRECTIONAL = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={DIRECTIONAL} exit={DIRECTIONAL} default="none">
      {/* A single element to hang the transition name on — React needs one
          host node to snapshot, and the chapters below are several. */}
      <div>{children}</div>
    </ViewTransition>
  );
}
