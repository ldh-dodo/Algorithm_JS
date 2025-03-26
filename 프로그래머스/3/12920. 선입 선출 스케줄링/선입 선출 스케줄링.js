function solution(n, cores) {
    let l = 0;
    let r = 10000 * 50000 + 1;
    
    while(l < r) {
        let m = parseInt((l + r) / 2);
      
        const totalWorks = getTotalWorks(m);

        if(totalWorks >= n) r = m;
        else l = m + 1;
    }
    
    let totalWorks = getTotalWorks(r);
    let time = r;
    
    while(true) {
        for(let i = cores.length - 1; i >= 0; i--) {
            if(time % cores[i] === 0) {
                totalWorks--;
                if(totalWorks === n - 1) {
                    return i + 1;
                }
            }
        }
        time--;
    }

    function getTotalWorks(hours) {
        let totalWorks = 0;
        for(const core of cores) {
            totalWorks += Math.floor(hours / core) + 1;
        }
        return totalWorks;
    }
}