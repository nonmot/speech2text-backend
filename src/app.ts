import express, { Request, Response } from "express";


const app = express();
const PORT = 8000;

app.get("/", (request: Request, response: Response) => {
  response.send("Hello world.");
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
