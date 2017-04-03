$(document).ready(function () {

    let result = localStorage.getItem("lastResult");
    let lives = localStorage.getItem("lives");

    let hearts = $('#hearts i');

    if (result === null) {
        result = 0;
    }

    if (lives === null) {
        lives = 7;
    }

    setBlackHearts(lives);
    $('#your-result').html(result);


    const difficulty = {
        hard: 1,
        medium: 3,
        easy: 5,
    };

    $('form #go').click(function (event) {
        let pickedNumber = Math.floor(Math.random() * 24) + 1;
        console.log(pickedNumber);
        event.preventDefault();
        let form = document.getElementById('game-form');
        let yourNumber = form['your-number'].value;
        let pickedDifficulty = difficulty[form.difficulty.value];


        let difference = Math.abs(pickedNumber - yourNumber);

        let firstBlack;
        for (firstBlack = 0; firstBlack < hearts.length; firstBlack++) {
            if (hearts.eq(firstBlack).css('color') == 'rgb(0, 0, 0)') {
                break
            }

        }

        if (difference <= pickedDifficulty) {
            $('#feedback').html(`<i class="fa fa-check" aria-hidden="true" style="font-size:50px"></i><br>You win!<br>Number was: ${pickedNumber}`);
            result++;
            hearts.eq(firstBlack).css('color', '');
        } else {
            $('#feedback').html(`<i class="fa fa-times" aria-hidden="true" style="font-size:50px"></i><br>You loose!<br>Number was: ${pickedNumber}`);
            result--;
            lives--;
            localStorage.setItem('lives',lives);
            hearts.eq(firstBlack - 1).css('color', 'rgb(0, 0, 0)');
            if (firstBlack === 1) {
                alert("You are looser!");
                clearEverything();
            }
        }
        $('#your-result').html(result);

        localStorage.setItem("lastResult", result);
        form['your-number'].value = '';
    });

    $('#reset').click(clearEverything);

    function clearEverything() {

        localStorage.clear();
        result = 0;
        lives = 7;
        setBlackHearts(lives);
        $('#your-result').html(result);
    }
    //TODO: refreshing red hearts after reset
    function setBlackHearts(lives) {
        for (let i = hearts.length; i > lives; i--) {
            hearts.eq(i - 1).css('color', 'rgb(0, 0, 0)');
        }
    }

});

