function solution(enroll, referral, seller, amount) {
    /*
    자신이 물건을 팔면, 자신의 추천인에게 10%의 지분이 간다.
    칫솔 판매 금액은 100원
    
    enroll : 구성원 이름
    referral :  추천인 이름
    seller : 판매자 이름
    amount : 판매 개수
    
    0. enroll과 referral 배열을 통해, 추천인 hash와 판매금액 hash를 생성한다.
    1. seller을 순회하면서, 자신의 판매 금액과, 추천인의 판매 금액을 갱신한다.
    */
    const UNIT_PRICE = 100;
    const CENTER = "CENTER";
    
    let answer = [];
    
    let refMap = new Map();
    let profitMap = new Map();
    
    enroll.forEach((name, idx) => {
        const ref = referral[idx];
        
        refMap.set(name, ref === '-' ? CENTER : ref);
        profitMap.set(name, 0);
    });
    
    seller.forEach((name, idx) => {
        let refName = refMap.get(name);
        let curName = name;
        let totalRev = amount[idx] * UNIT_PRICE;
        
        while(curName !== CENTER) {          
            let myRev =  totalRev - (totalRev * 0.1 < 1 ? 0 : parseInt(totalRev * 0.1));  
            let refRev = totalRev - myRev;
            

            profitMap.set(curName, profitMap.get(curName) + myRev);
        
            if(refRev === 0) break;
            
            curName = refName;
            refName = refMap.get(curName);
            totalRev = refRev;
        }       
    });
    
    for(const name of enroll) {
        answer.push(profitMap.get(name));
    }
    
    return answer;
}