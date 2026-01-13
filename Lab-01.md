# HƯỚNG DẪN THỰC HÀNH BLOCKCHAIN - BUỔI 1 & 2 (GỘP)
## Cài Đặt Môi Trường, Mật Mã Học & Xây Dựng Blockchain Cơ Bản

## THÔNG TIN CHUNG
- **Chủ đề:** Cài đặt môi trường Blockchain cơ bản & Mô phỏng Mật mã học
- **Thời lượng:** 300 phút (5 tiết)
- **Mục tiêu lớp:** Làm quen với các khái niệm cơ bản của Blockchain thông qua thực hành toàn diện

## I. MỤC TIÊU BÀI HỌC
- Cài đặt thành công môi trường lập trình Blockchain cơ bản (Node.js, VS Code, Git)
- Hiểu rõ cơ chế hàm băm mật mã (Cryptographic Hashing) và tính chất bất biến (Immutability)
- Khám phá hiệu ứng thác đổ (Avalanche Effect) - Một thay đổi nhỏ → Kết quả hoàn toàn khác
- Tìm hiểu về cặp khóa công khai/riêng (Public/Private Key) và chữ ký số (Digital Signature)
- Mô phỏng cấu trúc Merkle Tree và hiểu được tính quan trọng trong xác thực dữ liệu blockchain
- Xây dựng một blockchain đơn giản với các block cơ bản
- Hiểu rõ tính bất biến và cơ chế xác thực của blockchain

---

## II. CHUẨN BỊ MÔI TRƯỜNG (50 phút)

**Lưu ý:** Các đường dẫn tải phần mềm bên dưới là chính thức từ các nhà phát triển. Hãy chắc chắn bạn đang tải từ các trang web chính xác.

### 1️⃣ CÀI ĐẶT NODE.JS (JavaScript Runtime Environment)

Node.js là runtime cho phép chạy code JavaScript ngoài trình duyệt web. Đây là công cụ thiết yếu để chạy các script blockchain.

**Bước 1:** Truy cập trang chính thức: https://nodejs.org/

**Bước 2:** Chọn phiên bản LTS (Long Term Support) - Phiên bản LTS ổn định nhất, được khuyên dùng cho học tập. Ví dụ: v20.11.0 LTS hoặc v22.x.x LTS

**Bước 3:** Chạy file cài đặt (.msi trên Windows, .pkg trên macOS, .tar.gz trên Linux) → Bấm Next liên tục cho đến hết quá trình cài đặt

**Bước 4:** Kiểm tra cài đặt - Mở Command Prompt (Windows) hoặc Terminal (Mac/Linux), gõ lệnh:
```
C:\Users\YourName> node -v
v20.11.0
```
✓ Nếu hiển thị phiên bản (v20.x.x) → Cài đặt thành công!

**Bước 5:** Kiểm tra npm (Node Package Manager) - được cài kèm Node.js, gõ lệnh:
```
C:\Users\YourName> npm -v
10.2.5
```

### 2️⃣ CÀI ĐẶT VISUAL STUDIO CODE (Code Editor)

VS Code là trình soạn thảo mã nguồn mạnh mẽ, nhẹ, được sử dụng rộng rãi trong lập trình web và blockchain.

**Bước 1:** Truy cập: https://code.visualstudio.com/

**Bước 2:** Nhấn nút Download dành cho hệ điều hành của bạn (Windows .exe | macOS .dmg | Linux .deb hoặc .rpm)

**Bước 3:** Chạy file cài đặt và hoàn tất quá trình

**Bước 4:** Cài đặt Extension cho JavaScript và Node.js - Mở VS Code, nhấn Ctrl + Shift + X, tìm kiếm "JavaScript (ES6) code snippets", cài đặt extension của charalampos karypidis

**Bước 5 (Tùy chọn):** Cài đặt Extension cho Solidity - Tìm kiếm "Solidity", cài đặt extension của Juan Blanco

### 3️⃣ CÀI ĐẶT GIT (Version Control System)

Git là công cụ quản lý phiên bản mã nguồn, giúp bạn theo dõi các thay đổi code.

**Bước 1:** Truy cập: https://git-scm.com/

**Bước 2:** Nhấn Download và chọn phiên bản dành cho hệ điều hành của bạn

**Bước 3:** Chạy file cài đặt theo các bước mặc định

**Bước 4:** Kiểm tra cài đặt - Mở Command Prompt/Terminal, gõ lệnh:
```
C:\Users\YourName> git --version
git version 2.43.0
```
✓ Nếu hiển thị phiên bản → Cài đặt thành công!

### 4️⃣ CÀI ĐẶT POSTMAN (Tùy chọn - Cho bài nâng cao)

Postman được sử dụng để test API blockchain.

**Bước 1:** Truy cập: https://www.postman.com/downloads/

**Bước 2:** Tải bản cài đặt phù hợp với hệ điều hành của bạn

**Bước 3:** Cài đặt theo hướng dẫn (không bắt buộc cho buổi thực hành này)

---

### KIỂM TRA HOÀN CHỈNH MÔI TRƯỜNG

