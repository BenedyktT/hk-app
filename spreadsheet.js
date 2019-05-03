const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json')

const printStudent = (row)=>{
    console.log(`Room Number ${row.room}`);
    console.log(`Room status: ${row.roomstatus}`)
}
let room = []
let roomStatus = []
let combined = {}
async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet('1lhhij4k2zOJMbwKDzXhOdmkRB0qx3W7q6nUBb0IiTnU');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    const rows = await promisify(sheet.getRows)({
        offset:1
    });
    rows.forEach(e => {
       room.push(e.room, e.roomstatus);
       
    });
    Object.assign(combined,room)
    console.log(combined)
}
accessSpreadsheet()