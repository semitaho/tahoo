const SUDOKU_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const CORRECT_INDICES = [0, 3, 6, 27, 30, 33, 54, 57, 60];


export function fillBoard(currentBoard, index) {
    if (index === 81) {
        return currentBoard;
    }
    if (currentBoard[index]) {
        return fillBoard(currentBoard, index + 1);
    }
    let availableNumbers = shuffle(resolveAvailableNumbers(currentBoard, index));
    if (availableNumbers.length === 0) {
        return false;
    }

    for (let numberIndex = 0; numberIndex < availableNumbers.length; numberIndex++) {
        let newBoard = currentBoard.slice();
        let nextNumber = availableNumbers[numberIndex];
        newBoard[index] = nextNumber;
        let generatedBoard = fillBoard(newBoard, index + 1);
        if (generatedBoard !== false) {
            return generatedBoard;
        }
    }
    return false;

}

export function findPosition(scores, score) {
    const index = scores.findIndex(item => item.user_id === score.user_id && item.level === score.level);
    if (index > -1) {
        const position = index + 1;
        return position;

    }
    return null;

}

export function createBoard(board, removeCount) {
    const REMOVAL = removeCount;
    let removals = [];
    let puzzleBoard = board.slice();
    for (let i = 1; i <= REMOVAL; i++) {
        let randIndex = -1;
        let copyRemovals = null;
        do {
            randIndex = Math.floor(Math.random() * board.length);
            copyRemovals = removals.slice();
            copyRemovals.push(randIndex)
        } while (!puzzleBoard[randIndex] || !hasYksiselitteinen(board, copyRemovals));
        puzzleBoard[randIndex] = null;
        removals.push(randIndex);
    }
    return puzzleBoard;
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function resolveAvailableNumbers(board, index) {
    let horizontalNumbers = getAvailableNumbersHorizontal(board, index);
    let verticalNumbers = getAvailableNumbersVertical(board, index);
    let boxNumbers = getAvailableNumbersBox(board, index);
    let availableNumbers = horizontalNumbers.filter(number => verticalNumbers.indexOf(number) > -1).filter(number => boxNumbers.indexOf(number) > -1);
    return availableNumbers;
}

function getAvailableNumbersHorizontal(board, index) {
    let SUDOKU_NUMBERS = SUDOKU_NUMS.slice();
    let start = index - ((index) % 9)
    for (let current = start; current < start + 9; current++) {
        let sudokuNumberIndex = SUDOKU_NUMBERS.indexOf(board[current]);
        if (sudokuNumberIndex > -1) {
            SUDOKU_NUMBERS.splice(sudokuNumberIndex, 1);
        }
    }
    return SUDOKU_NUMBERS;
}

function getAvailableNumbersVertical(board, index) {
    let SUDOKU_NUMBERS = SUDOKU_NUMS.slice();
    let start = (index) % 9;
    for (let current = start; current < 81; current += 9) {
        let sudokuNumberIndex = SUDOKU_NUMBERS.indexOf(board[current]);
        if (sudokuNumberIndex > -1) {
            SUDOKU_NUMBERS.splice(sudokuNumberIndex, 1);
        }
    }
    return SUDOKU_NUMBERS;
}

function getAvailableNumbersBox(board, index) {
    let SUDOKU_NUMBERS = SUDOKU_NUMS.slice();
    let chosen = getChosenStart(index);
    for (let current = chosen; current <= chosen + 2; current++) {
        let sudokuNumberIndex = SUDOKU_NUMBERS.indexOf(board[current]);

        if (sudokuNumberIndex > -1) {
            SUDOKU_NUMBERS.splice(sudokuNumberIndex, 1);
        }
        let sudokuNumberIndex2 = SUDOKU_NUMBERS.indexOf(board[current + 9]);
        if (sudokuNumberIndex2 > -1) {
            SUDOKU_NUMBERS.splice(sudokuNumberIndex2, 1);
        }
        let sudokuNumberIndex3 = SUDOKU_NUMBERS.indexOf(board[current + 18]);
        if (sudokuNumberIndex3 > -1) {
            SUDOKU_NUMBERS.splice(sudokuNumberIndex3, 1);

        }
    }
    return SUDOKU_NUMBERS;
}

function getChosenStart(index) {
    for (let i = 0; i < CORRECT_INDICES.length; i++) {
        let boxStart = CORRECT_INDICES[i];
        // x, y
        for (let x = boxStart; x <= boxStart + 2; x++) {
            if (x === index || x + 9 === index || x + 18 === index) {
                let chosen = boxStart;
                return chosen;
            }
        }
    }
}

function hasYksiselitteinen(originalBoard, removals) {
    let copyBoard = originalBoard.slice();
    removals.forEach(removeindex => {
        copyBoard[removeindex] = null;
    });
    let validBoards = 0;
    validBoards += countSolutions(copyBoard);
    return validBoards === 1;
}

function countSolutions(board) {

    if (isFilled(board)) {
        return 1;
    }
    let chosenIndex = getAvailableIndex(board);

    let availableNumbers = resolveAvailableNumbers(board, chosenIndex);
    if (availableNumbers.length === 0) {
        return 0;
    }
    let validBoards = 0;
    availableNumbers.forEach(number => {
        let newBoard = board.slice();
        newBoard[chosenIndex] = number;
        validBoards += countSolutions(newBoard);
    });
    return validBoards;

}

function isFilled(board) {
    let isFilled = true;
    board.forEach(value => {
        if (!value) {
            isFilled = false;
        }
    });
    return isFilled;
}

function getAvailableIndex(board) {
    let chosen = -1;
    board.forEach((value, index) => {
        if (!value) {
            chosen = index;
        }
    });
    return chosen;
}
