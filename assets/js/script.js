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

    $(document).on('click', '.closedButton', function () {
        cerrarSesion();

    });

    $(document).on('click', '.forgotButton', function () {
        ocultarmostrarforgot();
    });

    $(document).on('click', '.buttonOlvido', function () {
        ValidacionOlvido();
    });

    $(document).on('click', '#userB', function () {
        GuardarUsuario();
    });

    $(document).on('click', '#emailB', function () {
        GuardarEmail();
    });

    $(document).on('click', '#passB', function () {
        GuardarPass();
    });

    $(document).on('click', '.footerButton', function () {
        var Datos = this.id;
        var DatosA = Datos.split(';')
        var id = DatosA[0];
        var nombre = DatosA[1];
        addItems(id, nombre);
    });

    $(document).on('click', '.comprar', function () {
        money();
    });

    $(document).on('click', '.elC', function () {
        var Datos = this.id + 'b';
        deleteItem(Datos);
    });
});

let urlHost = 'https://dingdongapi.azurewebsites.net/api';
//let urlHost = 'http://127.0.0.1:8090/api';
let select = 0;
let active = 0;
let active2 = 0;
let activeU = 0;
let carritoU = 0;
let items = 0;
let total = 0;
let list = 0;
let lleno = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function money() {
    if (lleno == 1) {
        document.getElementById("money").style.display = 'block';
        document.getElementById('itemsCards').innerHTML = '';
        items = 0;
        total = 0;
        document.getElementById('itemsC').textContent = '' + items;
        document.getElementById('noti_d').textContent = '' + items;
        document.getElementById('totalI').textContent = '' + total;
        document.getElementById('noti').style.opacity = '0';
        document.getElementById('comprar').style.opacity = '0.2';
        setTimeout(function () {
            document.getElementById("money").style.display = 'none';
        }, 10000);
    }
}

function addItems(id, nombre) {
    if (carritoU == 0) {
        alertify.success('Inicia sesión para usar esta opcion.');
    } else {
        document.getElementById('noti').style.opacity = '1';
        lleno = 1;
        document.getElementById('comprar').style.opacity = '1';
        if ($('#' + id + 'a').length) {
            total = total - (parseInt(document.getElementById(id + 'c').textContent)) * (parseInt(document.getElementById(id + 'a').textContent));
            document.getElementById(id + 'a').textContent = '' + (parseInt(document.getElementById(id + 'a').textContent) + 1);
            total = total + (parseInt(document.getElementById(id + 'c').textContent)) * (parseInt(document.getElementById(id + 'a').textContent));
            items++;
        } else {
            var dinero = getRandomInt(100, 200);
            document.getElementById("itemsCards").insertAdjacentHTML('afterbegin', '<div id="' + id + ';bb" class="cardCarrito">' +
                '<div class="imgC">' +
                '<img src="assets/img/Items/Steren1.png" alt="Carrito Item">' +
                '</div>' +
                '<div class="contentC">' +
                '<div class="r2"><p class="repeter">x<span id="' + id + 'a">1</span></p></div>' +
                '<div class="titleC">' +
                '<p class="yei">' + nombre + '</p>' +
                '</div>' +
                '<div class="cost">$ <span id="' + id + 'c">' + dinero + '</span></div>' +
                '</div>' +
                '<div id="' + id + ';b" class="elC">' +
                '<i class="far fa-trash-alt"></i>' +
                '</div>' +
                '</div>')
            items++;
            total = total + dinero;
        }
        document.getElementById('itemsC').textContent = '' + items;
        document.getElementById('noti_d').textContent = '' + items;
        document.getElementById('totalI').textContent = '' + total;
    }
}

function deleteItem(dates) {
    var Datos = dates;
    var DatosA = Datos.split(';')
    var id = DatosA[0];

    total = total - (parseInt(document.getElementById(id + 'c').textContent)) * (parseInt(document.getElementById(id + 'a').textContent));
    items = items - (parseInt(document.getElementById(id + 'a').textContent));
    document.getElementById('itemsC').textContent = '' + items;
    document.getElementById('noti_d').textContent = '' + items;
    document.getElementById('totalI').textContent = '' + total;

    document.getElementById(id + ';bb').remove();
    if (items == 0) {
        document.getElementById('noti').style.opacity = '0';
        document.getElementById('comprar').style.opacity = '0.2';
        lleno = 0;
    }
}

