const Redis = require('ioredis'); // 引入 ioredis 模組
const redis = new Redis(); // 創建 Redis 客戶端連接

// 主執行函式
async function main() {
  console.log("\n=== Redis 功能練習 ===");

  // 1️⃣ 基本鍵值操作
  console.log("\n--- 基本鍵值操作 ---");
  await redis.set("mykey", "Hello, Redis!"); // 設定一個鍵值
  const myValue = await redis.get("mykey"); // 獲取該鍵的值
  console.log(`mykey 的值是: ${myValue}`);

  // 2️⃣ 設置過期時間 (EX) 和檢查 TTL
  console.log("\n--- 過期時間操作 ---");
  await redis.set("tempKey", "Temporary Value", "EX", 10); // 設置一個 10 秒過期的鍵
  const ttl = await redis.ttl("tempKey"); // 查看該鍵的剩餘存活時間
  console.log(`tempKey 剩餘存活時間: ${ttl} 秒`);

  // 等待 3 秒後檢查 TTL
  await new Promise(resolve => setTimeout(resolve, 3000));
  const newTtl = await redis.ttl("tempKey");
  console.log(`3 秒後檢查, tempKey 剩餘存活時間: ${newTtl} 秒`);

  // 3️⃣ 列表操作 (List)
  console.log("\n--- 列表操作 ---");
  await redis.rpush("taskQueue", "Task 1", "Task 2", "Task 3"); // 從右側推入多個任務
  const taskList = await redis.lrange("taskQueue", 0, -1); // 取得列表中的所有任務
  console.log("目前的任務列表:", taskList);

  const firstTask = await redis.lpop("taskQueue"); // 從左側取出第一個任務
  console.log(`取出的第一個任務: ${firstTask}`);
  const updatedTaskList = await redis.lrange("taskQueue", 0, -1);
  console.log("更新後的任務列表:", updatedTaskList);

  // 4️⃣ 有序集合 (Sorted Set)
  console.log("\n--- 排行榜操作 ---");
  await redis.zadd("leaderboard", 100, "Alice", 200, "Bob", 150, "Charlie"); // 添加玩家分數
  const leaderboard = await redis.zrevrange("leaderboard", 0, -1, "WITHSCORES"); // 獲取排行榜
  console.log("排行榜 (分數從高到低):", leaderboard);

  await redis.zincrby("leaderboard", 50, "Alice"); // 提升 Alice 的分數
  const updatedLeaderboard = await redis.zrevrange("leaderboard", 0, -1, "WITHSCORES");
  console.log("更新後的排行榜:", updatedLeaderboard);

  // 5️⃣ 分布式鎖 (Distributed Lock)
  console.log("\n--- 分布式鎖 ---");
  const lockKey = "resource_lock";
  const lockAcquired = await redis.set(lockKey, "locked", "NX", "EX", 5); // 嘗試獲取鎖，過期時間 5 秒
  if (lockAcquired) {
    console.log("成功獲取鎖，處理共享資源...");
    await new Promise(resolve => setTimeout(resolve, 3000)); // 模擬處理共享資源的操作
    await redis.del(lockKey); // 完成後釋放鎖
    console.log("釋放鎖成功");
  } else {
    console.log("鎖已被其他進程持有，無法獲取鎖");
  }

  // 6️⃣ 訊息發布與訂閱 (Pub/Sub)
  console.log("\n--- 訊息發布與訂閱 ---");
  const subscriber = new Redis(); // 創建訂閱者
  const publisher = new Redis(); // 創建發布者

  // 訂閱 "notifications" 頻道
  subscriber.subscribe("notifications", (err, count) => {
    if (err) {
      console.error("訂閱失敗:", err);
    } else {
      console.log(`成功訂閱 ${count} 個頻道`);
    }
  });

  // 處理接收到的消息
  subscriber.on("message", (channel, message) => {
    console.log(`從 ${channel} 頻道接收到消息: ${message}`);
  });

  // 發布消息到 "notifications" 頻道
  setTimeout(() => {
    publisher.publish("notifications", "Hello, Subscribers!");
    publisher.publish("notifications", "Another message!");
  }, 1000);

  // 延遲 3 秒後關閉連線
  setTimeout(() => {
    subscriber.quit();
    publisher.quit();
    redis.quit();
    console.log("\n所有操作完成, 關閉 Redis 連線");
  }, 3000);
}

main();