## What is Git Flow, Github Flow, Trunk-Based Development

**參考自：** [淺談開發流程-Git-Flow-到-Trunk-Based-Development-的團隊經驗雜談](https://medium.com/@shanpigliao/淺談開發流程-git-flow-到-trunk-based-development-的團隊經驗雜談-a956a379987)

### **Git Flow 介紹**

主要分成五個主要的部分：`master`、`release`、`develop`、`feature`、`hotfix`

- **master**: 正式上線＆部署時的 target branch
- **release**: 目的比較像是 alpha release，在正式上線到 production 之前，先上線到另一個測試環境，這個環境通常會比 local 端的 develop branch 更完整。
- **develop**: 所有的功能（feature branch）都會從這個分支出去，並且在完成後 merge 回這個分支。
- **feature**: 大部分的**功能開發**會在這個分支進行。通常存活的時間只有一個 PR，之後就會 merge 到 develop 並關閉分支。
- **hotfix**: 如果有任何影響使用的緊急問題，會直接從 master 直接開一個 hotfix 分支，緊急修復後 merge 回 master，並且同時 merge 到 develop branch。

![Git Flow 圖片](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*YO6ISDvKQGhAVAzZ.png)

#### **有什麼優缺點？**

- **優點**: 分工明確，每一個分支都有主要的功能，避免品質未達標的程式進入 master 中，在團隊中(QA, PM)更好理解在哪個版本 branch 測試或是更好的開發人員進入狀況。
- **缺點**: 正因為分工明確，每一個完整的開發流程需要經過多次的 PR。最基本的功能開發便會經過 `feature -> develop -> release -> master` 的三次 merge 流程，每一次 merge 都有機會產生 merge conflict，而 conflict 發生會增加邏輯錯誤的機率。解 conflict 的過程如果出錯，會增加開發者的維護成本。

在有 CI / CD 流程的團隊中，PR merge 前都需要跑自動化測試，這些測試有時間成本，經過的 PR merge 越多，時間成本越高，導致開發流程無法快速進行。

#### **理論上可以不用 develop branch？**

Git flow 的 develop branch 是多餘且無意義的分支，在開發期的前後，實際上 master 和 develop branch 都需要互相同步，這代表工程師可以直接在 master 上開發。

---

### **什麼是 Github Flow?**

基於「develop 無用論」，Github flow 簡化了 git flow 的流程，將分支減少到了三種：`master`、`feature`、`hotfix`。

移除 develop 和 release branch 之後，開發流程從多個 PR merge 簡化成了一個，所有修改將直接整合到 master 上。

Github flow 跟 git flow 不同之處還在於部署階段，git flow 還需要 merge 回 develop 來同步，但在 github flow 中，這個過程被省略了，因為開發者本來就是對 master 推送。
![Github Flow 圖片](https://miro.medium.com/v2/resize:fit:1016/format:webp/0*A_QXqQifVvDOGO4U.png)


#### **什麼時候適合用 Github Flow？**

Github flow 大量簡化了 git flow 的流程化負擔，保持了開發流程，減輕了開發以外的時間與認知成本。

這個流程對程式碼的品質有一定要求，因為程式碼只經過一次 review 就會進入 master 並部署到 alpha 或 production。若團隊成員的程式碼較為嚴謹或規模較大的功能，用這種方式開發會有風險。

---

