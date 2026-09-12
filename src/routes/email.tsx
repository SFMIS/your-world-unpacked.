import { createFileRoute } from "@tanstack/react-router";

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
  return (
    <div className="h-screen w-full bg-muted">
      <iframe
        title="Omniae launch email preview"
        src="/email/omniae-launch-email.html"
        className="h-full w-full border-0"
      />
    </div>
  );
}
