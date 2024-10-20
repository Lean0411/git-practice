# 個人作業 4 - Nginx 反向代理與 Express Server

## 網址

[https://www.costeffectivedomain.online](https://www.costeffectivedomain.online)

## 網域購買資訊

我在 GoDaddy 購買了網域 `costeffectivedomain.online`花不到50元台幣，正如網址名稱那樣！

## DNS A 記錄的概念

A 記錄（Address Record）是一種將域名 mapping 到伺服器 IPv4 位址的 DNS 記錄。例如，當使用者輸入 `www.costeffectivedomain.online` 時，A 記錄會將域名指向相應的 IP 位址（如 `43.207.199.182`），告知網路應該將流量發送至哪台伺服器。

## DNS NS 記錄的功能

NS 記錄（Name Server Record）用於指定哪個名稱伺服器負責處理該域名的 DNS 查詢。NS 記錄指示其他 DNS 伺服器到哪裡查詢該域名的詳細記錄。在專案中，GoDaddy 提供了 `ns59.domaincontrol.com` 和 `ns60.domaincontrol.com` 來處理此域名的 DNS 查詢。

## 網域名稱、FQDN 與 URL 的區別

- **Domain Name（網域名稱）**：例如 `costeffectivedomain.online`，它是一個簡化的名稱，用以替代伺服器的 IP 位址，使得使用者更容易記住。
- **FQDN（Fully Qualified Domain Name，完整域名）**：例如 `www.costeffectivedomain.online`，它包含了主機名（如 `www`）和網域名稱，確保在互聯網上具有唯一性。
- **URL（Uniform Resource Locator，統一資源定位符）**：例如 `https://www.costeffectivedomain.online/home`，它是一個指向網頁或資源的完整地址，包含了協議（如 `https://`）、域名和具體的路徑。

## 為何應使用 HTTPS 而非 HTTP？

部署 SSL 憑證並使用 HTTPS 進行通信的主要目的是加密數據傳輸，以確保用戶與伺服器之間的數據在傳輸過程中不被第三方攔截或篡改。HTTP 通信是不加密的，容易受到竊聽與攻擊，對用戶隱私與網站安全性構成威脅。此外，使用 HTTPS 還能提升網站在搜索引擎中的排名及信任度，進一步增強其競爭力與公信力。

