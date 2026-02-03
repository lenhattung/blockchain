console.log("LAB-01 HELLO WORLD!");

const crypto = require('crypto');

function createSHA256(data){
    return crypto.createHash('sha256').update(data).digest('hex');
}

console.log('=== THỰC HÀNH: SHA-256 HASHING ====');
const input1 = "Blockchain Buoi 1 2";
const input2 = "blockchain Buoi 1 2";
const input3 = "Blockchain Buoi 1";
const input4 = "Blockchain Buoi 1 2 ";

const hash1 = createSHA256(input1);
const hash2 = createSHA256(input2);
const hash3 = createSHA256(input3);
const hash4 = createSHA256(input4);

console.log('DỮ LIỆU GỐC:');
console.log(`   Input 1: ${input1}`); // dấu ` trước số 1
console.log(`   Input 2: ${input2}`);
console.log(`   Input 3: ${input3}`);
console.log(`   Input 4: ${input4}`);

console.log('MÃ HASH:');
console.log(`   Hash 1: ${hash1}`);
console.log(`   Hash 2: ${hash2}`);
console.log(`   Hash 3: ${hash3}`);
console.log(`   Hash 4: ${hash4}`);

console.log('\nPHÂN TÍCH:');
console.log(hash1.length + ' ký tự');