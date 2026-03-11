// scripts/deploy-and-test.js
const { ethers } = require("hardhat");
 
async function main() {
  // Lấy 5 tài khoản giả lập từ Hardhat (Account #0 đến #4)
  const [admin, farmer, manufacturer, distributor, retailer] = await ethers.getSigners();
 
  // In địa chỉ các tài khoản ra màn hình để kiểm tra
  console.log("========== FOOD TRACEABILITY TEST ==========");
  console.log("Admin:       ", admin.address);
  console.log("Farmer:      ", farmer.address);
  console.log("Manufacturer:", manufacturer.address);
  console.log("Distributor: ", distributor.address);
  console.log("Retailer:    ", retailer.address);

  // ===== BƯỚC 1: DEPLOY CONTRACT =====
  console.log("\n[BUOC 1] Deploying contract...");
  const FoodTraceability = await ethers.getContractFactory("FoodTraceability");
  const contract = await FoodTraceability.deploy();
  await contract.waitForDeployment();
  console.log("  Contract deployed tai:", await contract.getAddress());

  // ===== BƯỚC 2: THÊM PARTICIPANTS =====
  console.log("\n[BUOC 2] Them participants...");
  await contract.connect(admin).addParticipant(farmer.address, "Nong Trai Xanh", 1);
  await contract.connect(admin).addParticipant(manufacturer.address, "Nha May Sach", 2);
  await contract.connect(admin).addParticipant(distributor.address, "Cong Ty Van Tai ABC", 3);
  await contract.connect(admin).addParticipant(retailer.address, "Sieu Thi BigC", 4);
  console.log("  Da them 4 participants thanh cong!");
  
  // ===== BƯỚC 3: FARMER tạo sản phẩm (State: Planted) =====
  console.log("\n[BUOC 3] FARMER: Tao san pham...");
  const tx1 = await contract.connect(farmer).createProduct("Ca Phe Arabica", "Bao Loc, Lam Dong, Vietnam");
  await tx1.wait();   console.log("  San pham ID:1 da tao - Trang thai: Da gieo trong");

  // ===== BƯỚC 4: FARMER thu hoạch (State: Harvested) =====
  console.log("\n[BUOC 4] FARMER: Thu hoach...");
  const tx2 = await contract.connect(farmer).harvestProduct(1);
  await tx2.wait();   console.log("  Trang thai: Da thu hoach");

  // ===== BƯỚC 5: MANUFACTURER chế biến (State: Processed) =====
  console.log("\n[BUOC 5] MANUFACTURER: Che bien...");
  const tx3 = await contract.connect(manufacturer).processProduct(1);
  await tx3.wait();   console.log("  Trang thai: Da che bien");

  // ===== BƯỚC 6: DISTRIBUTOR vận chuyển (State: Shipped) =====
  console.log("\n[BUOC 6] DISTRIBUTOR: Van chuyen...");
  const tx4 = await contract.connect(distributor).shipProduct(1);
  await tx4.wait();   console.log("  Trang thai: Dang van chuyen");

  // ===== BƯỚC 7: RETAILER nhận hàng + đặt giá (State: ForSale) =====
  console.log("\n[BUOC 7] RETAILER: Nhan hang va dat gia...");
  const price = ethers.parseEther("0.05");
  const tx5 = await contract.connect(retailer).receiveProduct(1, price);
  await tx5.wait();   console.log("  Trang thai: Dang ban - Gia: 0.05 ETH");
  
  // ===== BƯỚC 8: Đọc lịch sử sản phẩm (góc nhìn người tiêu dùng) =====
  console.log("\n===== LICH SU SAN PHAM #1 =====");
  const h = await contract.getProductHistory(1);
  console.log("Ten san pham:  ", h.name);
  console.log("Nong dan:     ", h.farmerName);
  console.log("Dia diem:     ", h.farmLocation);
  console.log("Nha may:      ", h.manufacturerName);
  console.log("Phan phoi:    ", h.distributorName);
  console.log("Sieu thi:     ", h.retailerName);
  console.log("Gia ban (Wei):", h.price.toString());
  console.log("\n HOAN THANH - Toan bo quy trinh test thanh cong!");
}
main()
  .then(() => process.exit(0))
  .catch((err) => { console.error(err); process.exit(1); });
