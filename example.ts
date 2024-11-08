// const game = new Game({
//     k: 1.7,
//     deckCount: 6,
//     minBet: 100,
//     roundTime: 15,
//     history: [
//         {
//             dealerCard: 1,
//             nextCard: 2,
//             players: [{
//                 id: 1,
//                 guess: 'h',
//                 win: true,
//                 skip: false,
//                 bet: 200,
//                 winAmount: 340
//             }, {
//                 id: 2,
//                 guess: 'l',
//                 win: false,
//                 skip: false,
//                 bet: 200,
//                 winAmount: 0
//             }, {
//                 id: 3,
//                 guess: null,
//                 win: false,
//                 skip: true,
//                 bet: 0,
//                 winAmount: 0,
//             }]
//         }
//     ]
// });

// let input = null;
// const player = new Player({
//     id: 1,
//     name,
//     balance: 1000,
//     onNotify(event, data) => {
//         input.cancel();
//         switch(event) {
//             case ROUND_START:
//                 // console.log('round started');
//                 // const betAmount = // take input
//                 // const hi/lo = // take input
//                 // game.bet(betAmount, hi/lo);
//             case ROUND_FINISH:
//                 // console.log('round finished, you lost/win.......');
//             case GAME_LEAVE:
//                 // console.log('you leave and some additional info')
//         }
//     }
// });

// game.run();
// // state -> IDLE

// game.startRound();
// // game.roundInfo = { players: [], dealerCard: 1, nextCard: null }
// // game.state = ACEPTING_BETS;
// // game.players.forEach(player => player.notify(ROUND_START, { dealerCard });)
// // game.startRoundTimer();

// game.bet(100, 'lo')
// //    -> state == ACCEPTING_BETS
// //    -> check balance
// //    -> check there is no game.roundInfo
// //    -> player.balance - bet
// //    -> roundInfo.players.push({ id: player.id, bet: 100, guess: 'lo' });
// //    -> game.bank += bet;

// game.join(player);
// // check balance >= minBet
// // game.players.push(player);
// // if (game.state === IDLE) {
// //      game.startRound();
// // }

// game.leave(playerId)
// // game.leaveQueue.push(playerId);

// // game.getRoundPlayer(playerId) -> roundPlayer | null
// // game.getPlayer(playerId) -> Player

// game.roundFinish();
// // game.roundInfo.nextCard = game.getNextCard();
// // game.players.forEach((player) => {
// //    const roundPlayer = game.getRoundPlayer(player.id);
// //    if (!roundPlayer) {
//         //   game.roundInfo.players.push({ skip: true, bet: 0 });
//         // return;
// //    }
// //    if (game.hasPlayerWon(roundPlayer.guess)) {
// //         roundPlayer.win = true;
// //         roundPlayer.winAmount = roundPlayer.bet * game.k;
// //         player.balance += roundPlayer.winAmount;
// //         game.bank -= roundPlayer.winAmount;
// //     } else {
// //         roundPlayer.win = false;
// //         if (player.balance < minBet) game.leave(player);
// //     }
// //     player.notify(ROUND_FINISH, { nextCard, info: roundPlayer });
// // });

// // game.history.push(roundInfo);
// //
// // game.leaveQueue.forEach(delete from players by playerId (player) and call player.notify());
// // game.leaveQueue = [];
// // if (game.player.length > 0) {
// //    await sleep(1);
// //    game.startRound();
// // }
// // else game.state = IDLE;

// game.printHistory() // -> print history