Bạn đã sẵn sàng nếu có thể chạy cả ba lệnh sau mà không lỗi:
```
node -v
npm -v
git --version
```

---

## III. NỘI DUNG THỰC HÀNH (240 phút)

Phần này bao gồm 5 tiết thực hành để hiểu về hashing, chữ ký số, merkle tree, blockchain cơ bản, và tính bất biến của blockchain.

---

## TIẾT 1: KHÁM PHÁ HASHING THÔNG QUA MÔ PHỎNG WEB (50 phút)

**Mục đích:** Hiểu trực quan cách hàm băm SHA-256 thay đổi khi dữ liệu thay đổi (Avalanche Effect) và cơ chế cơ bản của blockchain.

### Phần A: Mô Phỏng Trực Tuyến (25 phút)

**Bước 1:** Truy cập trang mô phỏng của Anders Brownworth: https://andersbrownworth.com/blockchain/hash

**Bước 2:** Thực hành với Hash Function
- Quan sát phần "Data" - Gõ các nội dung khác nhau:
  - Ví dụ: "Hello" → Xem hash thay đổi
  - Sau đó: "hello" (chữ h thường) → Xem hash lại thay đổi hoàn toàn
  - Tiếp tục với: "Hello " (thêm dấu cách) → Lại thay đổi hoàn toàn
  - Thử: "Hello1" → Lại thay đổi
  - Quan sát độ dài hash (64 ký tự)

**Bước 3:** Thử thách Blockchain
- Vào tab "Blockchain"
- Cố gắng sửa dữ liệu ở một khối để khối vẫn giữ màu xanh MÀ KHÔNG bấm nút "Mine"
- Quan sát: Khi sửa dữ liệu, khối ngay lập tức chuyển thành màu đỏ (invalid)
- Điều này chứng minh tính bất biến của blockchain - bất kỳ sửa đổi nào đều bị phát hiện

**Bước 4:** Tìm hiểu Proof of Work
- Vào tab "Block"
- Thay đổi Nonce để tìm hash bắt đầu bằng "0000"
- Quan sát thời gian cần thiết để tìm nonce hợp lệ
- Thử tăng số lượng số 0 (difficulty) và quan sát thời gian tăng lên như thế nào

🔍 **Quan sát Chính:** Dù thay đổi chỉ 1 ký tự, hash cũng hoàn toàn khác nhau. Đây là "Avalanche Effect" - một tính chất quan trọng của hàm băm mã hóa, tạo nên nền tảng bảo mật của blockchain.

### Phần B: Lập Trình Hashing SHA-256 bằng JavaScript (25 phút)

**Mục đích:** Thực hành tạo mã hash SHA-256 bằng code thực tế, chứng minh tính chất avalanche effect.

**Bước 1:** Tạo thư mục dự án - Mở Command Prompt/Terminal, gõ:
```bash
mkdir Blockchain_Lab
cd Blockchain_Lab
```

**Bước 2:** Mở VS Code - Vẫn ở Command Prompt, gõ:
```bash
code .
```

**Bước 3:** Tạo file hash_test.js - Click chuột phải → New File → Đặt tên: hash_test.js → Dán code:

```javascript
const crypto = require('crypto');

function createSHA256(data) {
    return crypto.createHash('sha256')
                 .update(data)
                 .digest('hex');
}

console.log('===== THỰC HÀNH: SHA-256 HASHING =====\n');

const input1 = "Blockchain Buoi 1 2";
const input2 = "blockchain Buoi 1 2";
const input3 = "Blockchain Buoi 1";
const input4 = "Blockchain Buoi 1 2 ";

const hash1 = createSHA256(input1);
const hash2 = createSHA256(input2);
const hash3 = createSHA256(input3);
const hash4 = createSHA256(input4);

console.log('DỮ LIỆU GỐC:');
console.log(`  Input 1: "${input1}"`);
console.log(`  Input 2: "${input2}"`);
console.log(`  Input 3: "${input3}"`);
console.log(`  Input 4: "${input4}" (có dấu cách ở cuối)\n`);

console.log('MÃ HASH SHA-256:');
console.log(`  Hash 1:  ${hash1}`);
console.log(`  Hash 2:  ${hash2}`);
console.log(`  Hash 3:  ${hash3}`);
console.log(`  Hash 4:  ${hash4}\n`);

console.log('PHÂN TÍCH:');
console.log(`  Độ dài hash: ${hash1.length} ký tự`);
console.log(`  Input 1 vs Input 2 khác nhau 1 ký tự (b → B) → Hash khác nhau hoàn toàn`);
console.log(`  Input 1 vs Input 3 khác nhau 3 ký tự → Hash cũng khác hoàn toàn`);
console.log(`  Input 1 vs Input 4 chỉ khác 1 dấu cách → Hash cũng khác hoàn toàn\n`);

console.log('KẾT LUẬN:');
console.log('  ✓ SHA-256 luôn tạo ra hash 64 ký tự (256 bits)');
console.log('  ✓ Chỉ thay đổi 1 ký tự → hash thay đổi hoàn toàn (Avalanche Effect)');
console.log('  ✓ SHA-256 là hàm một chiều - Không thể từ hash tìm ra dữ liệu gốc');
console.log('  ✓ SHA-256 là hàm xác định - Cùng input luôn cho cùng output');
console.log('  ✓ Tính chất này là nền tảng của tính bảo mật trong blockchain\n');
```

