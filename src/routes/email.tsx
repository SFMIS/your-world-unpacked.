import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/email/omniae-launch-email.html")
      .then((res) => {
        if (!res.ok) throw new Error(`Email HTML request failed: ${res.status}`);
        return res.text();
      })
      .then((html) => {
        if (cancelled || !iframeRef.current) return;
        iframeRef.current.srcdoc = html;
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="h-screen w-full bg-muted">
      {failed ? (
        <iframe
          title="Omniae launch email preview"
          src="/email/omniae-launch-email.html"
          className="h-full w-full border-0"
        />
      ) : (
        <iframe
          ref={iframeRef}
          title="Omniae launch email preview"
          className="h-full w-full border-0 bg-white"
        />
      )}
    </div>
  );
}
