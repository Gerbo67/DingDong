
$('.user').click(function (e){

    //Evitar Cierre
    alertify.alert().set('closable', false);

    //Evitar mover alert
    alertify.alert().set('movable', false);

    //Se acciona como Modal
    alertify.alert().set('modal', true);

    //Titulo
    alertify.alert().setHeader('<b>Inicio de Sesión</b>');

    alertify.alert().set('label', 'Cerrar'); 

    //Contenido
    alertify.alert().setContent('<div class="sesion">' +
        '<div class="labelUser">Correo electronico:</div>' +
        '<div class="inputUser"><input type="email" placeholder="example@example.com"></div>' +
        '<div class="labelUser">Contraseña:</div>' +
        '<div class="inputUser"><input type="password" placeholder="************"></div>' +
        '</div>').show();
});