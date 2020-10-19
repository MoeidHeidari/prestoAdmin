
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
var mainModalSelectedRole;

function setRoleId(roleId) {
    mainModalSelectedRole = roleId;
}

function removeAction(userId)
{

    $('#userRemoveModalCenter').modal('show');
    $('#userRemoveModalCaution').text('by performing this action this user would be deleted perminantly and you wont be able to retrive it anymore.\n' +
        'select proper operation.');
    $('#removeUserModalConfirmButton').click(function()
    {
        removeUser(userId);
    });

}
function activeUserAction(userId,isActive)
{

    $('#userActiveModalCenter').modal('show');
    if(isActive)
    {
        $('#activeUserModalCaution').text('by performing this action this user would be activated.\n' +
            'select proper operation.');
        $('#activeUserModalConfirmButton').click(function()
        {

            activeUser(userId,true);
        });

    }
    else {
        $('#activeUserModalCaution').text('by performing this action this user would be deactivated.\n' +
            'select proper operation.');
        $('#activeUserModalConfirmButton').click(function()
        {

            activeUser(userId,false);
        });
    }


}
function activeUser(userId,activeOrDeactive)
{

    var url='/users/activaUser';
    if(!activeOrDeactive)
    {
        url='/users/deactiveUser';
    }
    var data = {'userId': userId};
    $.ajax(url, {
        type: "POST",
        data: data,
        statusCode: {
            200: function (response) {


            },
            401: function (response) {
                $(document).Toasts('create', {
                    class: 'bg-danger',
                    title: 'Caution',
                    subtitle: 'close',
                    body: 'you are not allowed to do such an operation (Please call system administrator)'
                });

            },
            400: function (response) {

            },
            404: function (response) {


            },
            402: function (response) {


            }
        }, success: function (data) {


            var message='user info has been activated successfully please reload the page to see the changes';
            if(!activeOrDeactive)
            {
                message='user info has been deactivated successfully please reload the page to see the changes';
            }

            $(document).Toasts('create', {
                class: 'bg-success',
                title: 'Congratulations',
                subtitle: 'close',
                body: message
            });

            window.location.reload();

        },
        complete: function () {


        }
    });
}

function removeUser(userId)
{
    var data = {'userId': userId}
    $.ajax("/users/removeUser", {
        type: "POST",
        data: data,
        statusCode: {
            200: function (response) {


            },
            401: function (response) {
                $(document).Toasts('create', {
                    class: 'bg-danger',
                    title: 'Caution',
                    subtitle: 'close',
                    body: 'you are not allowed to do such an operation (Please call system administrator)'
                });

            },
            400: function (response) {

            },
            404: function (response) {


            },
            402: function (response) {


            }
        }, success: function (data) {



            $(document).Toasts('create', {
                class: 'bg-success',
                title: 'Congratulations',
                subtitle: 'close',
                body: 'user info has been updated successfully please reload the page to see the changes'
            });
            window.location.reload();

        },
        complete: function () {


        }
    });
}

function editAction(userId)
{
    var data = {'userId': userId}
    $.ajax("/users/getUserInfo", {
        type: "POST",
        data: data,
        statusCode: {
            200: function (response) {


            },
            401: function (response) {
                $(document).Toasts('create', {
                    class: 'bg-danger',
                    title: 'Caution',
                    subtitle: 'close',
                    body: 'you are not allowed to do such an operation (Please call system administrator)'
                });

            },
            400: function (response) {

            },
            404: function (response) {


            },
            402: function (response) {


            }
        }, success: function (data) {

            $('#mainUserModal').modal('show');

            $('#ModalMainUserFullName').text(data.firstName + ' ' + data.lastName);
            $('#ModalMainUserEmail').text(data.email);
            if (data.isActivated) {

                $('#userMainModalHeader').removeClass("card-warning").addClass('card-success');

                $('#UserSateteSpan').removeClass("badge-warning").addClass('badge-success').text('activated');
            } else {
                $('#userMainModalHeader').removeClass("card-success").addClass('card-warning');

                $('#UserSateteSpan').removeClass("badge-success").addClass('badge-warning').text('pending');
            }
            $('#MainModalFirstNameInput').val(data.firstName);
            $('#MainModalLastNameInput').val(data.lastName);
            $('#MainModalEmailInput').val(data.email);
            $('#MainModalPhoneNumberInput').val(data.phoneNumber);
            $('#ModalMainUserImage').attr('src',data.proImage);


            if (data.role=='1') {
                $('#MainModalRoleSelection option[value="1"]').attr("selected", "selected");
            } else {
                $('#MainModalRoleSelection option[value="2"]').attr("selected", "selected");
            }
            $('#MainModalSubmitButton').click(function()
            {
                updateUser(userId);
            });



        },
        complete: function () {


        }
    });

}

function updateUser(userId)
{


        var data = {
            firstName: $('#MainModalFirstNameInput').val(),
            lastName: $('#MainModalLastNameInput').val(),
            email: $('#MainModalEmailInput').val(),
            phoneNumber: $('#MainModalPhoneNumberInput').val(),
            role:$('#MainModalRoleSelection :selected').val(),
            userId: userId

        };
        $.ajax("/users/updateUserInfo", {
            type: "POST",
            data: data,
            statusCode: {
                200: function (response) {


                },
                401: function (response) {
                    $(document).Toasts('create', {
                        class: 'bg-danger',
                        title: 'Caution',
                        subtitle: 'close',
                        body: 'you are not allowed to do such an operation (Please call system administrator)'
                    });

                },
                400: function (response) {

                },
                404: function (response) {


                },
                402: function (response) {


                }
            }, success: function (data) {

                //$('#mainUserModal').modal('toggle');
                $(document).Toasts('create', {
                    class: 'bg-success',
                    title: 'Congratulations',
                    subtitle: 'close',
                    body: 'user info has been updated successfully please reload the page to see the changes'
                });



            },
            complete: function () {


            }
        });
}