## Readme

- 解釋package.json中的dependencies與devDependencies分別是什麼。
    - 這些是**你的應用真正上線、給使用者使用時需要的工具**。例如，假設你有一個網站，它需要一個伺服器來運行，那麼像 Express 這種伺服器框架就會放在 dependencies 裡，因為網站需要它來運行。
    - 這些是**你在開發過程中會用到的工具**，但網站上線給使用者時不需要。比如，當你在寫代碼時可能會用到 ESLint 來檢查代碼格式，或者用 Webpack 來打包代碼，但使用者用你網站的時候，其實不需要這些工具，它們只是在你開發時幫助你，最後不會跟著應用上線。

- 說明package.json中的scripts區塊如何使用。
    - 當你使用 package.json 中的 scripts 區塊時，你可以定義和管理常見的開發任務，這些任務可以通過簡單的命令來自動執行。
    - 例如說：當每次都要執行程式的話，就要打node app.js這個指令，那如果這個指令變得又臭又長的話，每次要輸入的時候就會變得很麻煩，所以就可以使用script來簡化這個流程。

- 解釋如何使用環境變數來設定Port number。
    - 可以使用 .env 文件來集中管理環境變數，並搭配 dotenv 。
    - 在程式中加入require('dotenv').config()來讀取.env文件，因為有些資訊是環境資訊，或是比較有隱私性的，不適合push到github中，所以要配合gitignore做使用。

- 描述為什麼選擇上傳某些檔案、不上傳某些檔案到github repo，決策的要素是什麼。
    - 安全性：API金鑰、 OAuth tokens, password等等，如果把敏感資料上傳到公開github中，就很有可能受到攻擊。
    - 不必上傳第三方的資料，像 node_modules/ 這樣的第三方的資料，在使用 NPM，這些會被安裝到專案中。但這些**套件通常不會被上傳到 GitHub**，原因是其他開發者可以自己下載所需的依賴，這樣可以大大減少數據傳輸的過程。

- 說明JavaScript引用模組的兩種方式：CJS (require) 和 ESM (import/export)，以及它們分別如何使用。
    - CJS: 執行到require()時，他會立刻的去下載內容，所以程式要等到下載才能進行下一步。（同步）

    ```jsx
    // math.js
    module.exports = {
      add: function(a, b) { return a + b; },
    };

    // app.js
    const math = require('./math');
    console.log(math.add(2, 3));  // 5
    ```

    - ESM: 只能放在頂部（import和export），所以程式在執行前就會知道哪先東西需要下載。（靜態）

    ```jsx
    // math.js
    export function add(a, b) { return a + b; }

    // app.js
    import { add } from './math.js';
    console.log(add(2, 3));  // 5
    ```