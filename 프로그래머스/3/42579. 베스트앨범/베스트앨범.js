function solution(genres, plays) {
    // clean code 학습
    // 맵을 두 개 쓰지 말고, 하나의 맵 안에 같이 넣어서 사용
    // 중간 변환 로직을 최소화할 수 있도록, 고차 함수를 잘 이용해보자
    const genreMap = {};
    
    genres.forEach((genre, i) => {
        if(!genreMap[genre]) genreMap[genre] = { total: 0, songs: [] };
        genreMap[genre].total += plays[i];
        genreMap[genre].songs.push([i, plays[i]]);
    });
    
    return Object.values(genreMap)
                .sort((a, b) => b.total - a.total)
                .flatMap(({songs}) => 
                         songs
                          .sort((a, b) => b[1] - a[1] || a[0] - b[0])
                          .slice(0, 2)
                          .map(([i]) => i));
}