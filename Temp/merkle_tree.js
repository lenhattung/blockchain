const crypto = require('crypto');

function quickHash(data){
    return crypto.createHash('sha256')
        .update(data)
        .digest('hex');
}

console.log("=== THỰC HÀNH: MERKLE TREE ===\n");

// Dữ liệu gốc (transactions)
let tx1 = "Giao dich A->B: 10 BTC";
let tx2 = "Giao dich C->D: 5 BTC";
let tx3 = "Giao dich E->F: 8 BTC";
let tx4 = "Giao dich G->H: 3 BTC";

console.log("TRANSACTION LAYER (Lớp 0 - Dữ liệu gốc):");
console.log(`   TX1: ${tx1}`);
console.log(`   TX2: ${tx2}`);
console.log(`   TX3: ${tx3}`);
console.log(`   TX4: ${tx4}\n`);

// Hash từng transaction
let h1 = quickHash(tx1);
let h2 = quickHash(tx2);
let h3 = quickHash(tx3);
let h4 = quickHash(tx4);

console.log("HASH LAYER (Lớp 1 - Hash từng transaction):");
console.log(`  H1 = hash(TX1) = ${h1}`);
console.log(`  H2 = hash(TX2) = ${h2}`);
console.log(`  H3 = hash(TX3) = ${h3}`);
console.log(`  H4 = hash(TX4) = ${h4}\n`);

// Tạo cây - ghép cặp hash
let h12 = quickHash(h1+h2);
let h34 = quickHash(h3+h4);

console.log("BRANCH LAYER (Lớp 2 - Ghép cặp hash):");
console.log(`  H12 = hash(h1+h2) = ${h12}`);
console.log(`  H34 = hash(h3+h4) = ${h34}`);

// Merkle Root - đỉnh của cây
let merkleRoot = quickHash(h12+h34);

console.log('MERKLE ROOT (Lớp 3 - Gốc cây):');
console.log(`  Root = hash(H12 + H34) = ${merkleRoot}\n`);

// Test: Thay đổi một transaction
let tx1_modified = "Giao dịch A->B: 100 BTC";
let h1_modified = quickHash(tx1_modified);
let h12_modified = quickHash(h1_modified+h2);
let merkleRoot_modified = quickHash(h12_modified+h34);

console.log(`TX1 (sửa): ${tx1_modified}`);
console.log(`H1 (cũ): ${h1}`);
console.log(`H1 (mới): ${h1_modified}`);
console.log(`H12 (cũ): ${h12}`);
console.log(`H12 (mới): ${h12_modified}`);
console.log(`Root (cũ): ${merkleRoot}`);
console.log(`Root (mới): ${merkleRoot_modified}\n`);
