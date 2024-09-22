// stack.js
// 完成以下 TODO 的部分，並且以 Module 的方式匯出 (ESM)
export default class Stack {
	// TODO: # 有特別的意思嗎？請以註解回覆。
  #items;
  #top; 

  constructor() {
    this.#items = [];
    this.#top = -1;//init top val, [-1] is empty
  }

  // 在 stack 頂部加入元素i
  push(element) {
    this.#top += 1; //push進來一個top就要變多一個，反之
    this.#items[this.#top] = element //讓+1之後top index使element加入items
  }

  // 移除並回傳 stack 頂部的元素
  pop(){
    if(this.#top === -1){
        console.log("Stack is empty");
        return undefined;
    }
    const element = this.#items[this.#top];
    this.#items[this.#top] = undefined;//去除pop後的資料
    this.#top -= 1; //pop出去top會減少1
    return element;
  }

  // 回傳 stack 頂部的元素，但不移除它
  peek() {
    if(this.#top === -1){ //stack是空的情況
        return false;
    }
    return this.#items[this.#top];
  }

  // 檢查 stack 是否為空
  isEmpty() {
    return this.#top === -1;
  }

  // 回傳 stack 中元素的個數
  size() {
    return this.#top + 1; //init 的top是-1, 但實際容量是0,要取得個數就要top+1
  }

  // 清空 stack 
  clear() {
    this.#items = [];
    this.#top = -1;
  }

  // 印出 stack 內容
  print() {
    if(this.isEmpty()){
        console.log("Stack is empty.");
        return;
    }
    let result = ""; //init要印出的內容
    for(let i = this.#top; i >= 0; i--){//從stack頂部開始output
        result += this.#items[i] + " "; //先存著,之後一次output
    }
    console.log(result);
  }

}