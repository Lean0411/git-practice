## 什麼是 AWS Region, AZ (Availability Zones)

Server 是架在雲端上的，但可以想像 server 比較像是「不會停止」、「永遠聯網」的電腦，好讓你「連線」到雲端。

但如果是電腦的話，一定有一個「實體位置」架設電腦，只是 Region 是架設在世界各地。

不同區域的 server 彼此擁有各自的物理、網路、電源等資源，作為隔離。

一個 Region 擁有好幾個可用區（Availability Zones）的目的是實現高可用性和容錯容忍性，例如：如果一個可用區發生故障，其他可用區仍然可以繼續運行（不會把雞蛋都放在同一個籃子的概念）。

## 如果你要使用 AWS 服務，你會怎麼選擇用哪個 Region，考慮的因素有哪些？

如果不是網路延遲需求非常高的服務的話，我會選擇距離最近的 AWS server，因為連線到這種伺服器通常（可能）都是要經過非常遠的距離，那距離如果越遠的話理論上「延遲」就會越高。

但是如果是「成本」考量的話，因為不是什麼商業專案，所以還是以 CP 值高的區域，有些區域的使用成本比較低。

- [Localhost](http://Localhost) 是什麼？
    - 是一個 Loopback，是用來在同一個設備（本機）內部進行通訊，不需要經過實體網路卡，或是其他網路設備就可以進行。
- 那為什麼要用到 [Localhost](http://Localhost) ？
    - 有些測試在上線之前都會在本機上運行，然後再透過 [Localhost](http://Localhost) 的方式訪問並測試。
    - 安全的隔離：因為是在本地才可以被使用，所以外網的用戶無法直接訪問我的 [localhost](http://localhost) 開發環境，這樣非常安全（關機之後就沒有駭客的概念）。
- curl 是什麼？查查看怎麼用 curl 來測試網路連線？常用參數有哪些？
    - curl 可以用來方便下載、測試連線、查看網路詳細資訊的命令工具全名是 ”Client URL” ，支援多種協議 HTTP, HTTPS, FTP
    
    ```bash
    curl -I https://www.google.com
    HTTP/2 200
    如果伺服器正常運行，會返回狀態碼 200，表示網站可用；若是 404 則表示網頁不存在。
    
    url -O https://www.example.com/file.txt
    這個命令會將 file.txt 下載到當前目錄，並保持文件名不變。
    
    curl -L https://shorturl.example.com
    當你訪問某些 URL 時，伺服器有時會返回一個重定向響應，
    這通常會使用 HTTP 狀態碼 3xx（如 301、302 等），表示請求的資源已經被移動到另一個位置。
    例如：伺服器從 HTTP 重定向到 HTTPS 時，-L 能自動處理這些重定向過程，而不用手動去跟隨新 URL。
    
    lean@Lean-MacBook Downloads % curl -v https://google.com
    * Host google.com:443 was resolved.
    * IPv6: (none)
    * IPv4: 172.217.163.46
    *   Trying 172.217.163.46:443...
    * Connected to google.com (172.217.163.46) port 443
    curl 首先解析了 google.com 的主機，找到 IPv4 地址 172.217.163.46，通過端口 443（HTTPS 預設端口）與它進行連接。
    這裡顯示 IPv6: (none)，表示並未使用 IPv6 地址。
    
    TLS 握手
    * ALPN: curl offers h2,http/1.1
    * (304) (OUT), TLS handshake, Client hello (1):
    *  CAfile: /etc/ssl/cert.pem
    *  CApath: none
    * (304) (IN), TLS handshake, Server hello (2):
    * (304) (IN), TLS handshake, Unknown (8):
    * (304) (IN), TLS handshake, Certificate (11):
    * (304) (IN), TLS handshake, CERT verify (15):
    * (304) (IN), TLS handshake, Finished (20):
    * (304) (OUT), TLS handshake, Finished (20):
    
    驗證
      •	證書的通用名（CN）：*.google.com（表示它覆蓋所有以 google.com 結尾的子域）。
        •	證書的有效期：從 2024 年 8 月 26 日到 2024 年 11 月 18 日。
        •	subjectAltName 表示伺服器的主機名 google.com 與證書中的 google.com 匹配，驗證成功!
        •	證書是由 Google Trust Services 簽發的，並且通過了 SSL 證書的驗證。
    * SSL connection using TLSv1.3 / AEAD-CHACHA20-POLY1305-SHA256 / [blank] / UNDEF
    * ALPN: server accepted h2
    * Server certificate:
    *  subject: CN=*.google.com
    *  start date: Aug 26 06:33:47 2024 GMT
    *  expire date: Nov 18 06:33:46 2024 GMT
    *  subjectAltName: host "google.com" matched cert's "google.com"
    *  issuer: C=US; O=Google Trust Services; CN=WR2
    *  SSL certificate verify ok.
    
    * using HTTP/2
    * [HTTP/2] [1] OPENED stream for https://google.com/
    * [HTTP/2] [1] [:method: GET]
    * [HTTP/2] [1] [:scheme: https]
    * [HTTP/2] [1] [:authority: google.com]
    * [HTTP/2] [1] [:path: /]
    * [HTTP/2] [1] [user-agent: curl/8.7.1]
    * [HTTP/2] [1] [accept: */*]
    > GET / HTTP/2
    > Host: google.com
    > User-Agent: curl/8.7.1
    > Accept: */*
    
    ```

參考網址：https://blog.techbridge.cc/2019/02/01/linux-curl-command-tutorial/