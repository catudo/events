var SERVER = 'http://localhost:8080/';
var isLocal = true;
var REDIRECT =  (isLocal)? '../events' :SERVER + 'events' ;

$(function() {

    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});



function login() {

    var data = JSON.stringify( getFormData($("#login-form")) );;

    $.ajax({
        url: SERVER+'api/users/login',
        type: 'POST',
        data: data ,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if(response.allowed == true){
                window.location.href = REDIRECT;
            }else {
                alertify.error("Usuario o Password incorrecto");
            }
        },
        error: function (e) {
            console.log(e)
        }
    });

}

function signup() {

    var data = JSON.stringify( getFormData($("#register-form")) );;
    $.ajax({
        url: SERVER+'api/users/signup',
        type: 'POST',
        data: data ,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {

            if(response.errmsg != undefined && response.errmsg.includes("E11000")){
                alertify.error("El usuario ya existe");
            }

            else if(response.saved == true) {
                alertify.success('Usuario Registrado');
                $('#login-form-link').click()
            }


            if(response.errors!= undefined && response.errors.hasOwnProperty("names")){
                alertify.error("Los nombres son Requeridos");
            }

            if(response.errors!= undefined && response.errors.hasOwnProperty("password")){
                alertify.error("La constrase&ntilde;a es Requerida");
            }

            if(response.errors!= undefined && response.errors.hasOwnProperty("email")){
                alertify.error("El correo es Requerido");
            }


        },
        error: function (e) {
            console.log("error"+response)
        }
    });

}

function getFormData(form){
    var unindexed_array = form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}


