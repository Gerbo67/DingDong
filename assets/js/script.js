$(function () {
    LlenadoSlider();

    alertify.set('notifier', 'position', 'bottom-left');

    $(document).on('click', '.buttonSesion', function () {
        inicioSesion();
    });

    $(document).on('click', '.buttonRegister', function () {
        ocultarmostar();
    });

    $(document).on('click', '.buttonRegister2', function () {
        registrar();
    });

});

let select = 0;

function ocultarmostar() {
    if (select == 0) {
        document.getElementById("zonaregistro").style.display = 'block';
        select = 1;
    } else {
        document.getElementById("zonaregistro").style.display = 'none';
        select = 0;
    }
}


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
        '<div id="zonaregistro" class="zonaregistro">' +
        '<div class="titlereg">Ingresa tus datos</div>' +
        '<div class="bodyregister">' +
        '<div class="labelUser">Correo electronico:</div>' +
        '<div class="inputUser"><input id="emailr" type="text" placeholder="example@example.com"></div>' +
        '<div class="labelUser">Nombre de usuario:</div>' +
        '<div class="inputUser"><input id="nameusur" maxlength="9" type="text" placeholder="example10"></div>' +
        '<div class="labelUser">Contraseña:</div>' +
        '<div class="inputUser"><input id="passwordr" type="password" placeholder="************"></div>' +
        '<div class="buttonRegister2">Enviar datos</div>' +
        '</div>' +
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
                        alert("ERROR: No se pudo consultar items");
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
            alert("ERROR: No se pudo consultar marcas");
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
    }, 1000);

}


function inicioSesion() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let val = validarSesion(email, pass);
    if (val == 1) {
        comprobar(email, pass);
    }
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
                document.getElementById("user_name").innerText = data[0].nombre;
                document.querySelector("button.ajs-ok").click();
                //alertify.alert('init').close();
            }
            unBlock();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("ERROR: No se pudo iniciar sesion");
            unBlock();
        }
    });
}

function validarSesion(email, pass) {
    let val = 0;

    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (emailRegex.test(email)) {
        if (pass.length >= 5) {
            val = 1;
        } else {
            alertify.error('Contraseña pequeña (min 5 caracteres)');
            val = 0;
        }
    } else {
        alertify.error('No es un correo valido (faltan o son menos de 10 caracteres)');
        val = 0;
    }

    return val;
}

function registrar() {

    let email = document.getElementById("emailr").value;
    let user = document.getElementById("nameusur").value;
    let pass = document.getElementById("passwordr").value;

    const val = validarRegistro(email, user, pass);
    if (val == 1) {
        InsertarRegistro(email, user, pass);
    }

}

async function InsertarRegistro(email, user, pass) {
    block();

    $.ajax({
        url: "https://dingdongapi.azurewebsites.net/api/user/" + email + "/" + user + "/" + pass,
        async: false,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            //console.log(data[0].nombre);
            //console.log(data[0].result);

            if (data[0].result == 2) {
                alertify.success('¡Registro exitoso!');
                ocultarmostar();
            } else if (data[0].result == 1) {
                alertify.error('¡Usuario ya existe!');
            } else {
                alertify.error('¡Correo ya vinculado con otro usuario!');
            }
            unBlock();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("ERROR: No se pudo registar");
            unBlock();
        }
    });
}

function validarRegistro(email, user, pass) {
    let val = 0;

    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let userRegex = /\s/;

    if (emailRegex.test(email)) {
        if (user.length >= 3) {
            if (!userRegex.test(user)) {
                if (pass.length >= 5) {
                    val = 1;
                } else {
                    alertify.error('Contraseña pequeña (min 5 caracteres)');
                    val = 0;
                }
            } else {
                alertify.error('Nombre de usuario no debe tener espacios');
                val = 0;
            }
        } else {
            alertify.error('Nombre de usuario pequeño (min 3 caracteres)');
            val = 0;
        }
    } else {
        alertify.error('No es un correo valido (faltan o son menos de 10 caracteres)');
        val = 0;
    }

    return val;
}


