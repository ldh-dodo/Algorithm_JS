function solution(phone_book) {
    let answer = true;
    let hash = {};
    /*
    O(n^2)은 시간 초과가 날 것으로 예상됨..
    phone_book에 대한 이중 반복문을 통한 일반적인 비교는 지양해보자.
    
    이중 반복문을 쓰지 않고는 해결할 수 없어보이니, 시간을 어떻게 줄일지에 대해 생각.
    
    phone_book을 순회 하면서, 각 전화번호들을 slice해서 해쉬에 있는지 파악하자.
    각 전화번호의 길이는 20으로 짧기 때문에, 최악의 경우에도 O(20N) -> O(N) 정도로 추정 가능할 듯 
    
    */
    phone_book.forEach(el => hash[el] = 1);
    
    for(const key of Object.keys(hash)){
        for(let i = 1; i < key.length; i++){
            let checkString = key.substring(0, i);
            
            if(hash[checkString] !== undefined){
                answer = false;
                break;
            }
        }
    }
    return answer;
}