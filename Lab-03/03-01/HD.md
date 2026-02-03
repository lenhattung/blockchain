

Tuyệt vời! Việc sử dụng **Remix IDE** là lựa chọn sáng suốt nhất cho người mới bắt đầu và không có bất kỳ ETH nào. Bạn không cần cài đặt Node.js, không cần dòng lệnh (terminal), và không cần cấu hình ví phức tạp. Mọi thứ diễn ra ngay trên trình duyệt.

Dưới đây là hướng dẫn chi tiết từng bước để triển khai bài thực hành **Crowdfunding Smart Contract** bằng Remix:

---

# HƯỚNG DẪN TRIỂN KHAI SMART CONTRACT VỚI REMIX IDE
**(Không cần cài đặt, Không cần ETH, Hoàn toàn miễn phí)**

## 📌 BƯỚC 1: TRUY CẬP VÀ CHUẨN BỊ MÔI TRƯỜNG
Remix là một công cụ phát triển Smart Contract trực tuyến.

1.  Mở trình duyệt (Chrome, Edge, Firefox, v.v.).
2.  Truy cập địa chỉ: **[https://remix.ethereum.org](https://remix.ethereum.org)**
3.  Giao diện chính gồm 3 cột chính:
    *   **Cột trái (File Explorers):** Quản lý các file code.
    *   **Cột giữa (Code Editor):** Viết mã lệnh.
    *   **Cột phải (Tabs):** Biên dịch, chạy, kiểm tra lỗi.

---

## 📝 BƯỚC 2: TẠO FILE SMART CONTRACT
Chúng ta sẽ tạo file chứa mã nguồn cho dự án Crowdfunding.

1.  Nhìn vào **Cột trái**, click vào biểu tượng thư mục có chữ **"contracts"**.
2.  Đảm bảo bạn đang ở trong thư mục `contracts`.
3.  Di chuột lên icon **"New File"** (biểu tượng tờ giấy trắng) ở góc trên bên trái của cột trái và click.
4.  Đặt tên file là: **`Crowdfunding.sol`**
    *   *Lưu ý: Phải có đuôi `.sol`*
5.  Nhấn Enter để tạo file.

---

## 💻 BƯỚC 3: VIẾT CODE (DÁN MÃ)
Bây giờ chúng ta sẽ dán mã nguồn đã có vào file vừa tạo.

1.  Copy toàn bộ đoạn code sau:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    address public owner;
    uint public goal;
    uint public deadline;
    uint public totalRaised;
    bool public withdrawn;

    mapping(address => uint) public contributions;

    event ContributionReceived(address contributor, uint amount);
    event FundsWithdrawn(address owner, uint amount);
    event RefundIssued(address contributor, uint amount);

    constructor(uint _goal, uint _duration) {
        owner = msg.sender;
        goal = _goal;
        deadline = block.timestamp + _duration;
        withdrawn = false;
    }

    function contribute() public payable {
        require(block.timestamp < deadline, "Campaign ended");
        require(msg.value > 0, "Must send ETH");

        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;

        emit ContributionReceived(msg.sender, msg.value);
    }

    function withdrawFunds() public {
        require(msg.sender == owner, "Only owner");
        require(block.timestamp >= deadline, "Not ended");
        require(totalRaised >= goal, "Goal not met");
        require(!withdrawn, "Already withdrawn");

        withdrawn = true;

        (bool success, ) = owner.call{value: totalRaised}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(owner, totalRaised);
    }

    function refund() public {
        require(block.timestamp >= deadline, "Not ended");
        require(totalRaised < goal, "Goal was met");
        require(contributions[msg.sender] > 0, "No contribution");

        uint amount = contributions[msg.sender];
        contributions[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Refund failed");

        emit RefundIssued(msg.sender, amount);
    }

    function getTimeLeft() public view returns (uint) {
        if (block.timestamp >= deadline) {
            return 0;
        }
        return deadline - block.timestamp;
    }

    function getProgress() public view returns (uint) {
        return (totalRaised * 100) / goal;
    }
}
```
2.  Quay lại Remix, dán (Paste) đoạn code vào file `Crowdfunding.sol` ở cột giữa.
3.  Nhấn **Ctrl + S** (hoặc Cmd + S trên Mac) để lưu file.

---

## ⚙️ BƯỚC 4: BIÊN DỊCH (COMPILE) SMART CONTRACT
Trước khi chạy, máy tính cần hiểu code bạn vừa viết.

1.  Nhìn vào **Cột trái**, click vào icon **"Solidity Compiler"** (biểu tượng chữ "S").
2.  Tại mục **"Compiler"** (nằm ngay phía dưới icon), chọn phiên bản: **0.8.20** (hoặc phiên bản mới hơn nếu có, ví dụ 0.8.21, 0.8.22).
    *   *Lưu ý: Phiên bản trong code là `^0.8.0`, nên chọn bất kỳ bản nào bắt đầu bằng 0.8 đều được.*
3.  Click vào nút màu xanh lam **"Compile Crowdfunding.sol"**.
4.  Nếu thành công, bạn sẽ thấy một dấu tích xanh bên cạnh nút Compile. Nếu có dấu chấm than đỏ, hãy kiểm tra lại code xem có thiếu dấu chấm phẩy `;` nào không.

---

## 🚀 BƯỚC 5: TRIỂN KHAI (DEPLOY) LÊN REMIX VM
Đây là bước quan trọng nhất. Chúng ta sẽ dùng "Remix VM" - một Blockchain giả lập trong trình duyệt để không tốn phí.

1.  Nhìn vào **Cột trái**, click vào icon **"Deploy & Run Transactions"** (biểu tượng Ethereum).
2.  Tại mục **ENVIRONMENT**:
    *   Click vào dropdown menu.
    *   Chọn **"Remix VM (Cancun)"** (hoặc "Remix VM - Shanghai").
    *   *Giải thích:* Đây là mạng ảo cục bộ. Remix sẽ tự động cấp cho bạn 100 ETH ảo để test.
3.  Tại mục **CONTRACT**:
    *   Chọn **Crowdfunding** từ danh sách thả xuống (Đảm bảo nó đã được chọn).
4.  Tại mục **Deploy Parameters** (Dưới nút Deploy):
    *   Nhập các thông số sau để khởi tạo chiến dịch:
    *   **`_goal` (Mục tiêu):** Nhập `1000000000000000000`
        *   *Giải thích:* Đây là 1 ETH. Đơn vị nhỏ nhất của ETH là Wei (1 ETH = 10^18 Wei).
    *   **`_duration` (Thời gian):** Nhập `60`
        *   *Giải thích:* 60 giây. Để bài thực hành nhanh, chúng ta để chiến dịch chỉ chạy trong 1 phút.
5.  Click vào nút màu cam **"Deploy"**.

**Kết quả:**
*   Dưới cùng của Cột trái, mục **"Deployed Contracts"**, bạn sẽ thấy **`Crowdfunding at ...`** xuất hiện. Tức là Contract đã được tạo thành công!

---

## 🎮 BƯỚC 6: THỰC HÀNH TƯƠNG TÁC VỚI CONTRACT
Bây giờ hãy thử đóng góp tiền và kiểm tra xem nó hoạt động như thế nào.

### 6.1. Kiểm tra thông tin ban đầu
1.  Click vào mũi tên > bên cạnh **`Crowdfunding at ...`** để mở danh sách hàm.
2.  Tìm nút màu xanh dương nhạt **`goal`** và click vào nó.
    *   *Kết quả:* Dưới ô input sẽ hiện số `1000000000000000000` (1 ETH).
3.  Tìm nút **`totalRaised`** và click.
    *   *Kết quả:* Số `0` (Vì chưa ai góp tiền).
4.  Tìm nút **`getTimeLeft`** và click.
    *   *Kết quả:* Số giây còn lại (sẽ đếm ngược dần).

### 6.2. Đóng góp tiền (Contribute)
Để gọi hàm `contribute`, bạn cần gửi ETH kèm theo.

1.  Tìm hàm màu cam **`contribute`**.
2.  **Quan trọng:** Nhìn lên trên cùng của cột phải, ngay dưới mục "ACCOUNT", có ô **VALUE**.
3.  Nhập vào ô VALUE: `1000000000000000000` (Tức là 1 ETH).
4.  Click vào nút **`contribute`**.
5.  Một cửa sổ pop-up hiện lên xác nhận giao dịch -> Click **Confirm**.
6.  **Kiểm tra lại:**
    *   Click nút **`totalRaised`**: Số liệu bây giờ phải là `1000000000000000000`.
    *   Click nút **`getProgress`**: Số liệu phải là `100` (Tức là đã đạt 100% mục tiêu).
    *   *Lưu ý:* Bạn sẽ thấy số dư ETH ở mục ACCOUNT bị giảm đi 1 ETH (do đã gửi vào contract).

### 6.3. Rút tiền (Withdraw) - Khi chiến dịch thành công
Vì chúng ta đã góp đủ 1 ETH (mục tiêu), contract cho phép owner rút tiền.

1.  Tìm hàm màu cam **`withdrawFunds`**.
2.  Click vào nó.
3.  Nếu thành công, bạn sẽ thấy số dư ETH của tài khoản hiện tại (Account) tăng lên (nhận lại 1 ETH từ contract).
4.  Click **`totalRaised`** một lần nữa: Số tiền vẫn nằm trong contract, nhưng cờ `withdrawn` đã bật, owner đã nhận tiền.

### 6.4. Hoàn tiền (Refund) - Khi chiến dịch thất bại
Để test tính năng này, chúng ta cần deploy lại contract để giả lập việc không đạt mục tiêu.

1.  Tại mục **Deploy Parameters**:
    *   **`_goal`**: `2000000000000000000` (2 ETH).
    *   **`_duration`**: `0` (0 giây - Đã kết thúc ngay lập tức).
2.  Click nút **"Deploy"**.
3.  Góp tiền như cũ (VALUE = 1 ETH, click `contribute`). Bây giờ bạn đã góp 1/2 ETH mục tiêu.
4.  Thử click `withdrawFunds`: Sẽ báo lỗi (Error) vì chưa đủ mục tiêu.
5.  Thử click `refund`:
    *   Nếu thành công, 1 ETH sẽ được hoàn trả lại vào tài khoản của bạn.

---

## 🎯 TỔNG KẾT
Bạn đã vừa thành công:
1.  Viết Smart Contract bằng Solidity.
2.  Biên dịch và Deploy lên môi trường giả lập (Remix VM).
3.  Thực hiện các giao dịch: Góp vốn, Rút vốn, Hoàn tiền.
4.  Tất cả mà không cần cài đặt bất cứ phần mềm nào và không tốn một đồng ETH nào!

**Lưu ý quan trọng:**
Mạng **Remix VM** chỉ tồn tại trên trình duyệt của bạn. Nếu bạn tải lại trang (F5), mạng lưới này sẽ reset về 0, mọi giao dịch trước đó sẽ biến mất. Đây là môi trường dùng để học tập và thử nghiệm code.