**Bước 4:** Chạy code - Nhấn Ctrl + ` để mở Terminal, gõ:
```bash
node hash_test.js
```

**Kết quả mong đợi:** Bạn sẽ thấy 4 hash khác nhau hoàn toàn, mặc dù chỉ có những thay đổi nhỏ trong dữ liệu gốc.

**Bước 5 (Mở rộng):** Tạo file `hash_comparison.js` để so sánh các thuật toán hash khác:

```javascript
const crypto = require('crypto');

function createHash(algorithm, data) {
    return crypto.createHash(algorithm)
                 .update(data)
                 .digest('hex');
}

console.log('===== SO SÁNH CÁC THUẬT TOÁN HASH =====\n');

const data = "Blockchain Bitcoin Ethereum";

console.log('Input: ' + data);
console.log('');

const hashSHA1 = createHash('sha1', data);
const hashSHA256 = createHash('sha256', data);
const hashSHA512 = createHash('sha512', data);
const hashMD5 = createHash('md5', data);

console.log('SHA-1:    ' + hashSHA1 + ` (${hashSHA1.length} ký tự)`);
console.log('SHA-256:  ' + hashSHA256 + ` (${hashSHA256.length} ký tự)`);
console.log('SHA-512:  ' + hashSHA512 + ` (${hashSHA512.length} ký tự)`);
console.log('MD5:      ' + hashMD5 + ` (${hashMD5.length} ký tự)`);

console.log('\nNhận xét:');
console.log('  - SHA-256 được sử dụng trong Bitcoin (256 bits = 64 hex chars)');
console.log('  - SHA-512 an toàn hơn nhưng chậm hơn (512 bits = 128 hex chars)');
console.log('  - SHA-1 không còn an toàn và dần bị thay thế (160 bits = 40 hex chars)');
console.log('  - MD5 không còn được sử dụng vì đã bị crack (128 bits = 32 hex chars)\n');
```

Chạy:
```bash
node hash_comparison.js
```

---

## TIẾT 2: CHỮ KÝ SỐ & CẶP KHÓA CÔNG KHAI (50 phút)

**Mục đích:** Hiểu nguyên tắc xác thực và mật mã hóa khóa công khai, những công cụ cơ bản để xác minh danh tính trong blockchain.

### Phần A: Tạo Cặp Khóa Trực Tuyến (15 phút)

**Bước 1:** Truy cập công cụ tạo Ethereum Keypair: https://www.keytool.online/ec-key-generator

**Bước 2:** Tạo cặp khóa:
- Nhấn nút "Generate" hoặc "Create Key Pair"
- Quan sát:
  - **Public Key (Khóa công khai):** Dài khoảng 64-130 ký tự, có thể chia sẻ công khai
  - **Private Key (Khóa riêng):** Dài khoảng 64 ký tự, BẤT CỨ KHÔNG ĐƯỢC CHIA SẺ
  - Chúng luôn tạo thành một cặp duy nhất

**Bước 3:** Hiểu tính chất:
- Nhấn "Generate" nhiều lần → Mỗi lần đều tạo cặp khóa khác nhau
- Ghi chép một cặp khóa xuống giấy để sử dụng ở phần B
- **Nhắc nhở:** Trong blockchain thực tế, Private Key chính là "mật khẩu" của tài khoản của bạn

### Phần B: Mô Phỏng Chữ Ký Số (35 phút)

**Bước 1:** Tạo file `digital_signature.js`:

```javascript
const crypto = require('crypto');
const fs = require('fs');

console.log('===== THỰC HÀNH: CHỮ KÝ SỐ & XÁC THỰC =====\n');

// Bước 1: Tạo cặp khóa
console.log('BƯỚC 1: TẠO CẶP KHÓA RSA\n');

const { generateKeyPairSync } = crypto;

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
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

console.log('Public Key (có thể chia sẻ):');
console.log(publicKey.substring(0, 60) + '...\n');

console.log('Private Key (BẤT CỨ KHÔNG ĐƯỢC CHIA SẺ):');
console.log(privateKey.substring(0, 60) + '...\n');

// Bước 2: Tạo chữ ký cho một thông điệp
console.log('BƯỚC 2: KÝ MỘT THÔNG ĐIỆP\n');

const message = "Tôi, Alice, chuyển 100 BTC cho Bob";

const signer = crypto.createSign('sha256');
signer.update(message);
const signature = signer.sign(privateKey, 'hex');

console.log('Thông điệp: "' + message + '"');
console.log('Chữ ký: ' + signature.substring(0, 60) + '...\n');

// Bước 3: Xác minh chữ ký
console.log('BƯỚC 3: XÁC MINH CHỮ KÝ (Phía người nhận)\n');

