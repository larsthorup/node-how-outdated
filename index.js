#!/usr/bin/env node
const { promisify } = require("util");
const { exec } = require("child_process");
const executing = promisify(exec);
const path = require("path");
const cwd = process.cwd();

async function main() {
  const { stdout: outdatedStdout } = await new Promise((resolve) => {
    exec("npm outdated --json", (err, stdout) => {
      if (err) {
        resolve({ stdout });
      } else {
        resolve({ stdout: JSON.stringify({}) });
      }
    });
  });
  const outdated = JSON.parse(outdatedStdout);
  for (packageName of Object.keys(outdated)) {
    const outdatedPackage = outdated[packageName];
    const { stdout: viewStdout } = await executing(
      `npm view ${packageName} --json`
    );
    const viewPackage = JSON.parse(viewStdout);
    const currentPackageVersion = outdatedPackage.current;
    const currentPackageDate = viewPackage.time[currentPackageVersion];
    const agePackage = Math.trunc(
      (Date.now() - Date.parse(currentPackageDate)) / (24 * 60 * 60 * 1000)
    );
    console.log(
      agePackage,
      packageName,
      currentPackageVersion,
      currentPackageDate
    );
  }
}

main().catch(console.error);
