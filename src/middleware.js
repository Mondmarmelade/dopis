import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
  // console.log("MIDDLEWARE", context.url.pathname);

  const authCookie = context.cookies.get("auth");

  // If not logged in and on login page -> go to login page
  if (!authCookie && context.url.pathname !== "/login") {
    return context.redirect("/login");
  }

  // If on login page and/(but) logged in -> go to index page
  if (authCookie && context.url.pathname === "/login") {
    return context.redirect("/");
  }

  return next();
});
