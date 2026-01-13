# Khóa Học Blockchain - Buổi 1 & 2 (Gộp)
## Nội Dung Thực Hành: 5 Tiết

---

### **Tiết 1: Cài Đặt Môi Trường & Giới Thiệu CLI**
**Mục tiêu:** Trang bị công cụ cơ bản để bắt đầu học Blockchain

**Nội dung:**
- Cài đặt Node.js (LTS - hiện tại v20 hoặc v22)
- Cài đặt Docker và Docker Compose
- Giới thiệu Command Line Interface (CLI):
  - Lệnh cơ bản: `ls`, `cd`, `mkdir`, `touch`, `cat`
  - Kiểm tra phiên bản: `node --version`, `npm --version`, `docker --version`
- Tạo thư mục dự án và khởi tạo npm project: `npm init -y`

**Kết quả đạt được:**
- Môi trường phát triển sẵn sàng
- Có thể chạy lệnh npm và Node.js

---

### **Tiết 2: Tìm Hiểu Hàm Băm SHA-256 (Hands-on)**
**Mục tiêu:** Hiểu khái niệm hashing và tính bất biến của dữ liệu

**Nội dung:**
1. **Thực hành trên trực tuyến:**
   - Sử dụng công cụ online: [SHA256 Hash Generator](https://www.online-toolz.com/tools/text-hash-sha256)
   - Nhập các dữ liệu khác nhau, quan sát output hash
   - Thay đổi 1 ký tự, thấy hash thay đổi hoàn toàn (Avalanche Effect)

2. **Thực hành với Python:**
   ```python
   import hashlib
   
   # Hash một chuỗi
   text = "Hello Blockchain"
   hash_result = hashlib.sha256(text.encode()).hexdigest()
   print(f"Hash: {hash_result}")
   
   # Thay đổi 1 ký tự và so sánh
   text2 = "Hello Blockchain!"
   hash_result2 = hashlib.sha256(text2.encode()).hexdigest()
   print(f"Hash khác: {hash_result2}")
   print(f"Giống nhau? {hash_result == hash_result2}")
   ```

**Kết quả đạt được:**
- Hiểu tính chất của hàm hash (deterministic, one-way, sensitive)
- Biết cách blockchain sử dụng hash để đảm bảo bất biến

---

### **Tiết 3: Chữ Ký Số & Cặp Khóa Public/Private (Simulation)**
**Mục tiêu:** Hiểu nguyên tắc xác thực và mật mã hóa khóa công khai

**Nội dung:**
1. **Thực hành tạo khóa cặp (Keypair):**
   - Sử dụng công cụ online: [Ethereum Keypair Generator](https://www.keytool.online/ec-key-generator)
   - Tạo cặp Public Key và Private Key
   - Lưu ý: Bảo mật Private Key (không bao giờ chia sẻ!)

2. **Mô phỏng chữ ký số với Python:**
   ```python
   from cryptography.hazmat.primitives import hashes
   from cryptography.hazmat.primitives.asymmetric import rsa, padding
   from cryptography.hazmat.backends import default_backend
   
   # 1. Tạo cặp khóa
   private_key = rsa.generate_private_key(
       public_exponent=65537,
       key_size=2048,
       backend=default_backend()
   )
   public_key = private_key.public_key()
   
   # 2. Ký một thông điệp
   message = b"Giao dich 100 coin tu A den B"
   signature = private_key.sign(
       message,
       padding.PSS(
           mgf=padding.MGF1(hashes.SHA256()),
           salt_length=padding.PSS.MAX_LENGTH
       ),
       hashes.SHA256()
   )
   
   # 3. Xác minh chữ ký
   try:
       public_key.verify(
           signature,
           message,
           padding.PSS(
               mgf=padding.MGF1(hashes.SHA256()),
               salt_length=padding.PSS.MAX_LENGTH
           ),
           hashes.SHA256()
       )
       print("✓ Chữ ký hợp lệ!")
   except:
       print("✗ Chữ ký không hợp lệ!")
   ```

3. **Thực hành trực tuyến:** 
   - Sử dụng [OpenSSL Online](https://www.8gwifi.org/genrsa.jsp)
   - Tạo RSA keypair và thực hiện encrypt/decrypt

**Kết quả đạt được:**
- Hiểu cơ chế chữ ký số
- Nắm rõ vai trò Private/Public Key trong blockchain

---

### **Tiết 4: Xây Dựng Blockchain Đơn Giản Phần 1 (JavaScript)**
**Mục tiêu:** Tạo nên khối (Block) đầu tiên và hiểu cấu trúc cơ bản

**Nội dung:**
1. **Cài đặt thư viện crypto:**
   ```bash
   npm install crypto-js
   ```

2. **Tạo file `block.js`:**
   ```javascript
   const CryptoJS = require("crypto-js");
   
   class Block {
       constructor(index, timestamp, data, previousHash) {
           this.index = index;
           this.timestamp = timestamp;
           this.data = data;
           this.previousHash = previousHash;
           this.hash = this.calculateHash();
       }
   
       calculateHash() {
           return CryptoJS.SHA256(
               this.index +
               this.timestamp +
               JSON.stringify(this.data) +
               this.previousHash
           ).toString();
       }
   }
   
   module.exports = Block;
   ```

3. **Tạo file `blockchain.js` phần 1:**
   ```javascript
   const Block = require("./block");
   
   class Blockchain {
       constructor() {
           this.chain = [];
           this.createGenesisBlock();
       }
   
       createGenesisBlock() {
           const genesisBlock = new Block(
               0,
               new Date().toISOString(),
               "Genesis Block",
               "0"
           );
           this.chain.push(genesisBlock);
       }
   
       getLatestBlock() {
           return this.chain[this.chain.length - 1];
       }
   
       addBlock(data) {
           const newBlock = new Block(
               this.chain.length,
               new Date().toISOString(),
               data,
               this.getLatestBlock().hash
           );
           this.chain.push(newBlock);
       }
   }
   
   module.exports = Blockchain;
   ```

4. **Test blockchain:**
   ```javascript
   const Blockchain = require("./blockchain");
   
   const myChain = new Blockchain();
   myChain.addBlock({ sender: "Alice", receiver: "Bob", amount: 50 });
   myChain.addBlock({ sender: "Bob", receiver: "Charlie", amount: 30 });
   
   console.log(JSON.stringify(myChain.chain, null, 2));
   ```

**Kết quả đạt được:**
- Hiểu cấu trúc Block
- Thành công tạo và liên kết các Block

---

### **Tiết 5: Xây Dựng Blockchain Đơn Giản Phần 2 (Validation & Demo)**
**Mục tiêu:** Thêm xác thực và thể hiện tính bất biến của blockchain

**Nội dung:**
1. **Bổ sung phương thức xác thực trong `blockchain.js`:**
   ```javascript
   isChainValid() {
       for (let i = 1; i < this.chain.length; i++) {
           const currentBlock = this.chain[i];
           const previousBlock = this.chain[i - 1];
   
           // Kiểm tra hash của block hiện tại
           if (currentBlock.hash !== currentBlock.calculateHash()) {
               console.log("❌ Block", i, "bị thay đổi!");
               return false;
           }
   
           // Kiểm tra previousHash trỏ đúng tới block trước
           if (currentBlock.previousHash !== previousBlock.hash) {
               console.log("❌ Chuỗi bị ngắt tại Block", i);
               return false;
           }
       }
       console.log("✓ Blockchain hợp lệ!");
       return true;
   }
   
   displayChain() {
       console.log("\n========== BLOCKCHAIN ==========");
       this.chain.forEach((block, index) => {
           console.log(`\nBlock #${index}:`);
           console.log(`  Data: ${JSON.stringify(block.data)}`);
           console.log(`  Hash: ${block.hash.substring(0, 20)}...`);
           console.log(`  Previous Hash: ${block.previousHash.substring(0, 20)}...`);
       });
       console.log("\n================================\n");
   }
   ```

2. **Bài tập thực hành - Thử tấn công blockchain:**
   ```javascript
   const Blockchain = require("./blockchain");
   
   const myChain = new Blockchain();
   myChain.addBlock({ sender: "Alice", receiver: "Bob", amount: 50 });
   myChain.addBlock({ sender: "Bob", receiver: "Charlie", amount: 30 });
   
   console.log("1. Blockchain ban đầu:");
   myChain.displayChain();
   myChain.isChainValid();
   
   // Cố gắng thay đổi dữ liệu
   console.log("\n2. Hacker thay đổi giao dịch của Alice:");
   myChain.chain[1].data = { sender: "Alice", receiver: "Hacker", amount: 5000 };
   myChain.displayChain();
   myChain.isChainValid();  // ❌ Sẽ phát hiện sự thay đổi
   
   // Cố gắng tính lại hash
   console.log("\n3. Hacker tính lại hash của block 1:");
   myChain.chain[1].hash = myChain.chain[1].calculateHash();
   myChain.isChainValid();  // ❌ Vẫn không được vì previousHash không khớp
   ```

3. **Bài tập mở rộng (nếu còn thời gian):**
   - Thêm phương thức `mineBlock()` với Proof of Work cơ bản
   - Thử tăng difficulty để thấy rõ sức mạnh của blockchain

**Kết quả đạt được:**
- Xây dựng blockchain đầy đủ tính năng cơ bản
- Hiểu rõ tính bất biến (immutability) của blockchain
- Biết cách phát hiện sự can thiệp dữ liệu

---

## Tóm Tắt 5 Tiết

| Tiết | Nội Dung | Kỹ Năng Đạt Được |
|------|----------|-----------------|
| 1 | Cài đặt môi trường | Setup Node.js, Docker, CLI |
| 2 | Hàm SHA-256 | Hiểu hashing, tính bất biến |
| 3 | Chữ ký số & Keypair | Mã hóa, xác thực, bảo mật |
| 4 | Xây dựng Block & Blockchain (Phần 1) | Cấu trúc Block, liên kết |
| 5 | Validation & Demo (Phần 2) | Xác thực, phát hiện thay đổi |

---

## Tài Liệu Tham Khảo
- [Crypto-js Documentation](https://cryptojs.gitbook.io/docs/)
- [Node.js Official](https://nodejs.org/)
- [Online SHA256 Tool](https://www.online-toolz.com/tools/text-hash-sha256)
- [Ethereum Keypair Generator](https://www.keytool.online/ec-key-generator)