const verifier = crypto.createVerify('sha256');
verifier.update(message);
const isValid = verifier.verify(publicKey, signature, 'hex');

console.log('Kết quả xác minh: ' + (isValid ? '✓ HỢPL LỆ' : '❌ KHÔNG HỢP LỆ'));
console.log('Kết luận: Public Key của Alice có thể xác minh chữ ký, chứng minh Alice đã ký\n');

// Bước 4: Thử giả mạo
console.log('BƯỚC 4: THỬ GIẢ MẠO THÔNG ĐIỆP\n');

const fakeMessage = "Tôi, Alice, chuyển 1000 BTC cho Bob";
const verifierFake = crypto.createVerify('sha256');
verifierFake.update(fakeMessage);
const isFakeValid = verifierFake.verify(publicKey, signature, 'hex');

console.log('Thông điệp giả: "' + fakeMessage + '"');
console.log('Chữ ký cũ: ' + signature.substring(0, 60) + '...');
console.log('Kết quả xác minh: ' + (isFakeValid ? '✓ HỢP LỆ' : '❌ KHÔNG HỢP LỆ'));
console.log('Kết luận: Thay đổi thông điệp → chữ ký không còn hợp lệ! ✓\n');

// Bước 5: Thư ký bằng khóa sai
console.log('BƯỚC 5: TRY VERIFY VỚI KHÓA CÔNG KHAI SAI\n');

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

console.log('Public Key khác: ' + publicKey2.substring(0, 60) + '...');
console.log('Chữ ký của Alice: ' + signature.substring(0, 60) + '...');
console.log('Kết quả xác minh: ' + (isWrongKeyValid ? '✓ HỢP LỆ' : '❌ KHÔNG HỢP LỆ'));
console.log('Kết luận: Chỉ Public Key đúng của Alice mới xác minh được chữ ký của cô ấy! ✓\n');

// Bước 6: Tóm tắt
console.log('TÓMI TẮT - CÁCH HOẠT ĐỘNG CỦA CHỮ KÝ SỐ\n');
console.log('1. Alice tạo cặp khóa (Public + Private)');
console.log('2. Alice chia sẻ Public Key cho mọi người');
console.log('3. Alice ký một thông điệp bằng Private Key của mình');
console.log('4. Mọi người sử dụng Public Key của Alice để xác minh chữ ký');
console.log('5. Nếu chữ ký hợp lệ → Thông điệp chắc chắn từ Alice');
console.log('6. Nếu thông điệp bị thay đổi → Chữ ký ngay lập tức không hợp lệ');
console.log('7. Không ai có thể giả mạo chữ ký của Alice vì không có Private Key của cô ấy\n');
```

**Bước 2:** Chạy code:
```bash
node digital_signature.js
```

**Kết quả mong đợi:** Bạn sẽ thấy:
- Cặp khóa được tạo ra
- Chữ ký được tạo thành công
- Chữ ký xác minh hợp lệ
- Giả mạo thông điệp → chữ ký không hợp lệ
- Dùng khóa sai → chữ ký không hợp lệ

---

## TIẾT 3: MÔ PHỎNG MERKLE TREE (50 phút)

**Mục đích:** Hiểu cấu trúc Merkle Tree - Cách blockchain xác thực hiệu quả dữ liệu thông qua băm cây mà không cần hash toàn bộ dữ liệu.

**Khái niệm:** Merkle Tree là cấu trúc dữ liệu dạng cây, nơi mỗi nút là hash của hai nút con. Merkle Root (gốc cây) là hash cuối cùng, đại diện toàn bộ dữ liệu. Lợi ích: Có thể xác thực từng phần nhỏ mà không cần toàn bộ dữ liệu.

### Phần A: Merkle Tree Cơ Bản (25 phút)

**Bước 1:** Tạo file `merkle_tree.js`:

```javascript
const crypto = require('crypto');

function quickHash(data) {
    return crypto.createHash('sha256')
                 .update(data)
                 .digest('hex')
                 .substring(0, 16);  // Cắt ngắn để dễ nhìn
}

console.log('===== THỰC HÀNH: MERKLE TREE =====\n');

// Dữ liệu gốc (Transactions)
let tx1 = "Giao dich A->B: 10 BTC";
let tx2 = "Giao dich C->D: 5 BTC";
let tx3 = "Giao dich E->F: 8 BTC";
let tx4 = "Giao dich G->H: 3 BTC";

console.log('TRANSACTION LAYER (Lớp 0 - Dữ liệu gốc):');
console.log(`  TX1: ${tx1}`);
console.log(`  TX2: ${tx2}`);
console.log(`  TX3: ${tx3}`);
console.log(`  TX4: ${tx4}\n`);

// Hash từng transaction
let h1 = quickHash(tx1);
let h2 = quickHash(tx2);
let h3 = quickHash(tx3);
let h4 = quickHash(tx4);

console.log('HASH LAYER (Lớp 1 - Hash từng transaction):');
console.log(`  H1 = hash(TX1) = ${h1}`);
console.log(`  H2 = hash(TX2) = ${h2}`);
console.log(`  H3 = hash(TX3) = ${h3}`);
console.log(`  H4 = hash(TX4) = ${h4}\n`);

