function solution(genres, plays) {
    /*
      장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범 출시
      노래는 고유 번호로 구분 
      
      노래 수록 기준
      많이 재생된 장르 순 -> 장르 내에서 많이 재생된 노래 순 -> 고유 번호 낮은 노래 순
    */
    
    let genreCnt = {};
    let genre = {};
    const answer = [];
    
    for(let i = 0; i < plays.length; i++) {
        const play = plays[i];
        const g = genres[i];
        
        genreCnt[g] = (genreCnt[g] || 0) + play;
        
        if(genre[g] === undefined) {
            genre[g] = [];
        }
        genre[g].push([play, i]); // [play, idx]
    }
    
    genreCnt = Object.entries(genreCnt).sort((a, b) => b[1] - a[1]).map((el) => el[0]);

    genre = Object.entries(genre);
    genre = Object.fromEntries(genre.map((row) => [row[0], row[1].sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0])]));
    
    for(const gKey of genreCnt) {
        const topTwo = genre[gKey].slice(0, 2);
        topTwo.forEach(([play, idx]) => answer.push(idx));
    }

    return answer;
}