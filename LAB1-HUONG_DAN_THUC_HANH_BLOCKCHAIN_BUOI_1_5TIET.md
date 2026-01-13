# HƯỚNG DẪN THỰC HÀNH BLOCKCHAIN - BUỔI 1
## Cài Đặt Môi Trường & Mô Phỏng Mật Mã Học

## THÔNG TIN CHUNG
- **Chủ đề:** Cài đặt môi trường Blockchain cơ bản & Mô phỏng Hashing
- **Thời lượng:** 300 phút (5 tiết)
- **Mục tiêu lớp:** Làm quen với các khái niệm cơ bản của Blockchain thông qua thực hành toàn diện

## I. MỤC TIÊU BÀI HỌC
- Cài đặt thành công môi trường lập trình Blockchain cơ bản (Node.js, VS Code, Git)
- Hiểu rõ cơ chế hàm băm mật mã (Cryptographic Hashing) và tính chất bất biến (Immutability)
- Khám phá hiệu ứng thác đổ (Avalanche Effect) - Một thay đổi nhỏ → Kết quả hoàn toàn khác
- Mô phỏng cấu trúc Merkle Tree và hiểu được tính quan trọng trong xác thực dữ liệu blockchain
- Thực hành lập trình JavaScript với thư viện crypto cơ bản
- Xây dựng một blockchain đơn giản với các block cơ bản
- Phân tích tính bảo mật và ứng dụng thực tế của blockchain

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

Phần này bao gồm 5 bài tập để hiểu về hashing, merkle tree, blockchain cơ bản, và tính bất biến của blockchain.

### BÀI TẬP 1: Khám Phá Hashing Thông Qua Mô Phỏng Web (30 phút)

**Mục đích:** Hiểu trực quan cách hàm băm SHA-256 thay đổi khi dữ liệu thay đổi (Avalanche Effect).

**Hướng dẫn:**

1. Truy cập trang mô phỏng của Anders Brownworth: https://andersbrownworth.com/blockchain/hash

2. Quan sát phần "Data" - Gõ các nội dung khác nhau:
   - Ví dụ: "Hello" → Xem hash thay đổi
   - Sau đó: "hello" (chữ h thường) → Xem hash lại thay đổi hoàn toàn
   - Tiếp tục với: "Hello " (thêm dấu cách) → Lại thay đổi hoàn toàn

3. Thử thách (Challenge):
   - Vào tab "Blockchain"
   - Cố gắng sửa dữ liệu ở một khối để khối vẫn giữ màu xanh MÀ KHÔNG bấm nút "Mine"
   - Điều này là bất khả thi! Điều này chứng minh tính bất biến của blockchain

4. Tìm hiểu thêm:
   - Vào tab "Block" - Thử thay đổi Nonce để tìm hash bắt đầu bằng "0000"
   - Quan sát thời gian cần thiết để tìm nonce hợp lệ

🔍 **Quan sát:** Dù thay đổi một ký tự nhỏ, hash cũng hoàn toàn khác. Đây là "Avalanche Effect" - một tính chất quan trọng của hàm băm mã hóa.

---

### BÀI TẬP 2: Lập Trình Hashing SHA-256 bằng JavaScript (35 phút)

**Mục đích:** Thực hành tạo mã hash SHA-256 bằng code thực tế, chứng minh tính chất avalanche effect.

**Bước 1:** Tạo thư mục dự án - Mở Command Prompt/Terminal, gõ:
```bash
mkdir Blockchain_Lab1
cd Blockchain_Lab1
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

const input1 = "Blockchain Buoi 1";
const input2 = "blockchain Buoi 1";
const input3 = "Blockchain Buoi 2";
const input4 = "Blockchain Buoi 1 ";

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
console.log(`  Input 1 vs Input 2 khác nhau 1 ký tự → Hash khác nhau hoàn toàn`);
console.log(`  Input 1 vs Input 4 chỉ khác 1 dấu cách → Hash cũng khác hoàn toàn\n`);

console.log('KẾT LUẬN:');
console.log('  ✓ SHA-256 luôn tạo ra hash 64 ký tự');
console.log('  ✓ Chỉ thay đổi 1 ký tự → hash thay đổi hoàn toàn (Avalanche Effect)');
console.log('  ✓ SHA-256 là hàm một chiều - Không thể từ hash tìm ra dữ liệu gốc');
console.log('  ✓ SHA-256 là hàm xác định - Cùng input luôn cho cùng output');
```

