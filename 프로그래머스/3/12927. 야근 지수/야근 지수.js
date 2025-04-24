function solution(n, works) {
    const SIZE = works.length;
    
    works.sort((a, b) => b - a);
    
    while(n > 0) {
        n--;
        works[0] -= 1;
        let max = works[0];
        
        if(max < 0) return 0;
        
        for(let i = 1; i < SIZE; i++) {
            if(n <= 0) break;
            if(max >= works[i]) break;
                n--;
                works[i] -= 1;
        }
    }
    return works.reduce((acc, cur) => acc + cur ** 2, 0);
}