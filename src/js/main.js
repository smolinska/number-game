const difficulty = {
    hard: 2,
    medium: 3,
    easy: 4,
};

$('form .btn').click(function (event) {
    let pickedNumber = Math.floor(Math.random() * 24) + 1;
    console.log(pickedNumber);
    event.preventDefault();
    let form = document.getElementById('game-form');
    let yourNumber = form['your-number'].value;
    let pickedDifficulty = difficulty[form.difficulty.value];


    let difference = Math.abs(pickedNumber - yourNumber);
    if (difference <= pickedDifficulty) {
        $('#feedback').html(`<i class="fa fa-check" aria-hidden="true" style="font-size:50px"></i><br>You win!<br>Number was: ${pickedNumber}`);
    } else {
        $('#feedback').html(`<i class="fa fa-times" aria-hidden="true" style="font-size:50px"></i><br>You loose!<br>Number was: ${pickedNumber}`);
    }

    form['your-number'].value = '';
});
