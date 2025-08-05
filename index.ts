import express, { Request, Response } from "express";


const app = express();
const PORT = 8000;

app.get("/", (request: Request, response: Response) => {
  response.send("Hello world.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on("error", (error) => {
  throw new Error(error.message);
});
