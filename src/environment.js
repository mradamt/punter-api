import { resolve } from "path";
import { config } from "dotenv";

const ENV = process.env.NODE_ENV || "development";
const PATH = resolve(__dirname, "../.env." + ENV);

config({ path: PATH });

export default ENV;
