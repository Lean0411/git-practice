function doJob(job, time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      var now = new Date();
      resolve("完成工作 " + job + " at " + now.toString());
    }, time);
  });
}

var now = new Date();
console.log("開始工作 at " + now.toISOString());

//使用 promise 的 .then 用法
//確保每個程式在前一個任務完成後才開始，避免同時進行
doJob("刷牙", 1000)
  .then(function (data) {
    console.log(data);
    return doJob("吃早餐", 3000);
  })
  .then(function (data) {
    console.log(data);
    return doJob("寫功課", 1000);
  })
  .then(function (data) {
    console.log(data);
    return doJob("吃午餐", 2000);
  })
  .then(function (data) {
    console.log(data);
  });
