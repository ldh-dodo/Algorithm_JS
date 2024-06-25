function solution(t, p) {
    var answer = 0;

    let t_arr_slice = [];
    let p_length = p.length;
    
    for(let i = 0; i<t.length; i++){
        let slice = t.slice(i, i+p.length);
        if(slice.length !== p.length) break;
        t_arr_slice.push(slice);
    }
    
    for(let i = 0; i<t_arr_slice.length; i++){
        if(parseInt(t_arr_slice[i], 10) <= parseInt(p, 10)){
            answer++;
        }
    }
    return answer;
}