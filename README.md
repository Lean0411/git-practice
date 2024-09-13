# git-practice
### NCCU Practice 

- 學號：113753207
- 姓名：李恩甫
- 科系：資訊科學所


## Git.md

- 如果這個檔案夾不想再被 git 控制了該怎麼做？
    - 刪除 git 對檔案的控制，檔案內容還是保留著（暴力法）
        
        ```bash
        rm -rf .git
        ```
        
    - 與遠端（Github）停止連接，但是 git 之前的紀錄還是留著（還是可以用 Local 端進行 git 控制）
        
        ```bash
        git remote remove origin
        ```
        
- 版本控制的狀態分為工作目錄、暫存區與儲存庫和遠端的儲存空間 (github)
    - 工作目錄就是目前電腦的編輯器（不會被 git 給控制）
    - 使用 `git add` 指令，就可以將工作目錄的內容存進去「暫存區」
    - 再使用 `git commit` 指令，就可以將暫存區存到 Local 檔案的地方（就會有一個 commit 是 for 這次的變化）
    - 使用 `push`, `pull` 「更新」雲端-Local 的狀態（遠端儲存庫）

- commit message 應該怎麼寫？
    - 一個好的 Git Commit Message 必須兼具 What & Why & How，能幫助開發者瞭解這個提交版本：
        1. 做了什麼事情（What）
        2. 為什麼要做這件事情（Why）
        3. 用什麼方法做到的（How）
        4. 第一個 `-m` 是**標題**（不超過 50 字元）、第二個 `-m` 是**內文**：可以分成多行，每一行不超過 72 個字元
    
    ```bash
    git commit -m "Add user login feature" -m "The ability for users into the system using their email and password."
    ```

- Git 反悔兩個差異
    - 不提交這個檔案到版本控制（`git restore --staged`）。
    - 最後甚至不想保留修改，想讓檔案回到修改前的狀態（`git restore`）。
    
    ```bash
    # 從暫存區域回到工作目錄
    $ git restore --staged {檔案名稱}
    
    # 捨棄在工作目錄的改變(包括修改與刪除)
    $ git restore {檔案名稱}
    ```

- 說明 blob, tree, commit, branch, head 分別是什麼
    - blob: （Binary Large Object）是用來存檔案內容的物件
    - tree: 代表目錄結構，可以更好地了解整個檔案的結構
    - commit: 每次提交並當次提交的標題或內容（小而完整）
    - branch: 代表一個開發的分支，有可能是一個「功能」，指向 commit 的位置
    - head: Head 指向當前分支的最新提交（也不一定是最新，就是目前所在的位置）

- 紀錄在 git repo 操作過程中，.git 檔案夾裡的變化，看看你可以觀察到什麼？
    - 這是在建立 Github repo 時和 Local 連結完之後的 `.git/config` 資訊
    
    ```bash
    lean@MacBook-Pro14 .git % cat config 
    [core]
            repositoryformatversion = 0
            filemode = true
            bare = false
            logallrefupdates = true
            ignorecase = true
            precomposeunicode = true
    [remote "origin"]
            url = https://github.com/Lean0411/git-practice.git
            fetch = +refs/heads/*:refs/remotes/origin/*
    [branch "main"]
            remote = origin
            merge = refs/heads/main
    ```

- commit message 應該怎麼寫比較好？應該有什麼 `style` 嗎？
    - 良好的 Commit Message: **如何在「一年後」讓維護人員進入狀況**
    - 不良的 Commit Message: **如何在「一個月內」讓維護人員找不出程式異動的原因**。
    - 不能只把 Git 當作程式碼的 FTP，要把 Git 當作歷史查閱的工具才拿發揮 Git 的功能。
    - 規定 type，讓 git commit 更好閱讀，或方便理解這次改動是改了什麼類型（Type 是用來告訴進行 Code Review 的人應該以什麼態度來檢視 Commit 內容。）
        - feat: 新增/修改功能 (feature)。
        - fix: 修補 bug (bug fix)。
        - docs: 文件 (documentation)。
        - style: 格式 (不影響程式碼運行的變動 white-space, formatting, missing semi colons, etc)。
        - refactor: 重構 (既不是新增功能，也不是修補 bug 的程式碼變動)。
        - perf: 改善效能 (A code change that improves performance)。
        - test: 增加測試 (when adding missing tests)。
        - chore: 建構程序或輔助工具的變動 (maintain)。
        - revert: 撤銷回覆先前的 commit 例如：revert: type(scope): subject (回覆版本：xxxx)。