**Bước 4:** Chạy code - Nhấn Ctrl + ` để mở Terminal, gõ:
```bash
node hash_test.js
```

**Bước 5 (Mở rộng):** Thêm phần so sánh các thuật toán hash khác:

Tạo file `hash_comparison.js`:

```javascript
const crypto = require('crypto');

function createHash(algorithm, data) {
    return crypto.createHash(algorithm)
                 .update(data)
                 .digest('hex');
}

console.log('===== SO SÁNH CÁC THUẬT TOÁN HASH =====\n');

const data = "Blockchain Bitcoin";

console.log('Input:', data);
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
console.log('  - MD5 không còn được sử dụng vì đã bị crack (128 bits = 32 hex chars)');
```

Chạy:
```bash
node hash_comparison.js
```

---

### BÀI TẬP 3: Mô Phỏng Merkle Tree (45 phút)

**Mục đích:** Hiểu cấu trúc Merkle Tree - Cách blockchain xác thực hiệu quả dữ liệu thông qua băm cây.

**Khái niệm:** Merkle Tree là cấu trúc dữ liệu dạng cây, nơi mỗi nút là hash của hai nút con. Merkle Root (gốc cây) là hash cuối cùng, đại diện toàn bộ dữ liệu.

**Bước 1:** Tạo file `merkle_test.js`

**Bước 2:** Dán code dưới đây:

```javascript
const crypto = require('crypto');

function quickHash(data) {
    return crypto.createHash('sha256')
                 .update(data)
                 .digest('hex')
                 .substring(0, 16);
}

console.log('===== THỰC HÀNH: MERKLE TREE =====\n');

// Dữ liệu gốc (Transactions)
let tx1 = "Giao dich A->B: 10 BTC";
let tx2 = "Giao dich C->D: 5 BTC";
let tx3 = "Giao dich E->F: 8 BTC";
let tx4 = "Giao dich G->H: 3 BTC";

console.log('TRANSACTION LAYER (Lớp 0):');
console.log(`  TX1: ${tx1}`);
console.log(`  TX2: ${tx2}`);
console.log(`  TX3: ${tx3}`);
console.log(`  TX4: ${tx4}\n`);

// Hash từng transaction
let h1 = quickHash(tx1);
let h2 = quickHash(tx2);
let h3 = quickHash(tx3);
let h4 = quickHash(tx4);

console.log('HASH LAYER (Lớp 1):');
console.log(`  H1 = hash(TX1) = ${h1}`);
console.log(`  H2 = hash(TX2) = ${h2}`);
console.log(`  H3 = hash(TX3) = ${h3}`);
console.log(`  H4 = hash(TX4) = ${h4}\n`);

// Tạo cây
let h12 = quickHash(h1 + h2);
let h34 = quickHash(h3 + h4);

console.log('BRANCH LAYER (Lớp 2):');
console.log(`  H12 = hash(H1 + H2) = ${h12}`);
console.log(`  H34 = hash(H3 + H4) = ${h34}\n`);

// Merkle Root
let merkleRoot = quickHash(h12 + h34);

console.log('MERKLE ROOT (Lớp 3 - Gốc):');
console.log(`  Root = hash(H12 + H34) = ${merkleRoot}\n`);

// Test: Thay đổi một transaction
console.log('--- KIỂM ĐỊNH: THAY ĐỔI TX1 ---');
let tx1_modified = "Giao dich A->B: 100 BTC";  // Thay đổi từ 10 BTC thành 100 BTC
let h1_modified = quickHash(tx1_modified);
let h12_modified = quickHash(h1_modified + h2);
let merkleRoot_modified = quickHash(h12_modified + h34);

