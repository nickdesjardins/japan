/* React's <ViewTransition> ships in the canary that Next vendors for the App
   Router (see node_modules/next/dist/compiled/react), but the installed
   @types/react tracks the stable 19.x release and does not declare it yet.
   This augmentation describes only the surface this site actually uses.
   Delete it once @types/react carries the component itself. */

import type { ReactNode, Ref } from "react";

/** A class name, "auto", "none", or a map keyed by transition type — the map
    form is what lets one <ViewTransition> answer to both nav directions. */
type ViewTransitionClass =
  | string
  | { default?: string; [transitionType: string]: string | undefined };

declare module "react" {
  interface ViewTransitionProps {
    children?: ReactNode;
    /** Shared identity across routes: matching names morph into each other. */
    name?: string;
    default?: ViewTransitionClass;
    enter?: ViewTransitionClass;
    exit?: ViewTransitionClass;
    update?: ViewTransitionClass;
    share?: ViewTransitionClass;
    onEnter?: (element: Element, types: string[]) => void;
    onExit?: (element: Element, types: string[]) => void;
    onShare?: (element: Element, types: string[]) => void;
    onUpdate?: (element: Element, types: string[]) => void;
    ref?: Ref<unknown>;
  }

  export const ViewTransition: (props: ViewTransitionProps) => ReactNode;
}
