import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { AppContent } from "./App";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </StaticRouter>,
  );
}
