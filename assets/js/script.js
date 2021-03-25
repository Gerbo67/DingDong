$(function() {
    $('.your-class').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
    });
});


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

$('.github').click(function (e){
    window.location.href="https://github.com/Gerbo67/DingDong";
    console.log(1);
});