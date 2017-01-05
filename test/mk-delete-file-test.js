/* jslint node: true, strict:implied, esversion: 6 */

const tape = require('tape'),
    fsStat = require('mk-fs-stat'),
    onError = require('mk-log/lib/mk-on-error'),
    path = require('path'),
    writeFile = require('mk-write-text-file'),
    deleteFile = require(path.resolve('./index')),
    testFilePath = path.join(path.resolve('./'), 'test/playground/testfile.txt'),
    testText = 'Testfile text';

tape('create testfile.txt', function(t) {

    t.plan(1);

    async function run () {

        let statResult = await fsStat(testFilePath);

        if (statResult.status === 'failure') {
            await writeFile(testFilePath, testText);
        }

        statResult = await fsStat(testFilePath);
        t.equal(statResult.status, 'success');
        t.end();

    };

    run().catch(onError);

});

tape('mk delete file testfile.txt', function(t) {

    t.plan(2);

    async function run() {

        let deleteResult = await deleteFile(testFilePath);
        t.equal(deleteResult.status, 'success');
        let statResult = await fsStat(testFilePath);
        t.equal(statResult.status, 'failure');

    }

    run().catch(onError);

});
