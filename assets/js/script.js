$(function () {
    LlenadoSlider();

    $(document).on('click', '.buttonSesion', function () {
        inicioSesion();
    });
});


$('.user').click(function (e) {

    //Evitar Cierre
    alertify.alert().set('closable', false);

    //Evitar mover alert
    alertify.alert().set('movable', false);

    //Identificamos como modal
    alertify.alert().isModal();

    //Se acciona como Modal
    alertify.alert().set('modal', true);

    //Titulo
    alertify.alert().setHeader('<b>Inicio de Sesión</b>');

    alertify.alert().set('label', 'Cerrar');

    alertify.alert().set({transition: 'zoom'});
    //Contenido
    alertify.alert().setContent('<div class="sesion">' +
        '<div class="labelUser">Correo electronico:</div>' +
        '<div class="inputUser"><input id="email" type="email" placeholder="example@example.com"></div>' +
        '<div class="labelUser">Contraseña:</div>' +
        '<div class="inputUser"><input id="password" type="password" placeholder="************"></div>' +

        '<div class="buttons">' +
        '<div class="buttonSesion">Iniciar Sesión</div>' +
        '<div class="buttonRegister">Registrarse</div>' +
        '</div>' +
        '</div>').show();
});

$('.github').click(function (e) {
    window.location.href = "https://github.com/Gerbo67/DingDong";
    console.log(1);
});


function LlenadoSlider() {
    var res = "";
    block();
    $.ajax({
        url: "https://dingdongapi.azurewebsites.net/api/marcas",
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (MD) {
            for (i = 0; i < MD.length; i++) {
                res += '<div class="sector">' +
                    '<div class="your-class">' +
                    '<div class="cardShop">' +
                    '<div class="cardss">' +
                    '<div class="cardLogo">' +
                    '<img class="MarcaLogo" src="assets/img/Logos/' + MD[i].ImagenNombre + '" alt="Steren Logo">' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                //----------------------------------Items---------------------------------------//
                $.ajax({
                    url: "https://dingdongapi.azurewebsites.net/api/items/" + MD[i].Id,
                    async: false,
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        for (c = 0; c < data.length; c++) {

                            res += '<div class="cardShop">' +
                                '<div class="cardss">' +
                                '<div class="headerCard">' +
                                '<img class="ItemImage" src="assets/img/Items/Steren1.png" alt="Timbres">' +
                                '</div>' +
                                '<div class="bodyCard">' +
                                '<h1>' + data[c].ItemNombre + '</h1>' +
                                '<p>' + data[c].Descripcion + '</p>' +
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
                res += '</div></div>' +
                    '<div class="main-footer">' +
                    '<div class="l-container main-header_block">' +
                    '<p>Derechos Reservados Equipo dinamita ©</p>' +
                    '<div class="main-utilities"><img src="assets/img/github.png" alt="Github" class="main-utilities_item main-icon github">' +
                    '<img src="assets/img/instagram.png" alt="Instagram" class="main-utilities_item main-icon instagram">' +
                    '<img src="assets/img/facebook.png" alt="Facebook" class="main-utilities_item main-icon facebook">' +
                    '</div>' +
                    '</div>' +
                    '</div>';
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

function slick() {
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

function block() {
    document.querySelector('#teal').style.opacity = 1;
    document.querySelector('body').style.overflow = 'hidden';
}

function unBlock() {
    setTimeout(function () {
        document.querySelector('#teal').style.opacity = 0;
        document.querySelector('body').style.overflow = 'visible';
    }, 3000);

}


function inicioSesion() {
    const email = document.getElementById("email").value;
    console.log(email);
    const pass = document.getElementById("password").value;
    console.log(pass);
    comprobar(email, pass);

}

function comprobar(email, pass) {
    block();
    $.ajax({
        url: "https://dingdongapi.azurewebsites.net/api/user/" + email + "/" + pass,
        async: false,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            //console.log(data[0].nombre);
            //console.log(data[0].result);

            if (data[0].result == 1) {
                const pass = document.getElementById("user_name").innerText = data[0].nombre;
                document.querySelector("button.ajs-ok").click();
                //alertify.alert('init').close();
            }
            unBlock();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error when the system try to generate the general test");
            unBlock();
        }
    });
}


