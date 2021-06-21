import fs from "fs";

export const alifExample0 = fs.readFileSync(__dirname + "/0.ألف", "utf8");
export const alifExample1 = fs.readFileSync(__dirname + "/1.ألف", "utf8");
export const alifExample2 = fs.readFileSync(__dirname + "/2.ألف", "utf8");

export default [alifExample0, alifExample1, alifExample2];
