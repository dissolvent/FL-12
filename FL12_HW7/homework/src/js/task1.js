'use strict';

let users = {
    'user@gmail.com': 'UserPass',
    'admin@gmail.com': 'AdminPass',
}

let userEmail = prompt('Enter your email', '');
let userPassword, logged;

if (!userEmail) {
    alert('Canceled');
} else if (userEmail.length < 5) {
    alert('I don\'t know any emails having name length less than 5 symbols');
} else if (userEmail in users) {

    userPassword = prompt('Enter your password', '');
    if (!userPassword) {
        alert('Canceled');
    } else if (users[userEmail] !== userPassword) {
        alert('Wrong password');
    } else {
        logged = true;
    }

} else {
    alert('I don’t know you');
}

if (logged) {
    let changePassword = confirm('Do you want to change your password');

    if (!changePassword) {
        alert('You have failed the change.');
    } else {

        userPassword = prompt('Enter your current password', '');
        if (!userPassword) {
            alert('Canceled');
        } else if (users[userEmail] !== userPassword) {
            alert('Wrong password');
        } else {

            userPassword = prompt('Enter new password');
            if (!userPassword) {
                alert('Canceled');
            } else if (userPassword.length < 6) {
                alert('It’s too short password. Sorry.');
            } else {

                let confirmPassword = prompt('Enter new password again');
                if (confirmPassword !== userPassword) {
                    alert('You wrote the wrong password.');
                }
                else {
                    alert('You have successfully changed your password.');
                    users[userEmail] = userPassword;
                }

            }

        }
        
    }
}