/* jslint node: true, strict:implied, esversion: 6 */

var fs       = require('fs'),
	onError  = require('mk-log/lib/mk-on-error');

/**
 * delete file as promise
 * @param  {String} absPath the file of the target file
 * @return {Promise}        yields a promise
 */
module.exports = function deleteFile(absPath) {

	return new Promise(function(resolve, reject) {

		fs.unlink(absPath, function (err) {

		    if (err) {
		    	reject(err);
		    }

		    resolve({status: 'success', filePath: absPath});

		});

	}).catch(onError);

};
