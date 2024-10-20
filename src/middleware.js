import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
  console.log("MIDDLEWARE");

  const authCookie = context.cookies.get("auth");

  if (authCookie) {
    // User session exists, allow navigation to the requested page
    return next();
  } else {
    // User session does not exist, redirect to the login page
    if (context.url.pathname !== "/login") {
      return context.rewrite(
        new Request(new URL("/login", context.url), {
          headers: {
            "x-redirect-to": context.url.pathname,
          },
        })
      );
    }
  }

  return next();
});
