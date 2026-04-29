import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="/silktide/silktide-consent-manager.css"
          />
          <link
            rel="stylesheet"
            href="/silktide/silktide-ftn-overrides.css"
          />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          <script src="/silktide/silktide-consent-manager.js" />
          <script src="/silktide/silktide-consent-init.js" />
          {scripts}
        </body>
      </html>
    )}
  />
));
