# Week 04 - Readme

### 1. 在 Readme 中提供 instance 的 public IP，我會連線過去檢查，所以要保持主機是一直在啟動中

`http://43.207.199.182`

### 2. 什麼是 instance type?

是 AWS 中用來定義 EC2 實例的電腦配置的一組規格。可以讓使用者自己決定了 CPU、記憶體、儲存和網路性能等資源等等需求。

1. **一般用途實例**：適用於計算、記憶體和網路性能均衡，沒有特殊的使用方式。
2. **運算優化實例**：針對計算密集型工作負載，提供高 CPU 性能。
3. **記憶體優化實例**：適合記憶體需求大的應用，如大型資料庫。
4. **加速運算實例**：提供 GPU 等硬體加速，適合機器學習和 AI 和圖形計算。
5. **儲存優化實例**：用於頻繁資料讀寫。

### 3. 什麼是 Nginx？有哪些用途與特性？

Nginx 是一個非同步框架的網頁伺服器，可以做到：

- **反向代理 Proxy**：
    反向代理的好處在於能夠將 Client 不需知道 Application Server 的真實位置，僅需要透過 Nginx 反向代理的方式就能夠向後面的 Application Server 發送請求，而 Application Server 也不需要知道是哪一個 Client 的 Request，僅需回傳 Response 即可。
    
- **伺服器的負載均衡**：
    為了因應大流量，一台 Application Server 是無法應付的，因此會需要同時開多個 Application Server。而 Nginx 能夠自動的將 Client 的 Request 分送到不同 Application Server 上，而分送的演算法可以自己設計。

- **HTTP 快取優化**：
    Nginx 支援快取功能，可以減少伺服器的負擔並加速回應時間。

### 4. pm2 套件是什麼？有什麼用處？

PM2 是一個管理 Node.js 應用程式的工具，讓應用程式的管理變得更輕鬆。它內建了負載均衡功能，所以當需要擴展時，非常方便。此外，PM2 可以在 Windows、Linux 和 macOS 系統上使用，具備跨平台的優勢。

在使用 PM2 前，我們可以建立一個 `config.json` 設定檔，裡面可以指定應用程式的名稱和啟動的實例數量。啟動 PM2 時，只要引用這個設定檔，它就會按照我們的設定自動處理所有細節。

PM2 的一大優勢在於，能夠確保應用程式持續運行，即使程式發生錯誤，也會自動重啟。同時，在我們更新程式碼時，PM2 可以實現無中斷更新，確保服務不中斷。

PM2 能幫助解決的問題包括：

- 當 Node.js 服務因意外停止時，自動重新啟動。
- 當伺服器重啟後，能夠自動重新啟動應用程式。
- 能夠利用多核 CPU，啟動多個實例，達到負載均衡的效果。
- 提供豐富的監控資訊，如重新啟動次數、CPU 使用率、記憶體使用量、進程 ID 等。
- 支援簡單的部署方式，可以同時部署到多台伺服器。

```bash
啟動：
  pm2 start app.js

重啟：
  pm2 restart app

停止：
  pm2 stop app

查看所有應用狀態：
  pm2 status

查看 log：
  pm2 logs

保存應用狀態（重啟伺服器後自動恢復）：
  pm2 save

設置開機啟動：
  pm2 startup
```
### 5. 步驟 9 中提到的 `proxy` 是什麼意思？為什麼要透過 Nginx 來 `proxy` 到 Express 開發的 Web Server?

Proxy（代理）是一個網路服務器，它在用戶和目標伺服器之間充當中介，幫助轉發請求和回應。簡單來說，它就是一個幫助用戶「代為請求」的中間層。

**Forward Proxy（正向代理）**

- **概念**：它代表用戶向網路上的目標伺服器發送請求。用戶的請求首先會到達代理伺服器，代理伺服器再將這些請求轉發給最終的目標伺服器，然後將回應傳回給用戶。
- 正向代理通常用於用戶想隱藏自己的真實 IP 地址，或是希望能夠訪問某些網路資源（例如，繞過地域限制或訪問被屏蔽的網站）

- **例子**：
  - 隱藏用戶的真實 IP 地址。
  - 繞過網路封鎖或防火牆。
  - 例如：VPN 就是一種正向代理。

**Reverse Proxy（反向代理）**

