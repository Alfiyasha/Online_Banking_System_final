const username = document.querySelector('#IUsername');
const password = document.querySelector('#IPassword');

const form = document.querySelector('#login');


const checkUsername = () => {



    let valid = false;



    const min = 3,
        max = 25;



    const Username = username.value.trim();



    if (!isRequired(Username)) {
        showError(username, 'Username cannot be blank.');
    } else if (!isBetween(Username.length, min, max)) {
        showError(username, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(username);
        valid = true;
    }
    return valid;
};


const checkPassword = () => {
    let valid = false;




    const Password = password.value.trim();



    if (!isRequired(Password)) {
        showError(password, 'Password cannot be blank.');
    } else if (!isPasswordSecure(Password)) {
        showError(password, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(password);
        valid = true;
    }



    return valid;
};




const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};



const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('alert-success');
    formField.classList.add('alert-danger');




    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};



const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;



    // remove the error class
    formField.classList.remove('alert-danger');
    formField.classList.add('alert-success');



    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}



form.addEventListener('input', function (e) {
    switch (e.target.id) {

        case 'IUsername':
            checkUsername();
            break;
        case 'IPassword':
            checkPassword();
            break;

    }
});




form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
    // validate fields

    let isUsernameValid = checkUsername(),
        isPasswordValid = checkPassword();






    let isFormValid = isUsernameValid && isPasswordValid;




    // submit to the server if the form is valid
    if (isFormValid) {
        $.ajax({
            url: 'https://localhost:44363/api/Account/login',
            method: 'POST',
            /*data: model,*/
            data: {
                username: $('#IUsername').val(),
                password: $('#IPassword').val()
            },

            success: function (res) {
                window.location.href = res.RedirectUrl;
            },
            error: function (jqXHR) {
                //$('#divErrorText').text(jqXHR.responseText);
                //$('#divError').show('fade');
                $("#validation-success").html("<div class='k-messagebox k-messagebox-error'>Wrong Password or Username</div>");
            }
        });



    }
    
});


