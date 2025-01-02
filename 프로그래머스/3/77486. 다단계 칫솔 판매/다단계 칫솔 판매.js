/*
    *rule
    - 모든 판매원은 판매 이익에서 10%를 추천인에게 배분해야함.
    - 남은 돈은 본인이 가질 수 있음.
    - 따라서 판매원의 이익 = 자신의 칫솔 판매 이익 + 추천인에게 받는 이익
    - 10%를 계산한 금액은 내림으로 계산
    - 자신의 추천인에게서 발생하는 수익을 한 번에 더해서 10%를 공제하는 방식이 아니라, 각 추천인에게서 10%씩 공제해야함.
    - 칫솔 한 개 판매액 : 100원
*/
function solution(enroll, referral, seller, amount) {
    function bottomUpReferral (obj, name, profit) {
        // bottom to up 레퍼럴 수익 정산    
        const nextReferral = obj[name].referral;
        
        // 판매액에서 10% 공제하고 자신의 cost에 추가
        const nextProfit = Math.floor(profit * 0.1);
        const myProfit = profit - nextProfit;
        
        obj[name].profit += myProfit;
        
        if(nextReferral === '-') return;
        if(nextProfit < 1) return;
        
        bottomUpReferral(obj, nextReferral, nextProfit);
    }
    
    const PRICE_PER = 100;
    let answer = [];
    let enrollObj = {};
    
    enroll.forEach((name, idx) => {
        let tempObj = {
            profit: 0,
            referral: referral[idx],
        }
        
        enrollObj[name] = tempObj;
    });
    
    for(let i = 0; i < amount.length; i++) {
        const profit = amount[i] * PRICE_PER;
        const curSeller = seller[i];
        
        bottomUpReferral(enrollObj, curSeller, profit);
    }
    
    answer = enroll.map((seller) => enrollObj[seller].profit);
    
    return answer;
}