console.log(`TX1 (sửa): ${tx1_modified}`);
console.log(`H1 (mới):  ${h1_modified}`);
console.log(`Root (cũ): ${merkleRoot}`);
console.log(`Root (mới): ${merkleRoot_modified}`);
console.log(`\nKết luận: Nếu thay đổi bất kỳ TX nào, Merkle Root sẽ thay đổi!`);
console.log(`Điều này cho phép phát hiện sự thay đổi dữ liệu ngay lập tức.`);
```

**Bước 3:** Chạy code - Gõ lệnh:
```bash
node merkle_test.js
```

**Bước 4 (Mở rộng):** Tạo Merkle Tree với số lượng transaction linh hoạt

Tạo file `merkle_tree_dynamic.js`:

```javascript
const crypto = require('crypto');

function hash(data) {
    return crypto.createHash('sha256')
                 .update(data)
                 .digest('hex')
                 .substring(0, 16);
}

function buildMerkleTree(transactions) {
    console.log(`\n=== MERKLE TREE (${transactions.length} transactions) ===\n`);
    
    let level = 0;
    let currentLevel = transactions.map((tx, idx) => {
        console.log(`[Level ${level}] TX${idx + 1}: ${tx.substring(0, 30)}... → ${hash(tx)}`);
        return hash(tx);
    });
    
    while (currentLevel.length > 1) {
        level++;
        let nextLevel = [];
        for (let i = 0; i < currentLevel.length; i += 2) {
            let left = currentLevel[i];
            let right = i + 1 < currentLevel.length ? currentLevel[i + 1] : left;
            let parent = hash(left + right);
            console.log(`[Level ${level}] ${left} + ${right} → ${parent}`);
            nextLevel.push(parent);
        }
        currentLevel = nextLevel;
    }
    
    console.log(`\n📍 Merkle Root: ${currentLevel[0]}\n`);
    return currentLevel[0];
}

// Test với số lượng transaction khác nhau
const tx_2 = ["TX1: A->B 10", "TX2: C->D 5"];
const tx_4 = ["TX1: A->B 10", "TX2: C->D 5", "TX3: E->F 8", "TX4: G->H 3"];
const tx_8 = [
    "TX1: A->B 10", "TX2: C->D 5", "TX3: E->F 8", "TX4: G->H 3",
    "TX5: I->J 2", "TX6: K->L 7", "TX7: M->N 4", "TX8: O->P 6"
];

buildMerkleTree(tx_2);
buildMerkleTree(tx_4);
buildMerkleTree(tx_8);
```

Chạy:
```bash
node merkle_tree_dynamic.js
```

---

### BÀI TẬP 4: Xây Dựng Một Block Blockchain Đơn Giản (50 phút)

**Mục đích:** Hiểu cấu trúc của một block blockchain và cách các block liên kết với nhau.

**Khái niệm:** Mỗi block chứa dữ liệu, merkle root, timestamp, previous hash, nonce, và hash của block hiện tại.

**Bước 1:** Tạo file `simple_blockchain.js`:

```javascript
const crypto = require('crypto');

// Lớp Block
class Block {
    constructor(index, timestamp, transactions, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        const blockString = JSON.stringify({
            index: this.index,
            timestamp: this.timestamp,
            transactions: this.transactions,
            previousHash: this.previousHash,
            nonce: this.nonce
        });
        return crypto.createHash('sha256')
                     .update(blockString)
                     .digest('hex');
    }

    // Chứng minh công việc (Proof of Work)
    mineBlock(difficulty) {
        const target = '0'.repeat(difficulty);
        console.log(`  ⛏️  Mining block #${this.index}...`);
        
        while (!this.hash.startsWith(target)) {
            this.nonce++;
            this.hash = this.calculateHash();
            
            if (this.nonce % 100000 === 0) {
                process.stdout.write(`\r  Nonce: ${this.nonce}`);
            }
        }
        console.log(`\r  ✓ Block mined! Nonce: ${this.nonce}`);
    }
}