- **概念**：Nginx 就是一個常用的反向代理。它可以將來自用戶的請求接收下來，然後轉發給運行在 `localhost:3000` 的 Express 應用。

- **用途**：
  - **負載均衡**：在多個後端伺服器之間分配請求，以提高處理性能。
  - **安全性**：隱藏後端伺服器的真實 IP 地址，避免直接暴露在網路上。
  - **提供統一網路點**：讓用戶只需要訪問 Nginx，而 Nginx 可以將不同路徑的請求分發給不同的後端服務。

### 6. 在 readme 中提供步驟 9 的 Nginx 設定檔

在 `/etc/nginx/sites-available` 新增一個 `app` 的檔案，裡面內容放目前配置的 Nginx 規則，並在 `/etc/nginx/sites-enabled` 啟用。

```bash
server {
    listen 80;
    server_name 13.231.143.234;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

// 設置指向路徑
sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/

// 確定啟用路徑
ubuntu@ip-172-31-39-130:/etc/nginx/sites-enabled$ ls
app

ubuntu@ip-172-31-39-130:~/git-practice/backend$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```
1. **nginx.conf 是全局控制**：
    定義整個 Nginx 的工作方式和全局設置，如工作進程數量、HTTP 設置等。通過 `include /etc/nginx/sites-enabled/*` 指令來包含具體站點的配置。

2. **sites-available 是配置的儲存地**：
    儲存所有的站點配置，「不論這些配置是否啟用」。在這裡編輯配置文件，不會自動讓 Nginx 使用，需要手動建立符號鏈接。

3. **sites-enabled 是「正在」使用的配置**：
    只有在 `sites-enabled` 中的配置文件（符號鏈接）才會被 Nginx 讀取並實際使用。

### 7. Security Group 是什麼？用途為何？有什麼設定原則嗎？

安全群組負責控制允許到達和離開其關聯資源的流量。例如，將安全群組與 EC2 執行個體建立關聯之後，就會控制執行個體的入站和輸出流量。

當您建立 VPC 時，它會隨附預設安全性群組。您可以為一個 VPC 建立其他安全群組，每個群組都有自己的輸入和輸出規則。您可以為每個傳入規則指定來源、連接埠範圍和通訊協定。您可以為每個傳出規則指定目的地、連接埠範圍和通訊協定。

### 8. 什麼是 sudo? 為什麼有的時候需要加上 sudo，有時候不用？

**需要 sudo 的情況：**

- 修改系統配置文件（如 `/etc/` 內的文件）。
- 安裝、更新軟件。
- 啟動、停止或重啟系統服務（如 Nginx）。

**不需要 sudo 的情況：**

- 修改用戶目錄下的文件。
- 運行一般應用（如 `node app.js`）。
- 操作不涉及系統級別的配置。

### 9. Nginx 的 Log 檔案在哪裡？你怎麼找到的？怎麼看 Nginx 的 Log？

在 Nginx 裡面有專門放 Log 資訊的路徑：

```bash
// 查看 Log 監控 Nginx 
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```
## 參考資料：

- [PressPlay - Nginx 教學](https://www.pressplay.cc/project/F720CEB1D6057D7ABB5614722AB18FFF/articles/660A57208C29FF94453548ED21F284EF)
- [YouTube - Nginx Reverse Proxy Tutorial](https://www.youtube.com/watch?v=7VAI73roXaY)
- [ExplainThis - Why Nginx?](https://www.explainthis.io/zh-hant/swe/why-nginx)
- [Medium - 使用 PM2 來管理 Node.js 服務](https://medium.com/jason-tech-lab/node-js系列-使用-pm2-來管理node-js-服務-3f514cf8eed9)
- [AWS Documentation - VPC Security Groups](https://docs.aws.amazon.com/zh_tw/vpc/latest/userguide/vpc-security-groups.html#security-group-basics)
- [Medium - Nginx Reverse Proxies 和 Node.js Express Web Server](https://medium.com/前端壹兩三事/聊聊關於基本的-nginx-reverse-proxies-and-nodejs-express-web-server-2a1c8e7e7de1)
- [Medium - AWS 架設免費 Ubuntu 並使用 SSH 連線操作 Server](https://vicchoutw.medium.com/aws架設免費ubuntu並使用ssh連線操作server-12b4795321f6)