class Page {
    constructor(basicScore, linkCnt) {
        this.basicScore = basicScore;
        this.linkCnt = linkCnt;
        this.linkScore = 0;
    }
}

function getKey(str) {
    const regex =  /content="(.*?)"/;
    
    const match = str.match(regex);
    return match[1];
}

function calculateBasicScore(str, word){
    const regex = new RegExp(`(?<![a-zA-Z])${word}(?![a-zA-Z])`, 'gi');
    const match = str.match(regex);
    
    if(match === null) {
        return 0; 
    }
    
    return match.length;
}

function calculateLinkCnt(str) {
    const regex = /<a href="(.*?)">/g;
    const match = str.match(regex);
    
    if(match === null) {
        return 0;
    }
    
    return match.length;
}

function calculateLinkScore(str, obj) {
    const regex = /<a href="(.*?)">/g;
    const matches = [...str.matchAll(regex)];
    const links = matches.map((match) => match[1]);

    const cur_link = getKey(str);
    const newLinkScore = 
          obj[cur_link].basicScore / obj[cur_link].linkCnt;
    
   if(links === null) return;
    
    links.forEach((link) => {
        const page = obj[link];
        
        if(page === undefined) return;
        
        obj[link].linkScore += newLinkScore;
    })
}

function solution(word, pages) {
    /*
    기능 정리
    1. 검색어에 대한 웹페이지의 매칭 점수를 계산하여야 한다.
    2. 한 웹페이지에서 기본점수, 외부 링크 수, 링크점수, 매칭점수를 구할 수 있다.
    3. 기본점수 : 해당 웹페이지의 텍스트 중, 검색어가 등장하는 횟수(대소문자 무시)
    4. 외부 링크 수 : 해당 웹페이지에서 다른 외부 페이지로 연결된 링크의 개수
    5. 링크점수 : 해당 페이지로 링크가 걸린 다른 웹페이지의 기본점수 % 다른 웹페이지의 외부 링크 수의 총합
    6. 매칭점수 : 기본점수 + 링크점수
    7. word는 검색어이다.
    8. pages는 HTML 목록이다.
    9. 매칭점수가 가장 높은 웹페이지의 index를 구하라.(여러 개라면 가장 번호가 작은 것)
    
    문제 쪼개기
    1. 각 페이지를 순회하며 '기본점수'를 구해서 저장.
    2. 각 페이지를 순회하며 '외부 링크 수' 구해서 저장
    3. 각 페이지를 순회할 때, 다른 페이지의 링크가 나온다면, 링크점수를 계산해서, 그 페이지에 대한 내용을 삽입해준다.
    4. 매칭점수는 기본점수와 링크 점수로 알 수 있음
    
    기본 점수 구하기
    대소문자 구분 없이 word와 일치하는 것을 찾아 저장
    
    외부 링크 수 구하기
    
    
    클래스(page)
        - 필드
            - 인덱스
            - 기본점수
            - 외부 링크 수
    
    위 클래스를 value로, 주소의 앞부분을 key로 하는 객체를 만들어서 사용하자.
    
    obj = {
        a : page class
        b : page class 
        ...
    }
    */
    
    const obj = {}; 
    const matchScore = [];
    
    pages.forEach((page) => {
        // content="https://N.com" 에서 N을 뽑아내서 key로 사용할 것
        const key = getKey(page);
        const basicScore = calculateBasicScore(page, word);
        const linkCnt = calculateLinkCnt(page);
        const newPage = new Page(basicScore, linkCnt);
        
        obj[key] = newPage;
    })
    
    pages.forEach((page) => {
        calculateLinkScore(page, obj);
    })
    // 위에서 각 페이지의 정보를 초기화해줬다면, 다시 페이지를 순회하며 다른 페이지의 링크가 나올 때, 해당 페이지의 링크점수를 갱신해준다.
    
    
    Object.keys(obj).forEach((key) => {
        const page = obj[key];
        matchScore.push(page.basicScore + page.linkScore);
    })
    
    const MAX = Math.max(...matchScore);
    
    for(let i = 0; i < matchScore.length; i++) {
        if(matchScore[i] === MAX) return i;
    }
}