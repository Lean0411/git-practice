# API Design
先列好大致上 API 功能以及會用到的資料，讚開始設計資料庫  
資料庫設計完後才繼續微調 API 用到東西

## userAPI
```js
login(String username, String password)

register(String username, String password)

editNickname(String username, String nickname)

editBio(String username, String bio)

editProfilePicture(String username, img?)
```

## messageAPI
```js
sendMessage(String fromUser, String toUser, String message)

getMessageHistory(String fromUser, String toUser)

deleteMessage(String fromUser, String toUser, Int messageID)

editMessage(String fromUser, String toUser, Int messageID)
```

## matchAPI
```js
getNextMatch(String username)

sendLike(String fromUser, String toUser)

sendDislike(String fromUser, String toUser)

```

## freindRelationshipAPI
```js
getFriendList(String username)

deleteFriendship(String userA, String userB)
```