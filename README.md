![](https://api.visitorbadge.io/api/VisitorHit?user=MherTumanyan&repo=card-game-simulation&countColor=%237B1E7A)

# Card Game Simulation

This project is a card game simulation implemented in TypeScript. It allows a player to bet on whether the next card drawn will be higher or lower than the dealer's card. The game is fully interactive in the terminal, featuring multiple rounds, betting, and win/loss conditions.

## Features

- **Betting System**: Place bets and guess if the next card is higher or lower than the dealer's card.
- **Round Management**: Automatic handling of round start, betting period, and round end.
- **Event Notifications**: Players receive events at each stage, such as `ROUND_START`, `ROUND_FINISH`, and `GAME_LEAVE` when their balance is insufficient.
- **Game History**: Stores the history of each round for later review.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MherTumanyan/card-game-simulation
   cd card-game-simulation
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the Game:**:
   ```bash
   npm start
   ```

## Game Configuration

The game can be configured in the **index.ts** file:

- **k**: Win multiplier (e.g., 1.7)
- **deckCount**: Number of decks to use (e.g., 6)
- **minBet**: Minimum bet allowed (e.g., 10)
- **roundTime**: Time limit per round in seconds (e.g., 15)

Example:

```bash
const game = new Game({
  k: 1.7,
  deckCount: 6,
  minBet: 10,
  roundTime: 15,
});
```

## How to Play

- Start the game: After the game starts, a dealer card is displayed.
- Place your bet: Enter an amount to bet. You can only bet within your balance.
- Make a guess: Predict if the next card will be higher (h) or lower (l) than the dealer card.
- End of round: After all players have guessed or the timer runs out, the round ends and results are displayed.
- Continue: The game proceeds to the next round until the player’s balance is insufficient.

## Testing

This project includes unit tests to verify core game functions. Run the tests with:

```bash
npm test
```

## Folder Structure

- **src/Game.ts**: Game logic and management.
- **src/Player.ts**: Player model and event notification system.
- **src/index.ts**: Main entry point to start and interact with the game.
