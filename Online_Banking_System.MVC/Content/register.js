const username = document.querySelector('#IUsername');
const password = document.querySelector('#IPassword');
const name = document.querySelector('#IName');
const email = document.querySelector('#IEmail');
const DOB = document.querySelector('#IDOB');
const phone = document.querySelector('#IPhone');
const address = document.querySelector('#IAddress');
const AccountType = document.querySelector('#IAccountType');
const form = document.querySelector('#signup');




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


const checkDOB = () => {



    let valid = false;



    const Dob = DOB.value.trim();



    if (!isRequired(Dob)) {
        showError(DOB, 'DOB cannot be blank.');
    
    } else {
        showSuccess(DOB);
        valid = true;
    }
    return valid;
};

const checkPhone = () => {



    let valid = false;



    const min = 10,
        max = 12;



    const Phone = phone.value.trim();



    if (!isRequired(Phone)) {
        showError(phone, 'Phone cannot be blank.');
    } else if (!isBetween(Phone.length, min, max)) {
        showError(phone, `Phone must be between ${min} and ${max} Digits.`)
    } else {
        showSuccess(phone);
        valid = true;
    }
    return valid;
};


const checkName = () => {
    let valid = false;
    const Name =name.value.trim();
    if (!isRequired(Name)) {
        showError(name, 'Name cannot be blank.');

    } else {
        showSuccess(name);
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


const checkEmail = () => {
    let valid = false;
    const Email = email.value.trim();
    if (!isRequired(Email)) {
        showError(email, 'Email cannot be blank.');
    } else if (!isEmailValid(Email)) {
        showError(email, 'Email is not valid.')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
}



const checkAddress = () => {
    let valid = false;
    const Address = address.value.trim();
    if (!isRequired(Address)) {
        showError(address, 'Address cannot be blank.');

    } else {
        showSuccess(address);
        valid = true;
    }
    return valid;
};

const isPasswordSecure = (Password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(Password);
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {

    const formField = input.parentElement;

    formField/*.querySelector('input')*/.classList.remove('alert-success');
    formField/*.querySelector('input')*/.classList.add('alert-danger');



    formField.querySelector('small').classList.add('alert-danger');
    const error = formField.querySelector('small');
    error.textContent = message;
};



const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;



    // remove the error class
    formField/*.querySelector('input')*/.classList.remove('alert-danger');
    formField/*.querySelector('input')*/.classList.add('alert-success');



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
        case 'IName':
            checkName();
            break;
        case 'IEmail':
            checkEmail();
            break;
        case 'IDOB':
            checkDOB();
            break;
        case 'IPhone':
            checkPhone();
            break;
        case 'IAddress':
            checkAddress();
            break;
        /*case 'IAccountType':
            checkAccountType();
            break;*/
    }
});



form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();



    // validate fields
    let isUsernameValid = checkUsername(),
        isPasswordValid = checkPassword(),
        isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isDOBValid = checkDOB(),
        isPhoneValid = checkPhone(),
        isAddressValid = checkAddress();
       /* isAccountTypeValid = checkAccountType();*/




    let isFormValid = isUsernameValid &&
        isPasswordValid &&
        isNameValid &&
        isEmailValid &&
        isDOBValid &&
        isPhoneValid &&
        isAddressValid;
      /*  isAccountType;*/





    // submit to the server if the form is valid
    if (isFormValid) {
        $.ajax({
            url: 'https://localhost:44363/api/account/register',
            method: 'POST',
            /*data: model,*/
            data: {
                username: $('#IUsername').val(),
                password: $('#IPassword').val(),
                Name: $('#IName').val(),
                Email: $('#IEmail').val(),
                DOB: $('#IDOB').val(),
                Phone: $('#IPhone').val(),
                Address: $('#IAddress').val(),
                AccountType: $('#IAccountType').val()
            },



            success: function () {
                //$('#successModal').modal('show');
                $.ajax({
                    url: 'https://localhost:44363/api/account/login',
                    method: 'POST',
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
            },
            error: function (jqXHR) {
                //$('#divErrorText').text(jqXHR.responseText);
                //$('#divError').show('fade');
                $("#validation-success").html("<div class='k-messagebox k-messagebox-error'>Some Internal Error</div>");
            }



        });
        /*});*/
    }
});



/*$("#login").click(function () {
    window.location.href = "https://localhost:44359/BookBlogger/Login";
});*/