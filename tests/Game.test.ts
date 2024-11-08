import { Game, GameEvents } from '../src/Game';
import { Player } from '../src/Player';

describe('Game Class Tests', () => {
  let game: Game;
  let player: Player;

  beforeEach(() => {
    game = new Game({
      k: 1.7,
      deckCount: 1,
      minBet: 10,
      roundTime: 2,
    });

    player = new Player({
      id: 1,
      name: 'TestPlayer',
      balance: 100,
      onNotify: jest.fn(),
    });

    // Mock player notify method
    player.notify = jest.fn();
    game.join(player);
  });

  test('Player can join the game', () => {
    expect(game['players'].length).toBe(1);
    expect(game['players'][0]).toBe(player);
  });

  test('Throws error if player joins twice', () => {
    expect(() => game.join(player)).toThrow('Already joined');
  });

  test('Throws error if player balance is below minimum bet', () => {
    const poorPlayer = new Player({
      id: 2,
      name: 'PoorPlayer',
      balance: 5,
      onNotify: jest.fn(),
    });
    expect(() => game.join(poorPlayer)).toThrow(
      `Minimum balance should be ${game.minBet}`
    );
  });

  test('Player can place a bet', () => {
    game.bet(10, 'hi', player.id);
    expect(player.balance).toBe(90); // balance after bet
    expect(game['bank']).toBe(10); // bank after bet
  });

  test('Throws error if player bet exceeds balance', () => {
    expect(() => game.bet(200, 'h', player.id)).toThrow(
      'Player does not have enough balance'
    );
  });

  test('Round starts and notifies players', () => {
    game['startRound']();
    expect(player.notify).toHaveBeenCalledWith(
      GameEvents.ROUND_START,
      expect.any(Object)
    );
  });

  test('Round finishes and resolves bets correctly', () => {
    game.bet(10, 'h', player.id);
    game['finishRound']();

    const roundInfo = game['roundInfo'];

    // Check if both `nextCard` and `dealerCard` are defined
    if (roundInfo.nextCard !== null && roundInfo.dealerCard !== null) {
      if (roundInfo.nextCard > roundInfo.dealerCard) {
        expect(player.balance).toBeGreaterThan(90); // Player wins
      } else {
        expect(player.balance).toBe(90); // Player loses
      }
    } else {
      // Handle the case where `nextCard` or `dealerCard` is null
      throw new Error(
        'Round did not complete properly: nextCard or dealerCard is null'
      );
    }
  });

  test('Player is removed if balance falls below minimum bet', () => {
    game.leave(player.id);
    game['finishRound']();
    expect(game['players'].length).toBe(0);
    expect(player.notify).toHaveBeenCalledWith(GameEvents.GAME_LEAVE, {});
  });

  test('Game history is recorded', () => {
    game.bet(10, 'h', player.id);
    game['finishRound']();
    expect(game['history'].length).toBe(2);
  });
});