// Tạo cây - ghép cặp hash
let h12 = quickHash(h1 + h2);
let h34 = quickHash(h3 + h4);

console.log('BRANCH LAYER (Lớp 2 - Ghép cặp hash):');
console.log(`  H12 = hash(H1 + H2) = ${h12}`);
console.log(`  H34 = hash(H3 + H4) = ${h34}\n`);

// Merkle Root - đỉnh của cây
let merkleRoot = quickHash(h12 + h34);

console.log('MERKLE ROOT (Lớp 3 - Gốc cây):');
console.log(`  Root = hash(H12 + H34) = ${merkleRoot}\n`);

console.log('CẤU TRÚC MERKLE TREE:');
console.log('                  ' + merkleRoot);
console.log('                 /            \\');
console.log('               ' + h12 + '        ' + h34);
console.log('              /    \\          /    \\');
console.log('            ' + h1 + '    ' + h2 + '    ' + h3 + '    ' + h4);
console.log('           /    |    |    |    |    |    |    \\');
console.log('          TX1   TX2  TX3  TX4\n');

// Test: Thay đổi một transaction
console.log('--- KIỂM ĐỊNH: THAY ĐỔI TX1 ---\n');
let tx1_modified = "Giao dich A->B: 100 BTC";  // Thay đổi từ 10 BTC thành 100 BTC
let h1_modified = quickHash(tx1_modified);
let h12_modified = quickHash(h1_modified + h2);
let merkleRoot_modified = quickHash(h12_modified + h34);

console.log(`TX1 (sửa): ${tx1_modified}`);
console.log(`H1 (cũ): ${h1}`);
console.log(`H1 (mới): ${h1_modified}`);
console.log(`H12 (cũ): ${h12}`);
console.log(`H12 (mới): ${h12_modified}`);
console.log(`Root (cũ): ${merkleRoot}`);
console.log(`Root (mới): ${merkleRoot_modified}\n`);

console.log('KẾT LUẬN:');
console.log('  ✓ Thay đổi TX1 → H1 thay đổi');
console.log('  ✓ H1 thay đổi → H12 thay đổi');
console.log('  ✓ H12 thay đổi → Merkle Root thay đổi');
console.log('  ✓ Chỉ cần kiểm tra Merkle Root để phát hiện bất kỳ sửa đổi nào\n');

console.log('LỢI ÍCH CỦA MERKLE TREE:');
console.log('  1. Xác thực nhanh: Chỉ cần so sánh 1 hash (Merkle Root)');
console.log('  2. Hiệu quả: Không cần tải toàn bộ dữ liệu để xác thực');
console.log('  3. Bảo mật: Bất kỳ sửa đổi nào cũng bị phát hiện ngay lập tức\n');
```

**Bước 2:** Chạy code:
```bash
node merkle_tree.js
```

### Phần B: Merkle Tree Động với Số Lượng Khác Nhau (25 phút)

**Bước 1:** Tạo file `merkle_tree_dynamic.js`:

```javascript
const crypto = require('crypto');

function hash(data) {
    return crypto.createHash('sha256')
                 .update(data)
                 .digest('hex')
                 .substring(0, 12);  // Cắt ngắn
}

function buildMerkleTree(transactions) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`MERKLE TREE WITH ${transactions.length} TRANSACTIONS`);
    console.log(`${'='.repeat(50)}\n`);
    
    let level = 0;
    let currentLevel = transactions.map((tx, idx) => {
        const h = hash(tx);
        console.log(`[Level ${level}] TX${idx + 1}: ${tx.substring(0, 25).padEnd(25)}→ ${h}`);
        return h;
    });
    
    console.log('');
    
    while (currentLevel.length > 1) {
        level++;
        let nextLevel = [];
        
        for (let i = 0; i < currentLevel.length; i += 2) {
            let left = currentLevel[i];
            let right = i + 1 < currentLevel.length ? currentLevel[i + 1] : left;
            let parent = hash(left + right);
            
            console.log(`[Level ${level}] ${left} + ${right}`);
            console.log(`          → ${parent}\n`);
            
            nextLevel.push(parent);
        }
        currentLevel = nextLevel;
    }
    
    console.log(`MERKLE ROOT: ${currentLevel[0]}\n`);
    return currentLevel[0];
}

// Test với số lượng transaction khác nhau
const tx_2 = [
    "TX1: Alice->Bob 10",
    "TX2: Charlie->David 5"
];

const tx_4 = [
    "TX1: Alice->Bob 10",
    "TX2: Charlie->David 5",
    "TX3: Eve->Frank 8",
    "TX4: Grace->Henry 3"
];

const tx_8 = [
    "TX1: Alice->Bob 10",
    "TX2: Charlie->David 5",
    "TX3: Eve->Frank 8",
    "TX4: Grace->Henry 3",
    "TX5: Ivy->Jack 2",
    "TX6: Kelly->Leo 7",
    "TX7: Mike->Nancy 4",
    "TX8: Oscar->Pam 6"
];

