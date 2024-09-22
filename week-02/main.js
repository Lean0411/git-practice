import Stack from './stack.js';


// test for stack
function testStack(){
    const stack = new Stack();

    //size, empty
    console.log("Size is: " + stack.size()) //0
    console.log("Is empty: " + stack.isEmpty()); //true

    //push 3 items [10, 20, 30]
    stack.push(10);
    stack.push(20);
    stack.push(30);
    
    //check print()
    console.log("Stack after push: " + stack.print()); //30 20 10


    console.log("After push size: " + stack.size());// 3

    //peek
    console.log("peek top: " + stack.peek()); //30

    //clear
    stack.clear();
    console.log("clear stack empty") + stack.isEmpty;//true
    console.log("Afer clear size: " + stack.size());//0

    

    //check print
    stack.print();

}





//main
testStack()