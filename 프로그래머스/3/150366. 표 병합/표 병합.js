function solution(commands) {
    const SIZE = 50 * 50;
    const values = Array(SIZE).fill("");
    const parent = Array(SIZE).fill(0).map((_, i) => i);
    const answer = [];

    function find(x) {
        if (x !== parent[x]) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    function union(x1, x2) {
        const root1 = find(x1);
        const root2 = find(x2);

        if (root1 !== root2) {
            if (!values[root1] && values[root2]) {
                parent[root1] = root2;
                values[root1] = values[root2];
            } else {
                parent[root2] = root1;
                values[root2] = values[root1];
            }
        }
    }

    for (const command of commands) {
        const com = command.split(' ');
        const operation = com[0];

        if (operation === 'UPDATE') {
            if (com.length === 4) {
                const r = parseInt(com[1]) - 1;
                const c = parseInt(com[2]) - 1;
                const value = com[3];
                const x = r * 50 + c;
                const rootx = find(x);
                values[rootx] = value;
            } else {
                const value1 = com[1];
                const value2 = com[2];
                for (let i = 0; i < SIZE; i++) {
                    if (values[i] === value1) {
                        values[i] = value2;
                    }
                }
            }
        } else if (operation === 'MERGE') {
            const r1 = parseInt(com[1]) - 1;
            const c1 = parseInt(com[2]) - 1;
            const r2 = parseInt(com[3]) - 1;
            const c2 = parseInt(com[4]) - 1;
            const x1 = r1 * 50 + c1;
            const x2 = r2 * 50 + c2;
            if (parent[x1] !== parent[x2]) {
                union(x1, x2);
            }
        } else if (operation === 'UNMERGE') {
            const r = parseInt(com[1]) - 1;
            const c = parseInt(com[2]) - 1;
            const x = r * 50 + c;
            const rootx = find(x);
            const valuex = values[rootx];

            const nodes = [];
            for (let i = 0; i < SIZE; i++) {
                if (find(i) === rootx) {
                    nodes.push(i);
                }
            }

            for (const node of nodes) {
                values[node] = '';
                parent[node] = node;
            }

            values[x] = valuex;
        } else if (operation === 'PRINT') {
            const r = parseInt(com[1]) - 1;
            const c = parseInt(com[2]) - 1;
            const x = r * 50 + c;
            const rootx = find(x);

            if (!values[rootx]) {
                answer.push('EMPTY');
            } else {
                answer.push(values[rootx]);
            }
        }
    }

    return answer;
}