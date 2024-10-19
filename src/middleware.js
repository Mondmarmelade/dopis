import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
  console.log("MIDDLEWARE");

  if (context.url.pathname === "/login") {
    return next(); //Let the login page "pass" the middleware to not create a loop
  }

  if (context.cookies.get("auth") !== undefined) {
    return next();
  } else {
    return context.rewrite(
      new Request(new URL("/login", context.url), {
        headers: {
          "x-redirect-to": context.url.pathname,
        },
      })
    );
  }
});
