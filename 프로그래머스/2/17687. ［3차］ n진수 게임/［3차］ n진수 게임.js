function solution(n, t, m, p) {
    let answer = '';
    let number = 0;
    let result = "";
    let current_turn = 1;

    
    while(result.length < t){
        let convert_num = number.toString(n).toUpperCase();
        
        let sliceStr = convert_num.split('');
        for(let j = 0; j < sliceStr.length; j++){
            if(result.length === t){
                return result;
            }
            if(current_turn === p){
                result += sliceStr[j];
                current_turn++;
            } 
            if(current_turn > m){
                current_turn = 1;                
            } else {
                current_turn++
            }
        }
        number++;
    }
    return result;
}