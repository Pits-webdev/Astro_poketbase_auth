import PocketBase from "pocketbase";

export const onRequest = async ({ locals, request }, next) => {
  locals.test = "test1";

  locals.pb = new PocketBase("http://127.0.0.1:8090");

  locals.pb.authStore.loadFromCookie(request.headers.get("cookie") || "");
  //console.log(locals.pb.authStore.isValid);
  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    locals.pb.authStore.isValid &&
      (await locals.pb.collection("users").authRefresh());
  } catch (_) {
    // clear the auth store on failed refresh
    locals.pb.authStore.clear();
  }

  // return a Response or the result of calling `next()`

  const response = await next();

  // send back the default 'pb_auth' cookie to the client with the latest store state
  response.headers.append("set-cookie", locals.pb.authStore.exportToCookie());

  return response;
};
