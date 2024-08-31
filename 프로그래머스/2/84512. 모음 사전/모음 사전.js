

function solution(word) {
    let arr = ["", "A", "E", "I", "O", "U"];
    let res = [];
    const recursion = (depth, str) => {
        if(depth <= 0){
            res.push(str);
            return;
        }
        for(let i = 0; i < arr.length; i++){
            recursion(depth-1, `${str}${arr[i]}`);
        }
    }
    
    
    recursion(5, "");
    
    
    res = [...new Set(res)].sort()
    
    return res.indexOf(word);
}