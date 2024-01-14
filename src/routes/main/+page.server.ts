import fs from "fs";
import { parse } from "yaml";

export function load() {
    const buffer = fs.readFileSync("src/data/example.yml");
    const string = buffer.toString();

    const jsonYaml = parse(string);
    
    return {jsonYaml}
}