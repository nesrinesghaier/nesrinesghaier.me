import { favicons } from "favicons";
import fs from "node:fs/promises";
import path from "node:path";

const response = await favicons("./src/images/logo.png", {
  path: "/",
  appName: "nesrinesghaier.me",
});

await fs.mkdir("./public", { recursive: true });
await Promise.all(
  [...response.images, ...response.files].map((f) =>
    fs.writeFile(path.join("./public", f.name), f.contents)
  )
);

console.log(response.html.join("\n"));