// Lớp Blockchain
class Blockchain {
    constructor() {
        this.chain = [];
        this.difficulty = 2;
        
        // Tạo Genesis Block (Block đầu tiên)
        const genesisBlock = new Block(
            0,
            new Date('2024-01-01').toISOString(),
            ["Genesis Block - Khởi đầu blockchain"],
            "0"
        );
        genesisBlock.mineBlock(this.difficulty);
        this.chain.push(genesisBlock);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

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

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Kiểm tra hash của block hiện tại
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log(`  ❌ Block #${i} hash không hợp lệ!`);
                return false;
            }

            // Kiểm tra previousHash
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log(`  ❌ Block #${i} previousHash không khớp!`);
                return false;
            }
        }
        console.log(`  ✓ Blockchain hợp lệ!`);
        return true;
    }

    displayChain() {
        console.log('\n📊 BLOCKCHAIN CHAIN:\n');
        this.chain.forEach((block, idx) => {
            console.log(`Block #${block.index}:`);
            console.log(`  Timestamp: ${block.timestamp}`);
            console.log(`  Transactions: ${block.transactions.length}`);
            console.log(`  Previous Hash: ${block.previousHash.substring(0, 16)}...`);
            console.log(`  Hash: ${block.hash.substring(0, 16)}...`);
            console.log(`  Nonce: ${block.nonce}`);
            console.log('');
        });
    }
}

// Thực hành
console.log('===== XÂY DỰNG BLOCKCHAIN ĐƠN GIẢN =====\n');

const blockchain = new Blockchain();

console.log('\n--- Thêm Block 1 ---');
blockchain.addBlock([
    "TX1: Alice -> Bob: 10 BTC",
    "TX2: Charlie -> David: 5 BTC"
]);

console.log('\n--- Thêm Block 2 ---');
blockchain.addBlock([
    "TX3: Eve -> Frank: 7 BTC",
    "TX4: Grace -> Henry: 3 BTC"
]);

console.log('\n--- Thêm Block 3 ---');
blockchain.addBlock([
    "TX5: Ivy -> Jack: 8 BTC"
]);

blockchain.displayChain();

// Kiểm tra tính hợp lệ
console.log('\n--- KIỂM ĐỊNH BLOCKCHAIN ---');
blockchain.isChainValid();

// Thử sửa dữ liệu
console.log('\n--- THỬ SỬA DỮ LIỆU BLOCK #1 ---');
console.log('Sửa transaction trong block #1...');
blockchain.chain[1].transactions[0] = "TX1: Alice -> Bob: 1000 BTC";
console.log('Block đã được sửa. Kiểm tra lại:');
blockchain.isChainValid();
```

**Bước 2:** Chạy code:
```bash
node simple_blockchain.js
```

---

### BÀI TẬP 5: Phân Tích Tính Bảo Mật & Ứng Dụng Thực Tế (60 phút)

**Mục đích:** Hiểu các khía cạnh bảo mật của blockchain và ứng dụng thực tế.

**Bước 1:** Tạo file `security_analysis.js`:

```javascript
const crypto = require('crypto');

console.log('===== PHÂN TÍCH TÍNH BẢO MẬT BLOCKCHAIN =====\n');

// 1. ĐIỀU KIỆN KHÓ GIẢ MẠO
console.log('1️⃣  KHÓ GIẢ MẠO LỊCH SỬ (Immutability)\n');

function block(index, data, prevHash, nonce) {
    const blockData = JSON.stringify({ index, data, prevHash, nonce });
    return crypto.createHash('sha256').update(blockData).digest('hex');
}

let hash0 = block(0, "Genesis", "0", 0);
let hash1 = block(1, "Block 1", hash0, 0);
let hash2 = block(2, "Block 2", hash1, 0);

console.log(`Block 0 hash: ${hash0}`);
console.log(`Block 1 hash: ${hash1}`);
console.log(`Block 2 hash: ${hash2}`);

console.log('\nNếu sửa Block 1:');
let hash1_modified = block(1, "Block 1 MODIFIED", hash0, 0);
console.log(`Block 1 hash (mới): ${hash1_modified}`);
console.log(`→ Block 2 phải sửa lại vì previousHash không khớp`);
console.log(`→ Block 3, 4, 5... cũng phải sửa lại`);
console.log(`→ Càng sửa lâu, càng nhiều block phải sửa\n`);

