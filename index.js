#!/usr/bin/env node
const { program } = require("commander");
const puppeteer = require("puppeteer");

program.version("0.1.0")
  .arguments("<url>")
  .option("--width <width>", "Page width in real units.")
  .option("--height <height>", "Page height in real units.")
  // TODO impelement --page-size with well known page sizes of puppeteer

program.parse(process.argv);
console.log(program.opts())

let url = program.args[0]
let width = program.width
let height = program.height;


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: "networkidle2"});
  process.stdout.write(await page.pdf({format: null, width: width, height: height}));

  await browser.close();
})();
