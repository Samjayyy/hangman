export class Guessable {
    constructor(public char: string) {

    }

    public guessed: boolean;
}

export class Game {
    public chars: Guessable[];
    public guesses: number;
    public wrong: number;
    constructor(
        word: string
    ) {
        this.guesses = 0;
        this.wrong = 0;
        this.chars = [];
        for (let i = 0; i < word.length; i++) {
            this.chars[i] = new Guessable(word[i]);
        }
    }

    public guess(guess: string): number {
        this.guesses++;
        const match = this.chars
            .filter(ch => !ch.guessed
                && ch.char === guess);
        match
            .forEach(m => m.guessed = true);
        if (match.length === 0) {
            this.wrong++;
        }
        return match.length;
    }
}
