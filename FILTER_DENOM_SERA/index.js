const json = require('./file.json')

const billdetails = json.data.response.billdetails
const result = parseInt(billdetails[0].body[0].split(":")[1])
const hasil = billdetails.filter(data=>parseInt(data.body[0].split(":")[1]) >= 100000 ).map(({body,...datas})=> parseInt(body[0].split(":")[1]))

console.log(hasil)