// 2. PROOF OF WORK - CHẢ CHỨNG CÔNG VIỆC
console.log('2️⃣  PROOF OF WORK (PoW) - Chứng Minh Công Việc\n');

function findNonce(data, difficulty) {
    let nonce = 0;
    const target = '0'.repeat(difficulty);
    
    while (true) {
        const hash = crypto.createHash('sha256')
                          .update(data + nonce)
                          .digest('hex');
        if (hash.startsWith(target)) {
            return { nonce, hash };
        }
        nonce++;
    }
}

console.log('Tìm nonce cho "Block Data" với difficulty = 3');
let result = findNonce("Block Data", 3);
console.log(`Nonce: ${result.nonce}`);
console.log(`Hash: ${result.hash}`);
console.log(`Cần ${result.nonce} lần thử!\n`);

// 3. TĂNG DIFFICULTY
console.log('3️⃣  TẠI SAO TĂNG DIFFICULTY LÀ KHÓ?\n');

console.log('Difficulty 2: Cần ~100 lần tính toán');
console.log('Difficulty 3: Cần ~1000 lần tính toán');
console.log('Difficulty 4: Cần ~10000 lần tính toán');
console.log('Difficulty 6 (Bitcoin hiện tại): Cần ~1,000,000,000,000 lần tính toán!');
console.log('\nBit coin chỉnh difficulty mỗi 2 tuần để giữ thời gian block ~10 phút\n');

// 4. PHÂN TÍCH TẤN CÔNG 51%
console.log('4️⃣  TẤN CÔNG 51% - GIỚI HẠN\n');

function simulateChain(chainLength) {
    let chain = [];
    let prevHash = "0";
    
    for (let i = 0; i < chainLength; i++) {
        let nonce = 0;
        const target = '00';
        let hash;
        
        while (true) {
            hash = crypto.createHash('sha256')
                        .update(`Block${i}${prevHash}${nonce}`)
                        .digest('hex');
            if (hash.startsWith(target)) break;
            nonce++;
        }
        
        chain.push({ index: i, hash, nonce });
        prevHash = hash;
    }
    
    return chain;
}

console.log('Nếu attacker kiểm soát 51% sức mạnh tính toán:');
console.log('- Attacker có thể tạo chuỗi blockchain riêng (fork chain)');
console.log('- Nhưng phải tính toán nhanh hơn 49% còn lại của mạng');
console.log('- Càng lâu, càng khó (sơ sâu = chi phí tính toán cao)');
console.log('- Ngay cả 51% cũng chỉ có thể đảo ngược giao dịch gần đây');
console.log('- Chi phí tấn công > lợi lãi từ gian lận\n');

// 5. CRYPTOGRAPHIC HASH PROPERTIES
console.log('5️⃣  TÍNH CHẤT CỦA HÀM HASH MÃ HÓA\n');

const data1 = "Bitcoin";
const data2 = "Bitcoin";
const data3 = "bitcoin";

const h1 = crypto.createHash('sha256').update(data1).digest('hex');
const h2 = crypto.createHash('sha256').update(data2).digest('hex');
const h3 = crypto.createHash('sha256').update(data3).digest('hex');

console.log(`a) DETERMINISTIC (Xác định):`);
console.log(`   hash("${data1}") = ${h1.substring(0, 16)}...`);
console.log(`   hash("${data2}") = ${h2.substring(0, 16)}...`);
console.log(`   → Luôn bằng nhau!\n`);

console.log(`b) SENSITIVE (Nhạy cảm):`);
console.log(`   hash("${data1}") = ${h1.substring(0, 16)}...`);
console.log(`   hash("${data3}") = ${h3.substring(0, 16)}...`);
console.log(`   → Chỉ sai 1 ký tự → Hash khác hoàn toàn!\n`);

