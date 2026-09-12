import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Omniae Launch Email Preview" },
      { name: "description", content: "Preview the Omniae launch email before it goes out." },
      { property: "og:title", content: "Omniae Launch Email Preview" },
      { property: "og:description", content: "Preview the Omniae launch email before it goes out." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmailPreviewPage,
});

function EmailPreviewPage() {
  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("/email/omniae-launch-email.html")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load email preview (${res.status})`);
        }
        return res.text();
      })
      .then(setHtml)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Email preview unavailable</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-muted">
      <iframe
        title="Omniae launch email preview"
        srcDoc={html}
        className="h-full w-full border-0"
        sandbox="allow-same-origin"
      />
    </div>
  );
}
