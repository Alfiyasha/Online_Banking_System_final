$('#IBUTTON').click(function () {
    $.ajax({
        url: 'https://localhost:44363/api/OnlineBankingSystem/AmountTransfer',
        method: 'POST',

        data: {
            AccountNumber: $('#IAccountNumber').val(),
            AccountHolder: $('#AccountHolder').val(),
            Amount: $('#IAmount').val()
        },

        success: function () {
            $('#ISuccess').html("Your transaction is successfull");
        },
        error: function () {

        }
    });
});