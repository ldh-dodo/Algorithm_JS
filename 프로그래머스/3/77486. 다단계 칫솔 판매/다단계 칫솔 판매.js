function solution(enroll, referral, seller, amount) {
    const perPrice = 100;
    
    const ref = {};
    const nameToIdx = {};
    const result = Array(enroll.length).fill(0);
    
    enroll.forEach((name, idx) => {
        nameToIdx[name] = idx;
        ref[name] = referral[idx] === '-' ? 'center' : referral[idx];
    });
    
    seller.forEach((name, idx) => {
        let n = name;
        let price = perPrice * amount[idx];
        
        let refPrice;
        while(n !== 'center' && price !== 0) {
            refPrice = Math.floor(price / 10);
            price -= refPrice;
            
            result[nameToIdx[n]] += price;
            
            price = refPrice;
            n = ref[n];
        }
    });
    
    return result;
}