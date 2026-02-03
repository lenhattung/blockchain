const crypto = require('crypto');
const fs = require('fs');

console.log('=== THỰC HÀNH: CHỮ KÝ SỐ VÀ XÁC THỰC ===')

// Bước 1: Tạo cặp khóa
console.log('\nBƯỚC 1: TẠO CẶP KHÓA RSA');
const {generateKeyPairSync} = crypto;
const {publicKey, privateKey} = generateKeyPairSync(
    'rsa',
    {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        },
    }
)

console.log('Public Key (có thể chia sẻ): ')
console.log(publicKey+"\n");
console.log('Private Key (không được chia sẻ): ')
console.log(privateKey+"\n");

// Bước 2: Tạo chữ ký cho một thông điệp
console.log('\nBƯỚC 2: KÝ MỘT THÔNG ĐIỆP');
const message = "Tôi, Lê Nhật Tùng, chuyển 100 BTC cho Khoa";

const signer = crypto.createSign('sha256');
signer.update(message);
const signature = signer.sign(privateKey, 'hex');

console.log('Thông điệp: '+message);
console.log('Chữ ký: '+ signature);


// Bước 3: Xác minh chữ ký
console.log("\n BƯỚC 3: XÁC MINH CHỮ KÝ (phía người nhận)");

const verifier = crypto.createVerify('sha256');
verifier.update(message);
const isValid = verifier.verify(publicKey, signature, 'hex');
console.log('Kết quả xác minh: ' + (isValid?"Hợp lệ":"Không hợp lệ"));

// Bước 4: Thử giả mạo
console.log('\nBƯỚC 4: THỬ GIẢ MẠO THÔNG ĐIỆP');

const fakeMessage  = "Tôi, Lê Nhật Tùng, chuyển 1000 BTC cho Khoa";
const verifierFake = crypto.createVerify('sha256');
verifierFake.update(fakeMessage);
const isFakeValid = verifierFake.verify(publicKey, signature, 'hex');

console.log('Thông điệp giả: "' + fakeMessage + '"');
console.log('Kết quả xác minh: ' + (isFakeValid?"Hợp lệ":"Không hợp lệ"));

// Bước 5: Thử ký bằng khóa sai
console.log('\nBƯỚC 5: TRY VERIFY VỚI KHÓA CÔNG KHAI SAI');

const { publicKey: publicKey2 } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

const verifierWrongKey = crypto.createVerify('sha256');
verifierWrongKey.update(message);
const isWrongKeyValid = verifierWrongKey.verify(publicKey2, signature, 'hex');

console.log('Public key khác: ' + publicKey2);
console.log('Thông điệp: '+message);
console.log('Kết quả xác minh: '+ ((isWrongKeyValid)?'Hợp lệ':'Không hợp lệ'));
