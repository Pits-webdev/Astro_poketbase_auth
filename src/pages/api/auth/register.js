/* import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

//REGISTER a New USER
export const POST = async ({ params, request }) => {
  const formData = await request.json();
  const newUser = await pb.collection("users").create(formData);

  return new Response(
    JSON.stringify(newUser, {
      msg: "User created",
    }),
    { status: 200 }
  );
}; */
