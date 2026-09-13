import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const delayMs = 8000;

let timer;
let running = false;
let queued = false;

function runDeploy() {
  if (running) {
    queued = true;
    return;
  }
  running = true;
  console.log("\nPublishing to the live Cloudflare site…\n");
  const child = spawn("npm run deploy", {
    cwd: root,
    shell: true,
    stdio: "inherit",
    env: process.env,
  });
  child.on("exit", (code) => {
    running = false;
    if (code === 0) {
      console.log("\nLive site updated. Leave this running — save a file to publish again.\n");
    } else {
      console.error(`\nPublish failed (exit ${code}).\n`);
    }
    if (queued) {
      queued = false;
      runDeploy();
    }
  });
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(runDeploy, delayMs);
}

for (const dir of ["src", "public"]) {
  watch(resolve(root, dir), { recursive: true }, (_event, file) => {
    if (!file || file.endsWith("~") || file.includes("routeTree.gen.ts")) return;
    console.log(`Changed: ${file}`);
    schedule();
  });
}

console.log("Watching src/ and public/. Save a file to publish to Cloudflare.");
console.log("Keep this terminal open. First change waits 8 seconds, then deploys.");
