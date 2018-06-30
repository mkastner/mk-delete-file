const tape = require('tape');
const fsStat = require('mk-fs-stat');
const path = require('path');
const writeFile = require('mk-write-text-file');
const deleteFile = require(path.resolve('./index'));
const testFilePath = path.join(path.resolve('./'), 'test/playground/testfile.txt');
const testText = 'Testfile text';

async function main() {

  tape('create testfile.txt', async (t) => {

    t.plan(1);

    let statResult = await fsStat(testFilePath);

    if (!statResult) {
      await writeFile(testFilePath, testText);
    }

    statResult = await fsStat(testFilePath);
    t.ok(statResult, 'exits');
    t.end();

  });

  tape('mk delete file testfile.txt', async (t) => {

    t.plan(2);

    let deleteResult = await deleteFile(testFilePath);
    t.notOk(deleteResult, 'file deleted');
    let statResult = await fsStat(testFilePath);
    t.notOk(statResult, 'does not exist');

  });

}

main();
