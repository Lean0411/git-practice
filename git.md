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

- 說明 blob, tree, commit, branch, head 分別是什麼？
    - **blob（Binary Large Object）:** 就是工作目錄中某個檔案的 “內容”，且只有內容而已，當你執行 git add 指令的同時，這些新增檔案的內容就會立刻被寫入成為 blob 物件，檔名則是物件內容的雜湊運算結果，沒有任何其他其他資訊，像是檔案時間、原本的檔名或檔案的其他資訊，都會儲存在其他類型的物件裡 (也就是 tree 物件)。
        ```bash
        #新增了三個「相同內容」及一個「不同內容」的txt檔案
        lean@MacBook-Pro14 git-demo % echo "is a same context" > same1.txt
        lean@MacBook-Pro14 git-demo % echo "is a same context" > same2.txt
        lean@MacBook-Pro14 git-demo % echo "is a same context" > same3.txt
        lean@MacBook-Pro14 git-demo % echo "Different context" > diff.txt 

        lean@MacBook-Pro14 git-demo % git add .

        #結果我們可以觀察到「相同內容」的檔案會產生「相同的」結果，
        #sha是「檔案內容」經過雜湊函數在/.git/object中產生的 hash值當作 blob的檔名
        lean@MacBook-Pro14 git-demo % git hash-object same1.txt 
        8e0a83f81fe4ae09700f80bbdd766d696ec7c32e
        lean@MacBook-Pro14 git-demo % git hash-object same2.txt
        8e0a83f81fe4ae09700f80bbdd766d696ec7c32e
        lean@MacBook-Pro14 git-demo % git hash-object same3.txt
        8e0a83f81fe4ae09700f80bbdd766d696ec7c32e
        lean@MacBook-Pro14 git-demo % git hash-object diff.txt 
        80fe5048a9a583b867b3263815210c5e5573088c
        ```
    - **tree:** 這類物件會儲存特定目錄下的所有資訊，包含該目錄下的檔名、對應的 blob 物件名稱、檔案連結(symbolic link) 或其他 tree 物件等等。由於 tree 物件可以包含其他 tree 物件，所以瀏覽 tree 物件的方式其實就跟檔案系統中的「資料夾」沒兩樣。
    - **commit:** 用來記錄有哪些 tree 物件包含在版本中，一個 commit 物件代表著 Git 的一次提交，記錄著特定提交版本有哪些 tree 物件、以及版本提交的時間、紀錄訊息等等。
        ```bash
        #新增一個commit
        git commit -m "add same and different file"

        #查看Git log
        lean@MacBook-Pro14 git-demo % git log 
        commit 15f845126ce014d89b668d81bf16f80f4754ea44 (HEAD -> main)
        Author: Lean <113753207@nccu.edu.tw>
        Date:   Thu Sep 19 21:16:54 2024 +0800

            add same and different file
            
        #我們可以看到最新的commit有物件，有一個tree物件
        lean@MacBook-Pro14 git-demo % git cat-file -p main 
        tree a63388bfdc089c61ff1fd96e7c65c3f516ba797c
        author Lean <113753207@nccu.edu.tw> 1726751814 +0800
        committer Lean <113753207@nccu.edu.tw> 1726751814 +0800

        #那我要怎麼查這些tree物件，包含哪些blob或tree呢？
        #就只需要去cat tree ID

        lean@MacBook-Pro14 git-demo % git cat-file -p a63388bfdc089c61ff1fd96e7c65c3f516ba797c
        100644 blob 7b60fcc9b6246245abc4560ce9e012e7086ec2a5	.DS_Store
        100644 blob 80fe5048a9a583b867b3263815210c5e5573088c	diff.txt
        100644 blob 8e0a83f81fe4ae09700f80bbdd766d696ec7c32e	same1.txt
        100644 blob 8e0a83f81fe4ae09700f80bbdd766d696ec7c32e	same2.txt
        100644 blob 8e0a83f81fe4ae09700f80bbdd766d696ec7c32e	same3.txt

        #結論：我們可以觀察到這個tree物件裡面有四個blob物件，就是和tree有相關的表（tree裡面可能也會有tree，資料夾的概念）
        ```
    - **tag:** 是一個容器，通常用來關聯特定一個 commit 物件，使用 tag 物件最常見的情況是替特定一個版本的 commit 物件標示一個易懂的名稱，可能是代表某個特定發行的版本
    - **branch:** 代表一個開發的分支，有可能是一個「功能」，指向 commit 的位置
    - **head:** Head 指向當前分支的最新提交（也不一定是最新，就是目前所在的位置）


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