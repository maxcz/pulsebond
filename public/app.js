(function () {
    // click handler
    $('#btnValidate').click(function (evt) {
        var email = $('#emailInput').val();

        if (email !== '') {
            $.post('/signup', { email: email }).then(function (result) {
                if (result.success === true) {
                    $('#message').text('Thanks for registering');
                } else {
                    $('#message').text('Email is already used!!');
                }
            });
        }
    });
})()