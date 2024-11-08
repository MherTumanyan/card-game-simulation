import { Player } from '../src/Player';

describe('Player Class Tests', () => {
  let player: Player;
  let mockNotify: jest.Mock;

  beforeEach(() => {
    mockNotify = jest.fn();
    player = new Player({
      id: 1,
      name: 'TestPlayer',
      balance: 100,
      onNotify: mockNotify,
    });
  });

  test('Player attributes are set correctly', () => {
    expect(player.id).toBe(1);
    expect(player.name).toBe('TestPlayer');
    expect(player.balance).toBe(100);
  });

  test('Player receives notifications correctly', () => {
    const data = { message: 'test notification' };
    player.notify('ROUND_START', data);
    expect(mockNotify).toHaveBeenCalledWith('ROUND_START', data);
  });

  test('Player balance updates correctly after bet', () => {
    player.balance -= 10;
    expect(player.balance).toBe(90);
  });
});
