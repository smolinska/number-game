let pickedNumber = Math.floor(Math.random() * 24) + 1;
console.log(pickedNumber);

const difficulty = {
    hard: 2,
    medium: 3,
    easy: 4,
};

$('form .btn').click(function () {
    let form = document.getElementById('game-form');
    let yourNumber = form['your-number'].value;
    let pickedDifficulty = difficulty[form.difficulty.value];


    let difference = Math.abs(pickedNumber - yourNumber);
    if (difference <= pickedDifficulty) {
        alert('You win!');
    } else {
        alert('You loose!');
    }
});
