$(document).ready(function () {
    $.ajax("/products/getCategories", {
        type: "GET",
        statusCode: {
            200: function (response) {


            },
            401: function (response) {


            },
            400: function (response) {

            },
            404: function (response) {


            },
            402: function (response) {


            }
        }, success: function (data)
        {
            $('#categoriesNumberBadge').text(data.length);
            data.forEach(function (item, i)
            {

                $('#MainCategoriesDataTable').dataTable().fnAddData( [
                    ++i,
                    item.title,
                    item.numberOfSubCategories,
                    '<td><span class="badge bg-warning">'+item.dateAdded+'</span></td>',
                    '<div class="input-group-prepend">\n' +
                    '                                                            <button type="button" class="btn btn-info dropdown-toggle"\n' +
                    '                                                                    data-toggle="dropdown" aria-expanded="false">\n' +
                    '                                                                Action\n' +
                    '                                                            </button>\n' +
                    '                                                            <div class="dropdown-menu" x-placement="bottom-start"\n' +
                    '                                                                 style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);">\n' +
                    '                                                                <a type="button" class="dropdown-item" onclick="categoryEditAction(\''+item._id+'\',\''+item.title+'\')">Edit</a>\n' +
                    '                                                                <a type="button" class="dropdown-item" onclick="categoryRemoveAction(\''+item._id+'\',\''+item.title+'\')">Remove</a>\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>'])
            });



        },
        complete: function () {


        }
    });

});
function categoryRemoveAction(categoryId,title)
{
    $('#RemoveModalCenter').modal('show');
    $('#RemoveModalTitle').text('remove ('+title+' )');
    $('#RemoveModalCaution').text('category and its subcategories will be removed permanently.');
    $('#RemoveModalConfirmButton').click(function ()
    {
        var data = {
            title: $('#categoryName').val(),
            catId: categoryId

        };
        $.ajax("/products/removeCategory", {
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
                    body: 'new category has been added successfully'
                });
                window.location.reload();


            },
            complete: function () {


            }
        });

    });



}
function categoryEditAction(categoryId,title)
{
    $('#EditCenterModal').modal('show');

    $('#EditCenterModalTitle').text('edit ( '+title+' )');
    $('#categoryName').val(title);
    $('#AddModalConfirmButton').click(function ()
    {
        var data = {
            title: $('#categoryName').val(),
            catId: categoryId

        };
        $.ajax("/products/editCategory", {
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
                    body: 'new category has been added successfully'
                });
                window.location.reload();


            },
            complete: function () {


            }
        });

    });

}
function openAddNewCategoryModal() {
    $('#EditCenterModal').modal('show');
    $('#EditCenterModalTitle').text('Add new category');
    $('#AddModalConfirmButton').click(function () {
        var data = {
            title: $('#categoryName').val()

        };
        $.ajax("/products/addNewCategory", {
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
                    body: 'new category has been added successfully'
                });
                window.location.reload();


            },
            complete: function () {


            }
        });
    });
}