buildMerkleTree(tx_2);
buildMerkleTree(tx_4);
buildMerkleTree(tx_8);

console.log('\nNHẬN XÉT:');
console.log('  - 2 transactions → 2 levels');
console.log('  - 4 transactions → 3 levels');
console.log('  - 8 transactions → 4 levels');
console.log('  - n transactions → log2(n) + 1 levels\n');
```

**Bước 2:** Chạy code:
```bash
node merkle_tree_dynamic.js
```

---

## TIẾT 4: XÂY DỰNG BLOCKCHAIN ĐƠN GIẢN (100 phút)

**Mục đích:** Tổng hợp tất cả kiến thức vừa học để xây dựng một blockchain hoàn chỉnh với các block liên kết, chứng minh công việc, và kiểm tra tính hợp lệ.

### Phần A: Xây Dựng Block & Blockchain Class (50 phút)

**Bước 1:** Tạo file `simple_blockchain.js`:

```javascript
const crypto = require('crypto');

// ============================================
// LỚPHASH (Hàm tiện ích)
// ============================================
function calculateHash(data) {
    return crypto.createHash('sha256')
                 .update(JSON.stringify(data))
                 .digest('hex');
}

// ============================================
// LỚP BLOCK (Khối blockchain)
// ============================================
class Block {
    constructor(index, timestamp, transactions, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;  // Number used once - sử dụng trong Proof of Work
        this.hash = this.calculateHash();
    }

    // Tính hash của block hiện tại
    calculateHash() {
        const blockData = {
            index: this.index,
            timestamp: this.timestamp,
            transactions: this.transactions,
            previousHash: this.previousHash,
            nonce: this.nonce
        };
        return calculateHash(blockData);
    }

    // Chứng minh công việc (Proof of Work)
    // Tìm nonce sao cho hash bắt đầu bằng số lượng 0 bằng difficulty
    mineBlock(difficulty) {
        const target = '0'.repeat(difficulty);
        console.log(`  ⛏️  Mining block #${this.index}...`);
        
        const startTime = Date.now();
        
        while (!this.hash.startsWith(target)) {
            this.nonce++;
            this.hash = this.calculateHash();
            
            // In tiến độ mỗi 50000 lần thử
            if (this.nonce % 50000 === 0) {
                process.stdout.write(`\r  Tried: ${this.nonce} nonces`);
            }
        }
        
        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        
        console.log(`\r  ✓ Block #${this.index} mined!`);
        console.log(`    Nonce: ${this.nonce}`);
        console.log(`    Hash: ${this.hash}`);
        console.log(`    Time: ${timeTaken}ms\n`);
    }
}

// ============================================
// LỚP BLOCKCHAIN (Chuỗi khối)
// ============================================
class Blockchain {
    constructor(difficulty = 2) {
        this.chain = [];
        this.difficulty = difficulty;
        
        // Tạo Genesis Block (khối đầu tiên)
        console.log('Creating Genesis Block...\n');
        const genesisBlock = new Block(
            0,
            new Date('2024-01-01').toISOString(),
            ["⛓️  Genesis Block - Khởi đầu blockchain"],
            "0"
        );
        genesisBlock.mineBlock(this.difficulty);
        this.chain.push(genesisBlock);
    }

    // Lấy block cuối cùng trong chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Thêm block mới vào blockchain
    addBlock(transactions) {
        const newBlock = new Block(
            this.chain.length,
            new Date().toISOString(),
            transactions,
            this.getLatestBlock().hash
        );
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        return newBlock;
    }

    // Kiểm tra blockchain có hợp lệ không
    isChainValid() {
        console.log('\n--- VALIDATING BLOCKCHAIN ---\n');
        
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Kiểm tra hash của block hiện tại
            const recalculatedHash = currentBlock.calculateHash();
            if (currentBlock.hash !== recalculatedHash) {
                console.log(`  ❌ Block #${i}: Hash không khớp!`);
                console.log(`    Expected: ${recalculatedHash}`);
                console.log(`    Got:      ${currentBlock.hash}`);
                return false;
            }

            // Kiểm tra previousHash trỏ tới block trước
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log(`  ❌ Block #${i}: Previous hash không khớp!`);
                console.log(`    Expected: ${previousBlock.hash}`);
                console.log(`    Got:      ${currentBlock.previousHash}`);
                return false;
            }

            console.log(`  ✓ Block #${i}: Valid`);
        }
        
        console.log(`\n  ✓✓✓ Blockchain hoàn toàn hợp lệ! ✓✓✓\n`);
        return true;
    }

    // Hiển thị blockchain
    displayChain() {
        console.log('\n' + '='.repeat(80));
        console.log('BLOCKCHAIN CHAIN');
        console.log('='.repeat(80) + '\n');
        
        this.chain.forEach((block, idx) => {
            console.log(`📦 Block #${block.index}`);
            console.log(`   Timestamp:     ${block.timestamp}`);
            console.log(`   Transactions:  ${block.transactions.length}`);
            if (block.transactions.length > 0) {
                block.transactions.slice(0, 2).forEach(tx => {
                    console.log(`                 - ${tx}`);
                });
                if (block.transactions.length > 2) {
                    console.log(`                 ... (${block.transactions.length - 2} more)`);
                }
            }
            console.log(`   Previous Hash: ${block.previousHash.substring(0, 16)}...`);
            console.log(`   Hash:          ${block.hash.substring(0, 16)}...`);
            console.log(`   Nonce:         ${block.nonce}`);
            console.log('');
        });
        
        console.log('='.repeat(80) + '\n');
    }
}

