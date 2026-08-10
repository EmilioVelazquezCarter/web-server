import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readingsRouter from "./routes/readings-routes.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;



const cities = [
  { id: 1, name: "Minneapolis", state: "MN" },
  { id: 2, name: "Toronto", state: "ON" },
  { id: 3, name: "Detroit", state: "MI" },
  { id: 4, name: "New York City", state: "NY" },
  { id: 5, name: "Scranton", state: "PA" }
];


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "Air Quality Watch", version: "1.0" });
});

app.get("/status", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/cities", (req, res) => {
  res.json(cities);
});

app.get("/cities/:id", (req, res) => {
  const cityId = parseInt(req.params.id);
  const city = cities.find((city) => city.id === cityId);

  if (!city) {
    return res.status(404).json({ error: "City not found" });
  }

  res.json(city);
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { cities });
});

app.use("/readings", readingsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
