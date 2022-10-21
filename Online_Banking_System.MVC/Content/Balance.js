$('#ShowBalance').click(function () {
    $.ajax({
        url: 'https://localhost:44363/api/OnlineBankingSystem/Balance',
        method: 'GET',

        success: function (res) {
                $('#bal').html(res);
        },
        error: function () {
           
        }
    });
});
