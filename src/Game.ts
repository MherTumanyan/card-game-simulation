import { Player } from './Player';

// Events for round start, finish, and player leave notifications
export enum GameEvents {
  ROUND_START = 'ROUND_START',
  ROUND_FINISH = 'ROUND_FINISH',
  GAME_LEAVE = 'GAME_LEAVE',
}

export class Game {
  private players: Player[] = [];
  private roundInfo: {
    dealerCard: number;
    nextCard: number | null;
    players: any[];
  } = {
    dealerCard: 0,
    nextCard: 0,
    players: [],
  };
  private bank: number = 0;
  private state: string = 'IDLE';
  private leaveQueue: number[] = [];
  private history: any[] = [];
  private k: number;
  private deck: number[];
  public minBet: number;
  private deckCount: number;
  private roundTime: number;
  private roundTimer: NodeJS.Timeout | null;

  constructor({ k, deckCount, minBet, roundTime, history }: any) {
    this.k = k;
    this.deck = this.createDeck(deckCount);
    this.minBet = minBet;
    this.roundTime = roundTime;
    this.deckCount = deckCount;
    this.roundTimer = null;
    if (history) {
      this.history = history;
    }
  }

  private createDeck(count: number) {
    const deck: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = 1; j <= 13; j++) {
        deck.push(j);
      }
    }
    this.shuffleDeck(deck);
    return deck;
  }

  private shuffleDeck(deck: number[]) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  // Notify all players with a specific event
  private notifyPlayers(event: string, data: any) {
    this.players.forEach((player) => {
      player.notify(event, data);
    });
  }

  // Add a player to the game
  public join(player: Player) {
    const isAlreadyPlaying = this.players.find((p) => p.id === player.id);
    if (isAlreadyPlaying) {
      throw new Error('Already joined');
    }

    if (player.balance < this.minBet) {
      throw new Error(`Minimum balance should be ${this.minBet}`);
    }

    this.players.push(player);

    if (this.state === 'IDLE') {
      this.startRound();
    }
  }

  // Remove a player from the game
  public leave(playerId: number) {
    this.leaveQueue.push(playerId);
  }

  // Start the round
  public startRound() {
    this.state = 'ACCEPTING_BETS';
    this.deck = this.createDeck(this.deckCount);
    this.roundInfo = {
      dealerCard: this.deck.pop() as number,
      nextCard: null,
      players: this.players.map((player) => ({
        id: player.id,
        bet: 0,
        guess: null,
        win: false,
        winAmount: 0,
        skip: true,
      })),
    };
    this.notifyPlayers(GameEvents.ROUND_START, {
      players: this.players,
      dealerCard: this.roundInfo.dealerCard,
    });

    this.roundTimer = setTimeout(() => {
      this.finishRound();
    }, this.roundTime * 1000);
  }

  // Player places a bet
  public bet(betAmount: number, guess: string, playerId: number) {
    const player = this.players.find((player) => player.id === playerId);
    const roundPlayer = this.roundInfo.players.find(
      (player) => player.id === playerId
    );
    if (!player || !roundPlayer) {
      throw new Error('Player not in the game');
    }

    if (betAmount <= player.balance) {
      player.balance -= betAmount;
      this.bank += betAmount;
      roundPlayer.bet = betAmount;
      roundPlayer.skip = false;
      roundPlayer.guess = guess;
    } else {
      throw new Error('Player does not have enough balance');
    }

    // Check if all players have bet, finish round
    if (this.roundInfo.players.every((player) => !player.skip)) {
      clearTimeout(Number(this.roundTimer));
      this.finishRound();
    }
  }

  // Finish the round
  public finishRound() {
    this.state = 'GAME_RESULT';
    this.roundInfo.nextCard = this.deck.pop()!;
    this.roundInfo.players.forEach((roundPlayer) => {
      const { id, bet, guess } = roundPlayer;
      const player = this.getPlayer(id);
      const won = this.hasPlayerWon(guess);

      if (won) {
        roundPlayer.win = true;
        roundPlayer.winAmount = bet * this.k;
        player.balance += roundPlayer.winAmount;
        this.bank -= roundPlayer.winAmount;
      } else {
        roundPlayer.win = false;
        if (player.balance < this.minBet) this.leave(player.id);
      }

      player.notify(GameEvents.ROUND_FINISH, {
        nextCard: this.roundInfo.nextCard,
        info: roundPlayer,
      });
    });

    this.history.push(this.roundInfo); // Record round history
    // Handle players leaving after the round ends
    this.leaveQueue.forEach((playerId) => {
      const index = this.players.findIndex((player) => player.id === playerId);
      if (index === -1) return;
      const player = this.players[index];
      this.players.splice(index, 1);
      player.notify(GameEvents.GAME_LEAVE, {});
    });

    this.leaveQueue = [];

    // Start a new round or set the game to IDLE
    if (this.players.length > 0) {
      setTimeout(() => this.startRound(), 1000);
    } else {
      this.state = 'IDLE';
    }
  }

  // Check if the player's guess is correct
  private hasPlayerWon(guess: string): boolean {
    if (
      guess === 'h' &&
      Number(this.roundInfo.nextCard) > this.roundInfo.dealerCard
    ) {
      return true;
    }
    if (
      guess === 'l' &&
      Number(this.roundInfo.nextCard) < this.roundInfo.dealerCard
    ) {
      return true;
    }
    return false;
  }

  private getPlayer(playerId: number): Player {
    const player = this.players.find((player) => player.id === playerId);
    if (!player) throw new Error('Player not found');
    return player;
  }

  // Print history of rounds
  public printHistory() {
    console.log(this.history);
  }

  // Run the game
  public run() {
    this.state = 'IDLE';
  }
}
