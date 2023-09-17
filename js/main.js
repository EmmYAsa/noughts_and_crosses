let finish = false;
const circles = document.querySelectorAll('.circle');
let player = 'X';
let computer = 'O';
let board = ['','','','','','','','',''];

function moveComputer() {
    const bestMoveIndex = getBestMoveIndex(computer);
    move(bestMoveIndex);
}

function getBestMoveIndex(currentPlayer) {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = currentPlayer;
            if (win(currentPlayer)) {
                board[i] = '';
                return i;
            }
            board[i] = ''; 
        }
    }

    const opponent = (currentPlayer === 'X') ? 'O' : 'X';
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = opponent;
            if (win(opponent)) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }

    const emptyIndexes = board.reduce((indexes, cell, index) => {
        if (cell === '') indexes.push(index);
        return indexes;
    }, []);
    
    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomIndex];
}

function move(index) {
    if (!finish && board[index] === '') {
        circles[index].textContent = player;
        board[index] = player;

        if (win(player)) {
            finish = true;
            setTimeout(() => {
                alert(`Player ${player} wins!`);
                location.reload();
            }, 10);
        } else if (board.every(cell => cell !== '')) {
            finish = true;
            setTimeout(() => {
                alert('Draw!');
                location.reload();
            }, 10);
        } else {
            player = (player === 'X') ? 'O' : 'X';
            if (player === 'O') {
                setTimeout(() => {
                    moveComputer();
                }, 300);
            }
        }
    }
}

function win(player) {
    const combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return combinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] === player && board[b] === player && board[c] === player;
    });
}

circles.forEach((circle, index) => circle.addEventListener('click', () => move(index)));
