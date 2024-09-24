//非同步經典問題
for(var i=0; i<3; i++){
    setTimeout(function(){
        console.log(i);
    }, 1000)
}
/*執行結果：
3
3
3

解釋：這log的結果還出乎意料，不是
原因是setTimeout會在主程式後才會執行。
所以i早就變成3了才去執行
*/