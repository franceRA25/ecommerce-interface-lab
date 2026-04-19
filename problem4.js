function getTopScorers(playerList) {
    return playerList
    .filter(player => player.score > 8)
    .map(player => player.name)
    .join(", ") ;
}

// testing
const players = [
    {name: "john patrick", score: 10},
    {name: "francis", score: 5},
    {name: "jayson", score: 67}
];
console.log(getTopScorers(players));