console.log(`c) ONE-WAY (Một chiều):`);
console.log(`   Không thể từ hash tìm ra dữ liệu gốc`);
console.log(`   → Phải brute force hoặc rainbow table\n`);

console.log(`d) AVALANCHE EFFECT (Hiệu ứng thác đổ):`);
console.log(`   1 bit thay đổi → 50% bit trong hash thay đổi`);
console.log(`   → Không thể dự đoán hash từ dữ liệu tương tự\n`);

// 6. ỨNG DỤNG THỰC TẾ
console.log('6️⃣  ỨNG DỤNG THỰC TẾ CỦA BLOCKCHAIN\n');

const applications = [
    "Bitcoin: Giao dịch tiền tệ điện tử",
    "Ethereum: Smart Contracts & DApps",
    "Chuỗi cung ứng: Theo dõi nguồn gốc sản phẩm",
    "Y tế: Lưu trữ hồ sơ bệnh nhân an toàn",
    "Bất động sản: Ghi chép quyền sở hữu",
    "Giáo dục: Bằng cấp kỹ thuật số",
    "Bầu cử: Bỏ phiếu điện tử an toàn"
];

applications.forEach((app, idx) => {
    console.log(`   ${idx + 1}. ${app}`);
});

console.log('\n');
```

**Bước 2:** Chạy code:
```bash
node security_analysis.js
```

**Bước 3 (Tùy chọn):** Tạo tài liệu So Sánh Blockchain vs Database Truyền Thống

Tạo file `blockchain_vs_database.md`:

```markdown
# So Sánh Blockchain vs Database Truyền Thống

## 1. Cấu Trúc Dữ Liệu

| Yếu Tố | Database | Blockchain |
|--------|----------|-----------|
| Cấu trúc | Table, Index, Keys | Linked List, Tree |
| Sắp xếp | Centralized | Distributed |
| Kiểm soát | Admin/DBA | Smart Contracts |

## 2. Tính Bảo Mật

| Yếu Tố | Database | Blockchain |
|--------|----------|-----------|
| Lưu trữ | Server trung tâm | Các node phân tán |
| Sửa đổi | Admin có thể sửa | Không thể sửa (Immutable) |
| Xác thực | Username/Password | Cryptographic Hash |
| Lịch sử | Có thể xóa log | Log không thể xóa |

## 3. Hiệu Suất

| Yếu Tố | Database | Blockchain |
|--------|----------|-----------|
| Tốc độ | Rất nhanh (ms) | Chậm hơn (s) |
| Thông lượng | 10,000+ TPS | Tùy theo loại (BTC: 7 TPS) |
| Độ trễ | Thấp | Cao hơn |

## 4. Khi Nào Dùng

### Dùng Database:
- Cần tốc độ cao
- Dữ liệu thay đổi thường xuyên
- Cần kiểm soát trung tâm
- Ít người truy cập

