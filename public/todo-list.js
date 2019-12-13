const APItoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidG9rZW4iLCJpYXQiOjE1NzYyMDEyMDN9.p3Kf5xmxE5XT_Tvekej2KhnGFD2J3i-w2gJQNeRhKdc";
// Sayfa yüklendiğinde Yapılacakları çeker

function listTodos() {
    $('#todos').html('');
    $.ajax({
        type: 'GET',
        url: '/todos',
        success: function (todos) {
            todos.forEach(todo => {
                $('#todos').append(
                    `<li id="todo" data-id="${todo.id}"> ${todo.todo}</li>`
                )
            });
        }
    });
    
}

$(document).ready(function () {

    $(document).on('click', '#todo', function () {
        var id = $(this).data("id");
        $.ajax({
            type: 'DELETE',
            headers: {
                'Authorization': APItoken
            },
            url: '/todos/' + id,
            success: function (data) {
                //do something with the data via front-end framework
                listTodos();
            }
        });
    });


    listTodos();
    
    $('form input').focus();

    $('form').on('submit', function () {

        var item = $('form input');
        var todo = { todo: item.val() };

        $.ajax({
            type: 'POST',
            url: '/todos',
            data: todo,
            success: function (data) {
                listTodos();
            }
        });

        return false;

    });


});