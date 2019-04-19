import util from "util";
import { execFile, execSync } from "child_process";
import { copyFileSync } from "fs";

const execFilePromise = util.promisify(execFile);
const copyFileSyncPromise = util.promisify(copyFileSync);
const execSyncPromise = util.promisify(execSync);

async function getVersion() {
  const { stdout } = await execFilePromise("node", ["--version"]);
  console.log(stdout);
}

async function compileTsc() {
  try {
    // const { stdout } = await execFilePromise("yarn", ["tsc"]);
    await execSyncPromise("yarn tsc");
    // console.log(stdout);
  } catch (error) {
    console.log(error);
  }
}

async function copyPackageJson() {
  try {
    await copyFileSyncPromise("package.json", ".build/package.json", 0);
  } catch (error) {
    console.log(error);
  }
}

getVersion();
compileTsc();
copyPackageJson();
