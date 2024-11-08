import * as readline from 'readline';
import { Game, GameEvents } from './Game';
import { Player } from './Player';

let ac = new AbortController();

// Setup readline for terminal interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Example player
let resolveQuestion: any = null;
const player = new Player({
  id: 1,
  name: 'Player1',
  balance: 100,
  onNotify: async (event: string, data: any) => {
    // console.log(`Event: ${event}`);
    if (resolveQuestion != null) {
      resolveQuestion(null);
      // readline.clearLine(process.stdout, 0);
      ac.abort();
      ac = new AbortController();
    }
    if (data.players) {
      data.players.every((pl: Player) =>
        console.log(`Your balance is ${pl.balance}`)
      );
    }

    if (event === GameEvents.ROUND_START) {
      const betAmount = await askForBetAmount();
      if (!betAmount) return;
      const card = await askForGuess(data.dealerCard);
      if (!card) return;
      game.bet(Number(betAmount), card, 1);
    }

    if (event === GameEvents.ROUND_FINISH) {
      console.log('Round Finished!!', data);
    }

    if (event === GameEvents.GAME_LEAVE) {
      console.log('Game leave, insufficient balance');
    }
  },
});

// Create a new game instance
const game = new Game({
  k: 1.7, // Win multiplier
  deckCount: 6, // 6 decks of cards
  minBet: 10, // Minimum bet
  roundTime: 15, // Time limit for the round (in seconds)
});

function askForGuess(dealerCard: number): Promise<string | null> {
  return new Promise((resolve) => {
    resolveQuestion = resolve;
    rl.question(
      `The dealer's card is ${dealerCard}. Do you think the next card will be higher (h) or lower (l)? `,
      { signal: ac.signal },
      (answer) => {
        resolveQuestion = null;
        resolve(answer.toLowerCase());
      }
    );
  });
}

function askForBetAmount(): Promise<number | null> {
  return new Promise((resolve) => {
    resolveQuestion = resolve;
    rl.question(
      'Enter your bet amount: ',
      { signal: ac.signal },
      (betAmountStr) => {
        const betAmount = parseInt(betAmountStr);
        if (
          isNaN(betAmount) ||
          betAmount < game.minBet ||
          betAmount > player.balance
        ) {
          resolveQuestion = null;
          resolve(null);
        } else {
          resolveQuestion = null;
          resolve(betAmount);
        }
      }
    );
  });
}

game.run();
game.join(player);