### Dùng Blockchain:
- Cần tính minh bạch
- Cần lịch sử không thay đổi
- Nhiều bên tham gia cùng tin tưởng
- Không có trung tâm quản lý
```

---

## IV. BÁO CÁO THỰC HÀNH (10 phút)

**Yêu cầu:** Sinh viên cần hoàn thành báo cáo sau khi kết thúc thực hành.

### Hướng Dẫn Nộp Bài:

1. **Bước 1:** Chụp ảnh màn hình (Screenshot) kết quả Terminal từ tất cả 5 bài tập

2. **Bước 2:** Tạo file Word (hoặc Google Docs) có tên: 
   `BaoCao_Blockchain_Buoi1_[TenHocSinh].docx`

3. **Bước 3:** Nộp file PDF bao gồm:
   - 5 ảnh screenshot kết quả chạy code (1 cho mỗi bài tập)
   - Trả lời các câu hỏi dưới đây

---

## ❓ CÂU HỎI BÁO CÁO (10 câu):

### **Câu 1:** SHA-256 Hash có độ dài bao nhiêu ký tự?
**Gợi ý:** Quan sát output của hash_test.js, đếm số ký tự. SHA-256 = 256 bits = ? hex characters

### **Câu 2:** Tại sao thay đổi chỉ 1 ký tự trong dữ liệu gốc, mã Hash lại thay đổi hoàn toàn?
**Gợi ý:** Đây là "Avalanche Effect". Giải thích tại sao đây là tính chất quan trọng của hàm băm mã hóa.

### **Câu 3:** Nếu thay đổi nội dung tx1 trong merkle_test.js, Merkle Root có thay đổi không? Giải thích tại sao?
**Gợi ý:** Thay đổi tx1 → H1 thay đổi → H12 thay đổi → Merkle Root thay đổi.

### **Câu 4:** Merkle Tree có lợi ích gì so với việc hash toàn bộ dữ liệu cùng lúc?
**Gợi ý:** Lợi ích về hiệu suất, khả năng xác thực từng phần, phát hiện lỗi nhanh.

### **Câu 5:** Nêu 3 tính chất quan trọng của SHA-256 mà bạn đã quan sát được.
**Gợi ý:** Tính xác định (Deterministic), bất biến (Immutability), một chiều (One-way), Avalanche Effect.

### **Câu 6:** Trong bài tập 4 (Simple Blockchain), nonce là gì? Tại sao cần nonce?
**Gợi ý:** Nonce = Number used once. Dùng để tìm hash bắt đầu bằng các số 0, chứng minh công việc (Proof of Work).

### **Câu 7:** Khi bạn sửa một block trong blockchain, điều gì sẽ xảy ra?
**Gợi ý:** Block hiện tại hash thay đổi → Block tiếp theo previousHash không khớp → Cần recalculate lại tất cả các block sau.

### **Câu 8:** Proof of Work (PoW) có tác dụng gì trong blockchain?
**Gợi ý:** PoW dùng để xác minh (mining), ngăn spam attacks, làm tăng chi phí tấn công blockchain.

### **Câu 9:** Blockchain khác gì so với database truyền thống về tính bảo mật?
**Gợi ý:** Blockchain là distributed ledger, database là centralized. Blockchain immutable, database có thể sửa.

### **Câu 10:** Nêu 3 ứng dụng thực tế của blockchain (ngoài tiền tệ điện tử).
**Gợi ý:** Chuỗi cung ứng, y tế, giáo dục, bất động sản, bầu cử, etc.

---

## TIÊU CHÍ CHẤM ĐIỂM:

| Tiêu chí | Điểm | Mô tả |
|----------|------|-------|
| Hoàn thành các bài tập | 4 | Cài đặt đúng, chạy thành công cả 5 bài tập, có 5 screenshot |
| Trả lời câu hỏi | 4 | Trả lời đầy đủ 10 câu, chính xác, có giải thích rõ ràng |
| Hiểu biết khái niệm | 2 | Thể hiện hiểu rõ về hashing, merkle tree, blockchain, tính bất biến, PoW |
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
1. Thay đổi hàm hash từ SHA-256 sang SHA-1 hoặc SHA-512 và so sánh
2. Tạo một blockchain với 5 block, mỗi block có 3 giao dịch
3. Mô phỏng quá trình mining với difficulty = 4, 5, 6 và so sánh thời gian
4. Xây dựng web interface (HTML/CSS/JavaScript) để trực quan hóa blockchain
5. Thử tấn công blockchain (modify 1 block) và quan sát chuỗi bị phá vỡ
6. Triển khai Digital Signature (sử dụng crypto.createPrivateKey)
7. Tạo API REST để interact với blockchain (dùng Express.js)
8. So sánh hiệu suất SHA-256 vs SHA-512 vs MD5
9. Xây dựng Merkle Tree với visualization
10. Tìm hiểu về các loại blockchain khác (Proof of Stake, Layer 2, etc.)

### Sách Tham Khảo:
- "Mastering Bitcoin" - Andreas M. Antonopoulos
- "Mastering Ethereum" - Andreas M. Antonopoulos & Gavin Wood
- "The Bitcoin Standard" - Saifedean Ammous

---

## CHÚC BẠN HOÀN THÀNH THÀNH CÔNG BÀI THỰC HÀNH!

