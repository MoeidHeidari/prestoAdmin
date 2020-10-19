$(document).ready(function () {
    // Listen to submit event on the <form> itself!
    $('#loginForm').submit(function (e) {

        // Prevent form submission which refreshes page
        e.preventDefault();

        $('#errorText').text("Loading...");

        // Serialize data
        const formData = $(this).serialize();


        $.ajax("/login/auth", {
            type: "POST",
            data: formData,
            statusCode: {
                200: function (response) {


                },
                401: function (response) {
                    $("#login_btn").attr('disabled', false);
                    $('#errorText').text("Access denied");

                },
                400: function (response) {

                    $("#login_btn").attr('disabled', false);
                    $('#errorText').text("Invalid email or password");

                },
                404: function (response) {


                },
                402: function (response) {
                    $("#login_btn").attr('disabled', false);
                    $('#errorText').text("error");

                }
            }, success: function (data) {


                window.location.href = data.location;


            },
            complete: function () {
                $("#login_btn").attr('disabled', false);


            }
        });


    });



});

