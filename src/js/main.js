let pickedNumber = Math.floor(Math.random() * 24) + 1;
console.log(pickedNumber);


$('form .btn').click(function () {
    let yourNumber = $('form input').val();

    if (pickedNumber === yourNumber) {
        alert('You win!');
    } else {
        alert('You loose!');
    }
});
