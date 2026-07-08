import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">გვერდი ვერ მოიძებნა</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center border border-[var(--gold)] px-5 py-2 text-sm text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition">
            მთავარი
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">გვერდის ჩატვირთვა ვერ მოხერხდა</h1>
        <div className="mt-6">
          <button onClick={() => { router.invalidate(); reset(); }} className="border border-[var(--gold)] px-5 py-2 text-sm text-[var(--gold)]">
            თავიდან ცდა
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Car Studio Detailing" },
      { name: "description", content: "პროფესიონალური პოლირება, კერამიკული დაფარვა და სალონის დეტეილინგი თბილისში. Car Studio — შედეგი, რომელიც ჩანს." },
      { name: "author", content: "Car Studio Detailing" },
      { property: "og:title", content: "Car Studio Detailing" },
      { property: "og:description", content: "პროფესიონალური პოლირება, კერამიკული დაფარვა და სალონის დეტეილინგი თბილისში. Car Studio — შედეგი, რომელიც ჩანს." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Car Studio Detailing" },
      { name: "twitter:description", content: "პროფესიონალური პოლირება, კერამიკული დაფარვა და სალონის დეტეილინგი თბილისში. Car Studio — შედეგი, რომელიც ჩანს." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/53876136-92b9-4ade-9ccf-312c65965bf8/id-preview-675c9db9--70fe7296-ec49-40ae-bb17-39e99d26e814.lovable.app-1783420435043.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/53876136-92b9-4ade-9ccf-312c65965bf8/id-preview-675c9db9--70fe7296-ec49-40ae-bb17-39e99d26e814.lovable.app-1783420435043.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Noto+Serif+Georgian:wght@400;500;600;700&family=Noto+Sans+Georgian:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ka">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
