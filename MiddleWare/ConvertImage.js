const fs = require('fs');
const path = require('path');

const ReadeImageFile = (filename,dir)=>{
    if(!filename || filename==='') return null;
    const imageFile = path.join(__dirname,`../Uploads/${dir}/${filename}`);
    return fs.readFileSync(imageFile);
}
//convert image to base64
 const convertImageToBase64 = (filename,dir)=>{
    if(!filename || filename==='') return null;
    const imageFile = ReadeImageFile(filename,dir);
    return `data:image/png;base64,${imageFile.toString('base64')}`
}
module.exports={convertImageToBase64}