// ============================================
// THỰC HÀNH BLOCKCHAIN
// ============================================
console.log('╔════════════════════════════════════════╗');
console.log('║  XÂY DỰNG BLOCKCHAIN ĐƠN GIẢN       ║');
console.log('╚════════════════════════════════════════╝\n');

const blockchain = new Blockchain(2);  // difficulty = 2

// Thêm block 1
console.log('THÊM BLOCK 1:');
blockchain.addBlock([
    "TX1: Alice -> Bob: 10 BTC",
    "TX2: Charlie -> David: 5 BTC"
]);

// Thêm block 2
console.log('THÊM BLOCK 2:');
blockchain.addBlock([
    "TX3: Eve -> Frank: 7 BTC",
    "TX4: Grace -> Henry: 3 BTC",
    "TX5: Ivy -> Jack: 2 BTC"
]);

// Thêm block 3
console.log('THÊM BLOCK 3:');
blockchain.addBlock([
    "TX6: Kelly -> Leo: 8 BTC"
]);

// Hiển thị blockchain
blockchain.displayChain();

// Kiểm tra tính hợp lệ
blockchain.isChainValid();

// ============================================
// THỬ GIẢ MẠO - PHÁT HIỆN SỰTHAY ĐỔI
// ============================================
console.log('\n╔════════════════════════════════════════╗');
console.log('║  THỬ GIẢ MẠO DỮ LIỆU                ║');
console.log('╚════════════════════════════════════════╝\n');

console.log('Bước 1: Sửa transaction trong Block #1\n');
console.log('Dữ liệu gốc: "TX1: Alice -> Bob: 10 BTC"');
blockchain.chain[1].transactions[0] = "TX1: Alice -> Bob: 1000 BTC";
console.log('Dữ liệu sửa: "TX1: Alice -> Bob: 1000 BTC"\n');

console.log('Bước 2: Kiểm tra blockchain lại\n');
const isValid = blockchain.isChainValid();

