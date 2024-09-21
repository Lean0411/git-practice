### 環境準備

- **安裝的 Node.js 版本？**
    - 我這學期的課程有用到 Node.js，因為老師教學環境是使用這個 v20 版本，還有老師有提到 Node.js 偶數版本是比較穩定的版本，奇數版本是 Current，所以我選擇安裝 LTS 版本。
    
    ```bash
    lean@MacBook-Pro14 ~ % node
    Welcome to Node.js v20.17.0.
    Type ".help" for more information.
    > .exit
    ```
    
- **NVM 與 NPM 分別是什麼？**
    - 這可以從 Node.js 說起，命名為 Node 顧名思義，一個大型的網路應用是由多個 Function 所組成，像是：要開發一個線上聊天系統，其實不必了解全部的細節（像是通訊協定）之類的，只要去使用大神們已經開發好的「Package」就可以套用在自己的程式上，踩在巨人的肩膀上。
    - **NPM (Node Package Manager)**：NPM 中間的 P 就是上述說的「Package」，網路上提供非常多的資源及模組，使用現成的模組可以增加開發的速度及效率。像是有 Express 網頁框架模組。當引用了套件之後，那個套件的名稱就會出現在 `package.json` 裡面的 `dependencies` 中。
    - **NVM (Node Version Manager)**：名字中間的 V 就是版本的意思，通過 NVM 就可以透過指令的方式「安裝」「切換」不同版本的 Node.js，其原因是為了解決 Node.js 各種版本之間的相容問題。
    
        ```bash
        # 安裝的 nvm 版本
        nvm install <version>
        # 查看已安裝的所有版本
        nvm ls
        # 切換
        nvm use <version>
        # 查看版本
        nvm -v
        # 刪除特定版本
        nvm uninstall <version>
        # 目前使用的版本
        nvm current
        ```

### 參考資料

- [CSDN Blog](https://blog.csdn.net/qq_17335549/article/details/131850634)
- [YouTube: Node.js 基礎](https://www.youtube.com/watch?v=P3aKRdUyr0s&t=14s)
- [YouTube: Node.js 初學者教學](https://www.youtube.com/watch?v=5WRw_yZFjdk)