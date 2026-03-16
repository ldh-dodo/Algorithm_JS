function solution(numbers) {    
    numbers = numbers.map(String);
    numbers.sort((a, b) => (a + b) > (b + a) ? -1 : 1);
    
    return numbers[0] === '0' ? '0' : numbers.join('');
}