function doJob(job, time, cb) {
  setTimeout(() => {
    // 只有在這裡，才能知道這個非同步的 setTimeout 已經做完事情了
    let now = new Date();
    cb(`完成工作 ${job} at ${now.toISOString()}`);
  }, time);
}


//define now
let now = new Date();
// 刷牙 1sec -> 吃早餐 3 sec -> 寫功課 1sec -> 吃午餐 2sec
console.log(`開始工作 at ${now.toISOString()}`);



/*為什不寫成這樣？
doJob('刷牙', 1000, function (data) {
  // 表示 doJob 做完了
  console.log(data);
});

doJob('吃早餐', 3000, function (data) {
  // done
  console.log(data);
});

doJob('寫功課', 1000, function (data) {
  // done
  console.log(data);
});

doJob('吃午餐', 2000, function (data) {
  // done
  console.log(data);
});

執行效果
開始工作 at 2024-09-27T07:01:40.920Z
完成工作 刷牙 at 2024-09-27T07:01:41.924Z
完成工作 寫功課 at 2024-09-27T07:01:41.924Z
完成工作 吃午餐 at 2024-09-27T07:01:42.924Z
完成工作 吃早餐 at 2024-09-27T07:01:43.924Z

現在的程式碼執行方式是非同步的，這會導致所有的 doJob 函數幾乎同時開始倒數計時，而不會按照你想要的順序（刷牙->吃早餐->寫功課->吃午餐）執行。
這是因為 setTimeout 本身是非同步的，它不會等待前一個 setTimeout 完成後再執行下一個。
那需求是「希望刷牙結束後再吃早餐，然後再寫功課和吃午餐」，程式實際上是同時開始計時1秒、3秒、1秒和2秒，那這程式就不符合我的需求。
*/




// 那我該怎麼做？才能讓他有「順序」？
//這樣的程式碼是正確的，每個任務會依序執行，而不是同時執行，確保順序是：刷牙 → 吃早餐 → 寫功課 → 吃午餐，
//但是這樣會陷入callback hell，程式會很冗長，且不易閱讀，尤其是需要執行更多，尤其是需要執行更多非同步的程式。
// callback
doJob("刷牙", 1000, function (data) {
  // 刷牙做完了
  console.log(data);
  doJob("吃早餐", 3000, function (data) {
    console.log(data);
    doJob("寫功課", 1000, function (data) {
      console.log(data);
      doJob("吃午餐", 2000, function (data) {
        console.log(data);
      });
    });
  });
});

//執行效果
//開始工作 at 2024-09-27T14:47:56.604Z
//完成工作 刷牙 at 2024-09-27T14:47:57.609Z
//完成工作 吃早餐 at 2024-09-27T14:48:00.613Z
//完成工作 寫功課 at 2024-09-27T14:48:01.614Z
//完成工作 吃午餐 at 2024-09-27T14:48:03.616Z