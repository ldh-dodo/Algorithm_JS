function solution(a) {
    /*
    서로 다른 숫자 n개 풍선
    풍선이 한 개만 남을 때까지 계속 터뜨린다
    
    인접한 두 풍선 중 하나 터뜨림
    풍선 빈 공간 -> 빈 공간 채움
    번호가 더 작은 풍선을 터트리는 행위는 최대 1번
    
    return: 최후까지 남기는 것이 가능한 풍선들의 개수
    
    더 작은 풍선을 터뜨린 이후 최후에 남는 풍선은, 남은 풍선 중 최댓값
    
      */
    const N = a.length;
    const toLeftMin = Array(N);
    const toRightMin = Array(N);
    
    let cnt = 0;
    
    toLeftMin[N - 1] = a[N - 1];
    toRightMin[0] = a[0];
    
    for(let i = 1; i < N; i++) {
        toLeftMin[N-i-1] = Math.min(a[N-i-1], toLeftMin[N-i]);
        toRightMin[i] = Math.min(toRightMin[i-1], a[i]);
    }
    
    
    
    for(let i = 0; i < N; i++) {
        if(a[i] <= toLeftMin[i] || a[i] <= toRightMin[i]) cnt++;
        // x의 왼쪽에 x보다 작은 값이 존재 -> x의 오른쪽에는 x보다 작은 값 없어야함
        // x의 오른쪽에 x보다 작은 값이 존재 -> x의 왼쪽에는 x보다 작은 값 없어야함
        // 즉, 적어도 자신 기준 왼쪽이나 오른쪽에 자신보다 작은 값이 없는 구간이 존재해야함
    }
    
    return cnt;
}