function ocultarmostrarforgot() {
    if (active2 == 0) {
        document.getElementById("zonaOlvido").style.display = 'block';
        active2 = 1;
    } else {
        document.getElementById("zonaOlvido").style.display = 'none';
        active2 = 0;
    }
}

function ocultarmostar() {
    if (select == 0) {
        document.getElementById("zonaregistro").style.display = 'block';
        select = 1;
    } else {
        document.getElementById("zonaregistro").style.display = 'none';
        select = 0;
    }
}

$('.carrito').click(function (e) {
    if (carritoU == 0) {
        alertify.success('Inicia sesión para usar esta opcion.')
    } else {
        lista();
    }
});

function lista() {
    if (list == 0) {
        document.getElementById("carritoS").style.display = 'block'
        document.getElementById("closedS").style.display = 'none'
        list = 1;
    } else {
        document.getElementById("carritoS").style.display = 'none'
        document.getElementById("closedS").style.display = 'block'
        list = 0;
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
    if (active == 0) {
        //Contenido
        alertify.alert().setContent('<div class="sesion">' +
            '<div class="labelUser">Correo electronico:</div>' +
            '<div class="inputUser"><input id="email" type="email" placeholder="example@example.com"></div>' +
            '<div class="labelUser">Contraseña:</div>' +
            '<div class="inputUser"><input id="password" type="password" placeholder="************"></div>' +
            '<div class="forgotButton">¿Se te ha olvidado tu contraseña?</div>' +
            '<div id="zonaOlvido" class="zonaOlvido">' +
            '<div class="titlereg">Zona del olvido</div>' +
            '<div class="bodyOlvido">' +
            '<div class="labelUser">Correo electronico o Usuario:</div>' +
            '<div class="inputUser"><input id="inputP" type="text" placeholder="example@example.com/example10"></div>' +
            '<div class="buttonOlvido">Enviar datos</div>' +
            '</div>' +
            '</div>' +
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
    } else {
        //Titulo
        alertify.alert().setHeader('<b>Perfil DingDong</b>');
        //Contenido
        alertify.alert().setContent('<div class="sesion">' +
            '<div class="labelUser">Usuario:</div>' +
            '<div class="inputUser"><div id="userB" class="tapeButton"><i id="chkU" class="fa fa-check" style="display: none" aria-hidden="true"></i><i id="saveU" class="fas fa-save"></i><img id="loadU" style="display: none" src="assets/img/circles-menu-1.gif"></div><input id="userA" maxlength="9" class="input" type="text"/></div>' +
            '<div class="labelUser">Correo electronico:</div>' +
            '<div class="inputUser"><div id="emailB" class="tapeButton"><i id="chkE" class="fa fa-check" style="display: none" aria-hidden="true"></i><i id="saveE" class="fas fa-save"></i><img id="loadE" style="display: none" src="assets/img/circles-menu-1.gif"></div><input id="emailA" class="input" type="email"  /></div>' +
            '<div class="labelUser">Contraseña:</div>' +
            '<div class="inputUser"><div id="passB" class="tapeButton"><i id="chkP" class="fa fa-check" style="display: none" aria-hidden="true"></i><i id="saveP" class="fas fa-save"></i><img id="loadP" style="display: none" src="assets/img/circles-menu-1.gif"></div><input id="passA" class="input" type="password"  placeholder="***************"/></div>' +
            '</div>').show();
        document.getElementById("emailA").placeholder = document.getElementById("correoRegis").textContent;
        document.getElementById("userA").placeholder = document.getElementById("userRegis").textContent;
    }
});

$('.github').click(function (e) {
    window.location.href = "https://github.com/Gerbo67/DingDong";
    console.log(1);
});

function LlenadoSlider() {
    var res = "";
    block();
    $.ajax({
        url: urlHost + "/marcas",
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
                    url: urlHost + "/items/" + MD[i].Id,
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
                                '<button class="footerButton" id="' + data[c].Id + ';' + data[c].ItemNombre + '" >Agregar al Carrito</button>' +
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
        url: urlHost + "/user/" + email + "/" + pass,
        async: false,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data[0].result == 1) {
                eliminarCampos();
                document.getElementById("user_name").innerText = data[1].nombre;
                carritoU = 1;
                abrirSesion(email, data[1].nombre, pass);
                document.querySelector("button.ajs-ok").click();
                alertify.success('Bienvenido ' + data[1].nombre);
                eliminarCampos();
                active = 1;
                //alertify.alert('init').close();
            } else if (data[0].result == 2) {
                alertify.warning('Tienes que verificar tu correo.');
                eliminarCampos();
            } else if (data[0].result == 4) {
                alertify.error('Contraseña incorrecta');
                eliminarCampos();
            } else {
                alertify.error('No se pudo iniciar sesión');
                eliminarCampos();
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
        url: urlHost + "/user/" + email + "/" + user + "/" + pass,
        async: false,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            //console.log(data[0].nombre);
            //console.log(data[0].result);

            if (data[0].result == 2) {
                alertify.success('¡Registro exitoso!');
                eliminarCampos();
                alertify.notify('Verifica tu correo: ' + email, 'custom', 2, function () {
                });
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
    let passRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/g;
    let userRegex = /\s/;
    if (emailRegex.test(email)) {
        if (user.length >= 3) {
            if (!userRegex.test(user)) {
                if (passRegex.test(pass)) {
                    val = 1;
                } else {
                    alertify.error('La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.');
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

function ValidacionOlvido() {

    let date = document.getElementById("inputP").value;
    if (date.length > 3) {
        validarUsuarioP(date);
    } else {
        alertify.error('Caracteres insuficientes!');
    }
}

function validarUsuarioP(user) {
    block();
    $.ajax({
        url: urlHost + "/forgot/" + user,
        async: false,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data[0].result);
            if (data[0].result == 0) {
                alertify.error('Usuario no existe!');
            } else if (data[0].result == 1) {
                alertify.notify('No se puede restaurar contraseña ya que hace 1 dia se pidio el cambio, en el caso de que se le haya enviado las indicaciones  y no las encuentra revise spam', 'custom', 10, function () {
                });

            } else {
                alertify.notify('Verifica tu correo: ' + data[0].result, 'custom', 2, function () {
                });

                $.ajax({
                    url: urlHost + "/forgot/" + data[0].result,
                    async: false,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("ERROR: No se pudo madar correo de contraseña");
                        unBlock();
                    }
                });
            }
            unBlock();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("ERROR: No se pudo validar usuario para contraseña");
            unBlock();
        }
    });
}

function eliminarCampos() {
    document.getElementById("emailr").value = '';
    document.getElementById("nameusur").value = '';
    document.getElementById("passwordr").value = '';
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';
}

function abrirSesion(email, user, pass) {
    document.getElementById("closedS").style.display = 'block';
    document.getElementById("correoRegis").textContent = email;
    document.getElementById("contraRegis").textContent = pass;
    document.getElementById("userRegis").textContent = user;
}

function cerrarSesion() {
    block();
    document.getElementById("closedS").style.display = 'none'
    document.getElementById("user_name").innerText = '';
    document.getElementById("correoRegis").innerText = '';
    document.getElementById("contraRegis").innerText = '';
    active = 0;
    carritoU = 0;
    alertify.error('Hasta luego.');
    unBlock();
}

function GuardarUsuario() {
    let userRegex = /\s/;
    var email = document.getElementById("correoRegis").textContent;
    var user = document.getElementById("userA").value;
    if (user == document.getElementById("userRegis").textContent) {
        if (user.length > 3 && !userRegex.test(user)) {
            if (activeU == 0) {
                activeU = 1;
                document.getElementById("saveU").style.display = 'none';
                document.getElementById("loadU").style.display = 'block';
                document.getElementById("loadU").style.width = '50%';
                $.ajax({
                    url: urlHost + "/actualizarU/" + user + "/" + email,
                    async: false,
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data == 1) {
                            setTimeout(function () {
                                loadU();
                                document.getElementById("userRegis").textContent = user;
                                document.getElementById("user_name").innerText = user;
                            }, 6000);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("ERROR: No se pudo registar");
                        loadU();
                    }
                });
            }
        } else {
            alertify.error('Nombre de usuario pequeño (min 3 caracteres) y sin espacios');
            document.getElementById("userA").value = "";
        }
    } else {
        alertify.error('El usuario no puede ser el mismo');
        document.getElementById("userA").value = "";
    }
}

function loadU() {
    document.getElementById("loadU").style.display = 'none';
    document.getElementById("chkU").style.display = 'block';
    setTimeout(function () {
        document.getElementById("chkU").style.display = 'none';
        document.getElementById("saveU").style.display = 'block';
        document.getElementById("userA").value = "";
        document.getElementById("userA").placeholder = document.getElementById("userRegis").textContent;
        activeU = 0;

    }, 2000);
}

function GuardarEmail() {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    var email = document.getElementById("correoRegis").textContent;
    var email2 = document.getElementById("emailA").value;
    if (email != email2) {
        if (emailRegex.test(email2)) {
            if (activeU == 0) {
                activeU = 1;
                document.getElementById("saveE").style.display = 'none';
                document.getElementById("loadE").style.display = 'block';
                document.getElementById("loadE").style.width = '50%';
                $.ajax({
                    url: urlHost + "/actualizarE/" + email2 + "/" + email,
                    async: false,
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data == 1) {
                            setTimeout(function () {
                                loadE(email2);
                                alertify.success('Se envio la verifcacion a ' + email2 + ' una vez verificado el correo tiene que cerrar sesion y abrirla con el nuevo correo')
                            }, 6000);
                        } else if (data == 2) {
                            alertify.error('Este correo esta siendo vinculado')
                            loadE(1);
                        } else if (data == 3) {
                            alertify.error('Su cuenta esta en espera de cambiar de correo')
                            loadE(1);
                        } else {
                            alertify.error('El correo ya esta vinculado')
                            loadE(1);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("ERROR: No se pudo registar");
                        loadU(1);
                    }
                });
            }
        } else {
            alertify.error('Correo incorrecto');
            document.getElementById("userA").value = "";
        }
    } else {
        alertify.error('El correo no puede ser el mismo');
        document.getElementById("userA").value = "";
    }
}

function loadE(v) {
    if (v == 1) {
        document.getElementById("loadE").style.display = 'none';
        document.getElementById("chkE").style.display = 'block';
        setTimeout(function () {
            document.getElementById("chkE").style.display = 'none';
            document.getElementById("saveE").style.display = 'block';
            document.getElementById("emailA").value = "";
            document.getElementById("emailA").placeholder = document.getElementById("correoRegis").textContent;
            activeU = 0;

        }, 2000);
    } else {
        document.getElementById("loadE").style.display = 'none';
        document.getElementById("chkE").style.display = 'block';
        setTimeout(function () {
            document.getElementById("chkE").style.display = 'none';
            document.getElementById("saveE").style.display = 'block';
            document.getElementById("emailA").value = "";
            document.getElementById("emailA").placeholder = v + ' [En Verificacion]';
            activeU = 0;

        }, 2000);
    }
}

function GuardarPass() {
    let passRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/g;

    var email = document.getElementById("correoRegis").textContent;
    var pass = document.getElementById("contraRegis").textContent;
    var pass2 = document.getElementById("passA").value;
    if (pass2 != pass) {
        if (passRegex.test(pass2)) {
            if (activeU == 0) {
                activeU = 1;
                document.getElementById("saveP").style.display = 'none';
                document.getElementById("loadP").style.display = 'block';
                document.getElementById("loadP").style.width = '50%';
                $.ajax({
                    url: urlHost + "/actualizarP/" + pass2 + "/" + email,
                    async: false,
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data == 1) {
                            setTimeout(function () {
                                loadP();
                                document.getElementById("contraRegis").textContent = pass2;
                            }, 6000);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("ERROR: No se pudo registar");
                        loadP();
                    }
                });
            }
        } else {
            alertify.error('La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.');
            document.getElementById("userA").value = "";
        }
    } else {
        alertify.error('La contraseña debe ser diferente a la que tiene');
        document.getElementById("userA").value = "";
    }
}

function loadP() {
    document.getElementById("loadP").style.display = 'none';
    document.getElementById("chkP").style.display = 'block';
    setTimeout(function () {
        document.getElementById("chkP").style.display = 'none';
        document.getElementById("saveP").style.display = 'block';
        document.getElementById("passA").value = "";
        activeU = 0;
    }, 2000);
}