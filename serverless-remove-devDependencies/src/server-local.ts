import { app } from "./app";

export const server = app.listen(4000, () =>
  console.log(`Server started on port: 4000`)
);
