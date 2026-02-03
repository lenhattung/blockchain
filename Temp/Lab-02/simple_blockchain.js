const crypto = require("crypto");

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
    constructor(index, timestamp, transactions, previousHash){
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0; // Number used once -> sử dụng trong Proof of work
        this.hash = this.calculateHash();
    }
    // Tính hash của block hiện tại
    calculateHash(){
        const blockData = {
            index: this.index,
            timestamp: this.timestamp,
            transactions: this.transactions,
            previousHash: this.previousHash,
            nonce: this.nonce
        };
        return calculateHash(blockData);
    }

    // Chứng minh công việc (PoW - Proof of Work)
    // Tìm nonce sao cho hash bắt đầu bằng số lượng số 0 bằng difficulty
    mineBlock(difficulty){
        const target = '0'.repeat(difficulty);
        console.log(`... Mining block #${this.index} ...`);
       
        const startTime = Date.now();
       // Bắt đầu đào
        while(!this.hash.startsWith(target)){
            this.nonce++;
            this.hash = this.calculateHash();

            // In tiến độ mỗi 50000 lần thử
            if(this.nonce%50000===0){
                process.stdout.write(`\r Tried: ${this.nonce} nonces`);
            }
        }
        // Tìm ra được nonce thỏa mãn
        const endTime = Date.now();
        const timeTaken = endTime - startTime;

        console.log(`\r  Block #${this.index} mined!`);
        console.log(`    Nonce: ${this.nonce}`);
        console.log(`    Hash: ${this.hash}`);
        console.log(`    Time: ${timeTaken}ms\n`);
    }
}

// ============================================
// LỚP BLOCKCHAIN (Chuỗi khối)
// ============================================
class Blockchain {
    constructor(difficulty = 2){
        this.chain = [];
        this.difficulty = difficulty;

        // Tạo Genesis Block (khối đầu tiên)
        console.log('Creating Genesis Block .... \n');
        const genesisBlock = new Block(
            0,
            new Date('2024-01-01').toISOString(),
            ["Genesis Block - khởi đầu blockchain"],
            "0"
        );
        genesisBlock.mineBlock(this.difficulty);
        this.chain.push(genesisBlock);
    }

    // Lấy block cuối cung trong chain
    getLastestBlock(){
        return this.chain[this.chain.length-1];
    }

    // Thêm block mới vào blockchain
    addBlock(transactions){
        const newBlock = new Block(
            this.chain.length,
            new Date().toISOString,
            transactions,
            this.getLastestBlock.hash
        );
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        return newBlock;
    }

    // Kiểm tra blockchain có hợp lệ hay không
    isChainValid(){
        console.log("\n --- VALIDATING BLOCKCHAIN --- \n");
        for(let i =1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            // Kiểm tra hash của block hiện tại
            const recalculatedHash = currentBlock.calculateHash();
            if (currentBlock.hash !== recalculatedHash){
                console.log(` Block #${i}: Hash không khớp!`);
                console.log(`    Expected: ${recalculatedHash}`);
                console.log(`    Got:      ${currentBlock.hash}`);
                return false;
            }

            // Kiểm tra previousHash trỏ tới block trước
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log(`   Block #${i}: Previous hash không khớp!`);
                console.log(`   Expected: ${previousBlock.hash}`);
                console.log(`   Got:      ${currentBlock.previousHash}`);
                return false;
            }

            // Hợp lệ
            console.log(`Block #${i}: Valid`);
        }
         console.log(`\n===== Blockchain hoàn toàn hợp lệ ==== \n`);
         return true;
    }

    // Hiển thị blockchain
    displayChain(){
        console.log('\n' + '='.repeat(80));
        console.log('BLOCKCHAIN CHAIN');
        console.log('='.repeat(80) + '\n');

        this.chain.forEach((block, idx)=>{
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
            console.log(`   Previous Hash: ${block.previousHash}...`);
            console.log(`   Hash:          ${block.hash}...`);
            console.log(`   Nonce:         ${block.nonce}`);
            console.log('');
        });
        console.log('='.repeat(80)+'\n');
    }
}

// ============================================
// THỰC HÀNH BLOCKCHAIN
// ============================================
console.log('='.repeat(100)+"\n");
console.log("XÂY DỰNG BLOCKCHAIN CƠ BẢN");
console.log('='.repeat(100)+"\n");
const blockchain = new Blockchain(6); difficulty=2

// Thêm block 1
console.log("THÊM BLOCK 1");
blockchain.addBlock([
    "TX1: Tung -> A: 10 BTC",
    'TX2: An -> C: 5 BTC'
]);

// Thêm block 2
console.log("THÊM BLOCK 2");
blockchain.addBlock([
    "TX3: Eve -> Frank: 7 BTC",
    "TX4: Grace -> Henry: 3 BTC",
    "TX5: Ivy -> Jack: 2 BTC"
]);

// Thêm block 3
console.log("THÊM BLOCK 3");
blockchain.addBlock([
    "TX6: Kelly -> Leo: 8 BTC"
]);

// Hiển thị blockchain
blockchain.displayChain();

// Kiểm tra tính hợp lệ
blockchain.isChainValid();

// CỐ TÌNH GIẢ MẠO NỘI DUNG
console.log("THỦ GIẢ MẠO NỘI DUNG");
console.log('Bước 1: Sửa transaction trong Block #1\n');
console.log(blockchain.chain[1].transactions[0]);
blockchain.chain[1].transactions[0] = blockchain.chain[1].transactions[0]+"AAAAA";
console.log(blockchain.chain[1].transactions[0]);

console.log('Bước 2: Kiểm tra blockchain lại\n');
const isValid = blockchain.isChainValid();
if (!isValid) {
    console.log('✓ Sự thay đổi được phát hiện thành công!');
    console.log('✓ Blockchain bảo vệ dữ liệu khỏi thay đổi không được phép!\n');
}
