class BirthdayWordle {
    constructor() {
        this.target = "HAPPY BIRTHDAY DOG";
        this.targetArray = this.target.split('');
        this.currentGuess = '';
        this.guesses = [];
        this.currentRow = 0;
        this.currentCol = 0;
        this.gridSize = 5; // Start with 5 columns
        this.maxRows = 6;
        this.gameState = 'playing'; // playing, won, lost
        this.isExpanded = false;
        
        this.initializeGame();
        this.attachEventListeners();
    }
    
    initializeGame() {
        this.createGrid();
        this.createKeyboard();
        this.showMessage("Type your first 5-letter word!", "info");
    }
    
    createGrid() {
        const grid = document.getElementById('grid');
        grid.innerHTML = '';
        
        for (let row = 0; row < this.maxRows; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `cell-${row}-${col}`;
                grid.appendChild(cell);
            }
        }
        
        this.updateTypingIndicator();
    }
    
    expandGrid() {
        if (this.isExpanded) return;
        
        this.isExpanded = true;
        this.gridSize = 18; // Full length of "HAPPY BIRTHDAY DOG"
        this.currentCol = 0;
        this.currentGuess = '';
        
        const grid = document.getElementById('grid');
        grid.classList.add('expanded');
        
        // Clear and recreate grid with expanded size
        grid.innerHTML = '';
        
        for (let row = 0; row < this.maxRows; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (col === 5 || col === 14) { // Space positions
                    cell.classList.add('space');
                    cell.textContent = ' ';
                }
                cell.id = `cell-${row}-${col}`;
                grid.appendChild(cell);
            }
        }
        
        // Update header text
        const headerP = document.querySelector('header p');
        headerP.textContent = "Now solve the full message!";
        
        this.showMessage("🎉 Surprise! The grid has expanded! Now find the full birthday message!", "info");
        
        // Re-populate the grid with previous guesses
        this.populateExpandedGrid();
        this.updateTypingIndicator();
    }
    
    populateExpandedGrid() {
        // Fill in previous guesses on the expanded grid
        for (let i = 0; i < this.guesses.length; i++) {
            this.displayGuess(this.guesses[i], i);
        }
    }
    
    createKeyboard() {
        const keyboard = document.getElementById('keyboard');
        const rows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
        ];
        
        keyboard.innerHTML = '';
        
        rows.forEach(row => {
            row.forEach(key => {
                const keyElement = document.createElement('button');
                keyElement.className = 'key';
                keyElement.textContent = key === 'BACKSPACE' ? '⌫' : key;
                if (key === 'ENTER' || key === 'BACKSPACE') {
                    keyElement.classList.add('wide');
                }
                keyElement.addEventListener('click', () => this.handleKeyPress(key));
                keyboard.appendChild(keyElement);
            });
        });
    }
    
    attachEventListeners() {
        // Global keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleKeyPress('ENTER');
            } else if (e.key === 'Backspace') {
                this.handleKeyPress('BACKSPACE');
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                this.handleKeyPress(e.key.toUpperCase());
            } else if (e.key === ' ' && this.isExpanded) {
                this.handleKeyPress(' ');
            }
        });
    }
    
    handleKeyPress(key) {
        if (this.gameState !== 'playing') return;
        
        if (key === 'ENTER') {
            this.submitGuess();
        } else if (key === 'BACKSPACE') {
            this.deleteLetter();
        } else if (key === ' ' && this.isExpanded) {
            this.addLetter(' ');
        } else if (/^[A-Z]$/.test(key)) {
            this.addLetter(key);
        }
    }
    
    addLetter(letter) {
        if (this.currentCol >= this.gridSize) return;
        
        // Skip space positions in expanded mode
        if (this.isExpanded && (this.currentCol === 5 || this.currentCol === 14)) {
            if (letter === ' ') {
                this.currentCol++;
                this.currentGuess += ' ';
                this.updateTypingIndicator();
                return;
            } else {
                // Auto-add space and continue
                this.currentGuess += ' ';
                this.currentCol++;
            }
        }
        
        if (this.currentCol >= this.gridSize) return;
        
        const cell = document.getElementById(`cell-${this.currentRow}-${this.currentCol}`);
        if (cell && !cell.classList.contains('space')) {
            cell.textContent = letter;
            cell.classList.add('filled');
            this.currentGuess += letter;
            this.currentCol++;
            this.updateTypingIndicator();
        }
    }
    
    deleteLetter() {
        if (this.currentCol <= 0) return;
        
        this.currentCol--;
        
        // Skip space positions when deleting
        if (this.isExpanded && (this.currentCol === 5 || this.currentCol === 14)) {
            this.currentGuess = this.currentGuess.slice(0, -1);
            this.currentCol--;
        }
        
        if (this.currentCol < 0) {
            this.currentCol = 0;
            return;
        }
        
        const cell = document.getElementById(`cell-${this.currentRow}-${this.currentCol}`);
        if (cell && !cell.classList.contains('space')) {
            cell.textContent = '';
            cell.classList.remove('filled');
            this.currentGuess = this.currentGuess.slice(0, -1);
            this.updateTypingIndicator();
        }
    }
    
    updateTypingIndicator() {
        // Remove typing indicator from all cells in current row
        for (let col = 0; col < this.gridSize; col++) {
            const cell = document.getElementById(`cell-${this.currentRow}-${col}`);
            if (cell) {
                cell.classList.remove('typing');
            }
        }
        
        // Add typing indicator to current cell
        if (this.currentCol < this.gridSize) {
            const currentCell = document.getElementById(`cell-${this.currentRow}-${this.currentCol}`);
            if (currentCell && !currentCell.classList.contains('space')) {
                currentCell.classList.add('typing');
            }
        }
    }
    
    submitGuess() {
        const expectedLength = this.isExpanded ? 18 : 5;
        if (this.currentGuess.length !== expectedLength) {
            this.showMessage(`Type ${expectedLength} ${this.isExpanded ? 'characters' : 'letters'} first!`, "");
            return;
        }
        
        // First guess triggers expansion
        if (!this.isExpanded && this.guesses.length === 0) {
            this.guesses.push(this.currentGuess);
            this.displayGuess(this.currentGuess, this.currentRow);
            this.currentRow++;
            this.currentCol = 0;
            this.currentGuess = '';
            this.expandGrid();
            return;
        }
        
        this.guesses.push(this.currentGuess);
        this.displayGuess(this.currentGuess, this.currentRow);
        this.updateKeyboard(this.currentGuess);
        
        if (this.checkWin()) {
            this.gameState = 'won';
            this.showMessage("🎉 HAPPY BIRTHDAY! You found the message! 🎉", "success");
            document.getElementById('celebration').classList.remove('hidden');
        } else {
            this.currentRow++;
            this.currentCol = 0;
            this.currentGuess = '';
            
            if (this.currentRow >= this.maxRows) {
                this.addMoreRows();
            }
            
            this.updateTypingIndicator();
        }
    }
    
    displayGuess(guess, row) {
        const target = this.isExpanded ? this.target : this.target.substring(0, 5);
        const result = this.evaluateGuess(guess, target);
        
        // Remove typing indicator from all cells in the row
        for (let col = 0; col < this.gridSize; col++) {
            const cell = document.getElementById(`cell-${row}-${col}`);
            if (cell) {
                cell.classList.remove('typing');
            }
        }
        
        for (let i = 0; i < guess.length; i++) {
            const cell = document.getElementById(`cell-${row}-${i}`);
            if (cell) {
                cell.textContent = guess[i];
                cell.className = `cell filled ${result[i]}`;
                
                // Add animation delay for visual effect
                setTimeout(() => {
                    cell.classList.add('new');
                }, i * 100);
            }
        }
    }
    
    evaluateGuess(guess, target) {
        const result = new Array(guess.length).fill('absent');
        const targetArray = target.split('');
        const guessArray = guess.split('');
        
        // First pass: mark correct positions
        for (let i = 0; i < guess.length; i++) {
            if (guessArray[i] === targetArray[i]) {
                result[i] = 'correct';
                targetArray[i] = null; // Mark as used
                guessArray[i] = null; // Mark as used
            }
        }
        
        // Second pass: mark present letters
        for (let i = 0; i < guess.length; i++) {
            if (guessArray[i] !== null) {
                const targetIndex = targetArray.indexOf(guessArray[i]);
                if (targetIndex !== -1) {
                    result[i] = 'present';
                    targetArray[targetIndex] = null; // Mark as used
                }
            }
        }
        
        return result;
    }
    
    updateKeyboard(guess) {
        const target = this.isExpanded ? this.target : this.target.substring(0, 5);
        const result = this.evaluateGuess(guess, target);
        
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i];
            if (letter === ' ') continue;
            
            const keyElement = Array.from(document.querySelectorAll('.key'))
                .find(key => key.textContent === letter);
            
            if (keyElement) {
                const currentClass = keyElement.className;
                if (!currentClass.includes('correct') && result[i] === 'correct') {
                    keyElement.className = 'key correct';
                } else if (!currentClass.includes('correct') && !currentClass.includes('present') && result[i] === 'present') {
                    keyElement.className = 'key present';
                } else if (!currentClass.includes('correct') && !currentClass.includes('present') && result[i] === 'absent') {
                    keyElement.className = 'key absent';
                }
            }
        }
    }
    
    checkWin() {
        const target = this.isExpanded ? this.target : "HAPPY";
        return this.currentGuess === target;
    }
    
    addMoreRows() {
        this.maxRows += 3;
        const grid = document.getElementById('grid');
        
        // Add new rows to the grid
        for (let row = this.currentRow; row < this.maxRows; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (this.isExpanded && (col === 5 || col === 14)) {
                    cell.classList.add('space');
                    cell.textContent = ' ';
                }
                cell.id = `cell-${row}-${col}`;
                grid.appendChild(cell);
            }
        }
        
        this.showMessage("Don't give up! Here are some more tries! 🌟", "info");
        this.updateTypingIndicator();
    }
    
    showMessage(text, type) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = `message ${type}`;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayWordle();
}); 