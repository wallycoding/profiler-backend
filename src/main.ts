import "magic-env/use";
import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3000, () => {
  console.log("RUNNING", process.env.PORT);
});
