const fs = require('fs').promises;
const path = require('path');

const DeleteFile = async function deleteFile(fileName, folder) {
    /**
     * fileName: string
     * folder: string 
     */

    const files = fileName.split('|');

    if (folder === 'venue') {
        try {
            files.forEach(async (file) => {
                // const filePath = `./Uploads/venue/${file}`;
                const filePath = path.join(__dirname, `../Uploads/venue/${file}`);

                try {
                    await fs.unlink(filePath);
                    console.log(`File ${filePath} has been deleted.`);
                } catch (err) {
                    console.error(err);
                }
            });
            return true;
        }
        catch (err) {
            console.log(err);
            return false
        }
    }
    else {
        console.log('Folder name is not correct!');
        return false;
    }

}

module.exports = { DeleteFile };