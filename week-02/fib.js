//第幾項 0 1 2 3 4 5 6  7  8 
//相加值 0 1 1 2 3 5 8 13  21
function fib(n) {
    if(n === 0)  return 0;
    if(n === 1)  return 1;
    
    return fib(n-1) + fib(n-2);
}
  

  console.log(fib(0)); // 0
  console.log(fib(1)); // 1
  console.log(fib(5)); // 5
  console.log(fib(10)); // 55