/* Basic ues "for"
function sum(Arr){
    let result = 0;

    for(let i=0; i<Arr.length; i++){
        result += Arr[i];
    }

    return result;

}
*/

//.reduce() = reduce the elements of any array to single salue
function sum(acc, curr){
    return acc + curr;
}

const test = [1,2,3,4,5,6];
const sumarr = test.reduce(sum);

console.log(sumarr);