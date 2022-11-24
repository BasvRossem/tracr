const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function run(script) {
  execSync(script, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

function getAllResourceFiles(dir) {
  const files = [];
  
  fs.readdirSync(dir).forEach(file => {
      const absolute = path.join(dir, file);
      if (fs.statSync(absolute).isDirectory()) 
        files.push(getAllResourceFiles(absolute));
      else 
        files.push(absolute);
  });
  
  return files.flat().filter(file => file.toUpperCase().includes("Resource".toUpperCase()));
}

function runStep(message, func) {
  console.log(message);
  const val = func();
  console.log();
  return val;
}

runStep("=== Generating documentation ===",
  () => run("npx typedoc src/**/* --json ./docs/out-file.json"));

const resourceFiles = runStep("=== Retrieving files ===", () => getAllResourceFiles("./src"));
console.log(resourceFiles)

runStep("=== Remove docs ===", () => fs.rmSync("./docs", { recursive: true, force: true }));