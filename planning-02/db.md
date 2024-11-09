# Database 選擇
使用 Mongo DB 去架設 NoSQL 伺服器  
原因 :   
- 在 User Detail 方面更有彈性，某些在用戶自我介紹的資訊並非強迫需要(如興趣等欄位不一定要填寫)，而用 MongoDB 結構相對更彈性，可以處理這個問題
- 沒玩過想玩玩看  

缺點 :
- 在用戶訊息查找這種關聯性較高的查找較不方便，在這部分使用關聯性資料庫可能更為合適

## Schema 設計

User 部分以 Detail 將非必要資訊包住，幫遍查找 (未來極有可能異動裡面內容)

設計重點比較在於 **relationship** 這一部分  
方法原本分成以下幾種  

1. 將 relationship 只做成一個 table  
用數字表示狀態 User A -> User B 的狀態  
0 unseen 1  like 2 dislike  
藉此來判別是否 match
```json
{
    "User" : {
        "username" : "String",
        "psasword" : "String",

        "Detail" : {
            "nickname" : "String",
            "birthday" : "Date",
            "age" : "Int",
            "bio" : "String",
            "profilePicture" : []
        }
    },

    "Message" : {
        "fromUser" : "String",
        "toUser" : "String",
        "content" : "String",
        "sendDate" : "Date"
    },

    "FriendRelation" : {
        "userA" : "String",
        "userB" : "String",
        "statusA" : "Int",
        "statusB" : "Int"
    }
}
```

2. 將 userLike userDislike 放入 user 中，若互相 like 則加入 FriendRelation
```json
{
    "User" : {
        "username" : "String",
        "psasword" : "String",

        "Detail" : {
            "nickname" : "String",
            "birthday" : "Date",
            "age" : "Int",
            "bio" : "String",
            "profilePicture" : []
        },

        "userLike" : [],
        "userDislike" : []
    },

    "Message" : {
        "fromUser" : "String",
        "toUser" : "String",
        "content" : "String",
        "sendDate" : "Date"
    },

    "FriendRelation" : {
        "user1" : "String",
        "user2" : "String",
        "status" : "Int"
    }
}
```

3. 2 的 變形版，將 like 和 dislike 獨自抽出來成為一張 table
```json
{
    "User" : {
        "username" : "String",
        "psasword" : "String",

        "Detail" : {
            "nickname" : "String",
            "birthday" : "Date",
            "age" : "Int",
            "bio" : "String",
            "profilePicture" : []
        }
    },

    "Message" : {
        "fromUser" : "String",
        "toUser" : "String",
        "content" : "String",
        "sendDate" : "Date"
    },

    "FriendRelation" : {
        "user1" : "String",
        "user2" : "String",
        "status" : "Int"
    },

    "Like" : {
        "userGive" : "String",
        "userRecieve" : "String"
    },

    "Dislike" : {
        "userGive" : "String",
        "userRecieve" : "String"
    }
}
```

mongoDB 在官方文件中就有提到其實不建議使用 unbound array 來儲存，在資料量小時還可以，但當資料量大時，第二種方式比較不建議  
相較之下 1 3 方式會比較好  
最後採用第三種方式  
覺得理解下比較直觀，且搜尋效能應該差不多

