function solution(files) {
    files.sort(compare);

    return files;
}

function parse(file) {
    let [isHead, isNumber] = [true, false];
    let [head, number] = ['', ''];
    
    for(let i = 0; i < file.length; i++) {
        const c = file[i];
        const isDigit = c >= '0' && c <= '9';
        
        if(isHead && isDigit) {
            isHead = false;
            isNumber = true;
        }
        
        if(isNumber && !isDigit) {
            isNumber = false;
        }
        
        if(isHead) { // HEAD
            head += c;
        } else if(isNumber) { // NUMBER
            number += c;
        }
    }
    
    return [head.toLowerCase(), Number(number)];
}


function compare(file1, file2) {
    const [head1, number1] = parse(file1);
    const [head2, number2] = parse(file2);
    
    if(head1 === head2 && number1 === number2) {
        return 0; 
    } else if(head1 === head2) {
        return number1 - number2;
    } else {
        return head1.localeCompare(head2);
    }
}