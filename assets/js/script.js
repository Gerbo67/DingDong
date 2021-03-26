$(function() {
    LlenadoSlider();
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


function LlenadoSlider(){
    var res = "";
    block();
    $.ajax({
        url: "https://dingdongapi.azurewebsites.net/api/marcas",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (MD) {
            for(i = 0; i<MD.length;i++){
                res += '<div class="sector">' +
                            '<div class="your-class">' +
                                 '<div class="cardShop">' +
                                     '<div class="cardss">' +
                                        '<div class="cardLogo">' +
                                            '<img class="MarcaLogo" src="assets/img/Logos/'+MD[i].ImagenNombre+'" alt="Steren Logo">' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
                //----------------------------------Items---------------------------------------//
                $.ajax({
                    url: "https://dingdongapi.azurewebsites.net/api/items/"+MD[i].Id,
                    async:false,
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        for(c = 0; c<data.length;c++){

                            res +='<div class="cardShop">' +
                                    '<div class="cardss">' +
                                        '<div class="headerCard">' +
                                            '<img class="ItemImage" src="assets/img/Items/Steren1.png" alt="Timbres">' +
                                        '</div>' +
                                        '<div class="bodyCard">' +
                                            '<h1>'+ data[c].ItemNombre +'</h1>' +
                                             '<p>' + data[c].Descripcion +'</p>' +
                                        '</div>' +
                                        '<div class="footerCard">' +
                                            '<div class="footerItems">' +
                                                '<button class="footerButton" >Agregar al Carrito</button>' +
                                                    '<div class="footerInfo"></div>' +
                                                    '<div class="footerPlay"></div>' +
                                             '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("Error when the system try to generate the general graphic");
                    }
                });
                res += '</div></div>';
            }

            const param = document.querySelector('.sliderShop');

            param.innerHTML += res;

            slick();

            unBlock();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error when the system try to generate the general graphic");
        }
    });
}

function slick(){
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
}

function block(){
    document.querySelector('#teal').style.opacity = 1;
    document.querySelector('body').style.overflow = 'hidden';
}

function unBlock(){
    setTimeout(function() {
        document.querySelector('#teal').style.opacity = 0;
        document.querySelector('body').style.overflow = 'visible';
    }, 3000);

}