if (!isValid) {
    console.log('✓ Sự thay đổi được phát hiện thành công!');
    console.log('✓ Blockchain bảo vệ dữ liệu khỏi thay đổi không được phép!\n');
}
```

**Bước 2:** Chạy code:
```bash
node simple_blockchain.js
```

### Phần B: Phân Tích Kết Quả (50 phút)

**Quan sát các điểm chính:**

1. **Cơ chế Mining:** Quan sát Nonce tăng dần để tìm hash bắt đầu bằng "00"
2. **Hash Chaining:** Mỗi block đề cập tới hash của block trước đó
3. **Immutability:** Sửa một transaction → Block hash thay đổi → Tất cả block sau cũng phải sửa
4. **Proof of Work:** Difficulty = 2 có thể nhanh, nhưng difficulty = 6 sẽ mất nhiều thời gian hơn

**Bước 3:** Thử tăng Difficulty

Sửa file `simple_blockchain.js`, thay dòng:
```javascript
const blockchain = new Blockchain(2);  // Thay từ 2 thành 4 hoặc 5
```

Thành:
```javascript
const blockchain = new Blockchain(4);  // Difficulty cao hơn = mở hậu hơn
```

Chạy lại và quan sát thời gian mining tăng lên đáng kể.

---

## IV. BÁO CÁO THỰC HÀNH (10 phút)

**Yêu cầu:** Sinh viên cần hoàn thành báo cáo sau khi kết thúc thực hành.

### Hướng Dẫn Nộp Bài:

1. **Bước 1:** Chụp ảnh màn hình (Screenshot) kết quả Terminal từ tất cả 5 tiết

2. **Bước 2:** Tạo file Word (hoặc Google Docs) có tên: 
   `BaoCao_Blockchain_Buoi1_2_[TenHocSinh].docx`

3. **Bước 3:** Nộp file PDF bao gồm:
   - 5 ảnh screenshot kết quả chạy code (1 cho mỗi tiết)
   - Trả lời các câu hỏi dưới đây

---

## CÂU HỎI BÁO CÁO (10 câu):

### **Câu 1:** SHA-256 Hash có độ dài bao nhiêu ký tự? Giải thích vì sao?
**Gợi ý:** SHA-256 = 256 bits. Mỗi byte = 2 ký tự hex (0-9, A-F). Vậy 256 bits / 8 = 32 bytes = 32 × 2 = 64 ký tự.

### **Câu 2:** Tại sao thay đổi chỉ 1 ký tự trong dữ liệu gốc, mã Hash lại thay đổi hoàn toàn?
**Gợi ý:** Đây là "Avalanche Effect" - Tính chất của hàm hash mã hóa. 1 bit thay đổi → Khoảng 50% bits trong hash thay đổi.

### **Câu 3:** Nêu 3 tính chất của SHA-256 mà bạn đã quan sát được từ tiết 1 & 2.
**Gợi ý:** Deterministic (xác định), Sensitive (nhạy cảm), One-way (một chiều), Avalanche Effect.

### **Câu 4:** Chữ ký số có tác dụng gì trong blockchain?
**Gợi ý:** Xác thực danh tính (Chứng minh ai gửi giao dịch), Không thể từ chối (Non-repudiation).

### **Câu 5:** Tại sao Private Key không được chia sẻ? Nếu Private Key bị lộ sẽ như thế nào?
**Gợi ý:** Ai có Private Key của bạn có thể ký giao dịch thay bạn. Đây là "mật khẩu" của tài khoản blockchain.

### **Câu 6:** Merkle Tree có lợi ích gì so với việc hash toàn bộ dữ liệu cùng lúc?
**Gợi ý:** Hiệu quả (không cần tải toàn bộ), Xác thực nhanh (chỉ so sánh Merkle Root), Phát hiện lỗi từng phần.

### **Câu 7:** Trong bài tập tiết 4, Nonce là gì? Tại sao cần Nonce?
**Gợi ý:** Nonce = Number used once. Dùng để tìm hash bắt đầu bằng các số 0, chứng minh công việc (Proof of Work).

### **Câu 8:** Khi bạn sửa một block trong blockchain, điều gì sẽ xảy ra?
**Gợi ý:** Block hash thay đổi → Block tiếp theo previousHash không khớp → Tất cả block sau phải tính lại hash.

### **Câu 9:** Blockchain khác gì so với database truyền thống về tính bảo mật?
**Gợi ý:** Blockchain immutable (không thể sửa), Distributed (phân tán), không có điểm yếu trung tâm.

### **Câu 10:** Nêu 3 ứng dụng thực tế của blockchain (ngoài tiền tệ điện tử) mà bạn biết hoặc tìm hiểu được.
**Gợi ý:** Chuỗi cung ứng, Y tế, Giáo dục, Bất động sản, Bầu cử, v.v.

---

## TIÊU CHÍ CHẤM ĐIỂM:

| Tiêu chí | Điểm | Mô tả |
|----------|------|-------|
| Hoàn thành các tiết thực hành | 4 | Chạy thành công tất cả 5 tiết, có 5 screenshot |
| Trả lời câu hỏi | 4 | Trả lời đầy đủ 10 câu, chính xác, có giải thích |
| Hiểu biết khái niệm | 2 | Thể hiện hiểu rõ: hashing, chữ ký, merkle tree, blockchain, tính bất biến |
| **Tổng cộng** | **10** | |

---

## V. TÀI LIỆU THAM KHẢO & LIÊN KẾT HỮU ÍCH

### Tài liệu trực tuyến:
- **Anders Brownworth Blockchain Visualizer:** https://andersbrownworth.com/blockchain/
- **Node.js Official Docs:** https://nodejs.org/docs/
- **Node.js Crypto Module:** https://nodejs.org/api/crypto.html
- **Bitcoin Whitepaper:** https://bitcoin.org/bitcoin.pdf
- **MDN JavaScript:** https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **Ethereum Official:** https://ethereum.org/

### GỢI Ý CHO BÀI TẬP NÂNG CAO:
1. Thay đổi difficulty trong blockchain và đo thời gian mining
2. Tạo một blockchain với 10 block, mỗi block có 5 giao dịch
3. Xây dựng web interface (HTML/CSS/JavaScript) để trực quan hóa blockchain
4. Thử tấn công blockchain: sửa 1 block và tính lại tất cả hash sau
5. Triển khai Digital Signature đầy đủ cho giao dịch blockchain
6. So sánh hiệu suất SHA-256 vs SHA-512 vs MD5
7. Xây dựng Merkle Tree với giao diện đồ họa
8. Tìm hiểu về Proof of Stake (PoS) so với Proof of Work (PoW)
9. Tạo API REST để interact với blockchain (dùng Express.js)
10. Tìm hiểu về các loại blockchain khác (Layer 2, Sharding, etc.)

### Sách Tham Khảo:
- "Mastering Bitcoin" - Andreas M. Antonopoulos
- "Mastering Ethereum" - Andreas M. Antonopoulos & Gavin Wood
- "The Bitcoin Standard" - Saifedean Ammous

---

## CHÚC BẠN HOÀN THÀNH THÀNH CÔNG BÀI THỰC HÀNH!

**Lưu ý cuối cùng:**
- Lưu lại tất cả code vào một thư mục (Blockchain_Lab)
- Làm báo cáo chi tiết với screenshot đầy đủ
- Nếu có khó khăn, hãy review lại phần lý thuyết trước đó
- Thử nghiệm thêm bằng cách sửa code và quan sát kết quả thay đổi
