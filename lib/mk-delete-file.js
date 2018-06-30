const fs = require('fs');

/**
 * delete file as promise
 * @param  {String} absPath the file of the target file
 * @return {Promise}        yields a promise
 */
module.exports = function deleteFile(absPath) {

  return new Promise(function(resolve, reject) {

    try {

      fs.unlink(absPath, function (err) {

        if (err) {
          reject(err);
        }

        resolve(null);
      });

    } catch (err) {
      
      console.error(err); 
    }
  });
};
