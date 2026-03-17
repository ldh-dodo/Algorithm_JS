function solution(genres, plays) {
    // 장르 -> 노래 -> 고유번호
    let answer = [];
    let musics = {};
    
    for(let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        
        if(musics[genre] === undefined) musics[genre] = [];
        
        musics[genre].push([plays[i],i]);
    }
    
    musics = Object.entries(musics);
    musics = musics.map((music) => [music[1].reduce((acc,cur) => acc + cur[0], 0), [...music[1]]]);
    
    musics.sort((a, b) => {
        return b[0] - a[0];
    });
 
    musics = musics.map((music) => [music[0], 
                           music[1].sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]).filter((_, idx) => idx < 2)]);
    
    for(let i = 0; i < musics.length; i++) {
        musics[i][1].forEach(([plays, i]) => {
             answer.push(i);
        })
    }
    
    return answer;
}