(function() {
    "use strict";

    var regalo = document.getElementById('regalo');
    document.addEventListener('DOMContentLoaded', function() {

        var map = L.map('mapa').setView([-34.601934, -58.414822], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([-34.601934, -58.414822]).addTo(map)
            .bindPopup('Mapa Personalizado.<br> Lavalle 3452 Buenos Aires.')
            .openPopup();

        //Campos Datos del Usuario

        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var correo = document.getElementById('correo');

        //Campos pases

        var pase_dia = document.getElementById('pase_dia');
        var pase_todos = document.getElementById('pase_todos');
        var pase_dosdias = document.getElementById('pase_dosdias');

        //Calcular

        var calcular = document.getElementById('calcular');
        var error = document.getElementById('error');
        var btnRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        //Extras

        var camisas = document.getElementById('camisa_evento');
        var etiquetas = document.getElementById('etiquetas');

        if (document.getElementById('calcular')) {

            calcular.addEventListener('click', calcularMontos);

            pase_dia.addEventListener('blur', mostrarDias);
            pase_todos.addEventListener('blur', mostrarDias);
            pase_dosdias.addEventListener('blur', mostrarDias);

            nombre.addEventListener('blur', validarCampos);
            apellido.addEventListener('blur', validarCampos);
            correo.addEventListener('blur', validarCampos);
            correo.addEventListener('blur', validarcorreo);

            function validarCampos() {
                if (this.value == '') {
                    error.style.display = 'block';
                    error.innerHTML = "Este campo es obligatorio";
                    this.style.border = '1px solid red';
                    error.style.border = '1px solid red';
                } else {
                    error.style.display = 'none';
                    this.style.border = '1px solid #cccccc';
                }
            }

            function validarcorreo() {
                if (this.value.indexOf('@') > -1) {
                    error.style.display = 'none';
                    this.style.border = '1px solid #cccccc';
                } else {
                    error.style.display = 'block';
                    error.innerHTML = "Este campo es obligatorio y debe contener un caracter de @";
                    this.style.border = '1px solid red';
                    error.style.border = '1px solid red';
                }

            }

            function calcularMontos(event) {
                event.preventDefault();
                if (regalo.value === '') {
                    alert("deber elegir un regalo");
                    regalo.focus();
                } else {
                    var boletoDia = parseInt(pase_dia.value, 10) || 0,
                        boletoTodos = parseInt(pase_todos.value, 10) || 0,
                        boletoDos = parseInt(pase_dosdias.value, 10) || 0,
                        cantCamisas = parseInt(camisas.value, 10) || 0,
                        cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

                    //Si se genera un error si pueda usar la forma de abajo
                    /*var boletoDia =parseInt (pase_dia.value, 10)||0,
                    boletoTodos = parseInt (pase_todos.value,10)||0,
                    boletoDos = parseInt (pase_dosdias.value,10)||0,
                    cantCamisas = parseInt (camisas.value,10)||0,
                    cantEtiquetas = parseInt (etiquetas.value; 10)||0,*/

                    /*console.log("Boletos Dia: " + boletoDia);
                    console.log("boletos Todos: " + boletoTodos);
                    console.log("Boletos Dos: " + boletoDos);*/

                    var totalPagar = (boletoDia * 30) + (boletoTodos * 50) + (boletoDos * 45) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);


                    var listadoProductos = [];

                    if (boletoDia >= 1) {
                        listadoProductos.push(boletoDia + ' Pases por dia');
                    }
                    if (boletoTodos >= 1) {
                        listadoProductos.push(boletoTodos + ' Pases por todos los dias');
                    }
                    if (boletoDos >= 1) {
                        listadoProductos.push(boletoDos + ' Pases por dos dia');
                    }
                    if (cantCamisas >= 1) {
                        listadoProductos.push(cantCamisas + ' Camisas');
                    }
                    if (cantEtiquetas >= 1) {
                        listadoProductos.push(cantEtiquetas + ' Paquete de Etiquetas');
                    }
                    lista_productos.style.display = "block";
                    lista_productos.innerHTML = '';
                    for (var i = 0; i < listadoProductos.length; i++) {
                        lista_productos.innerHTML += listadoProductos[i] + '<br/>';
                    }
                    suma.innerHTML = "$" + totalPagar.toFixed(2);
                }
            }

            function mostrarDias() {
                var boletoDia = pase_dia.value,
                    boletoTodos = pase_todos.value,
                    boletoDos = pase_dosdias.value;

                var diasElegidos = [];

                if (boletoDia > 0) {
                    diasElegidos.push('viernes');
                    console.log(diasElegidos);
                }
                if (boletoDos > 0) {
                    diasElegidos.push('viernes', 'sabado');
                    console.log(diasElegidos);
                }
                if (boletoTodos > 0) {
                    diasElegidos.push('viernes', 'sabado', 'domingo');
                    console.log(diasElegidos);
                }
                for (var i = 0; i < diasElegidos.length; i++) {
                    document.getElementById(diasElegidos[i]).style.display = 'block';
                }

            }
        };

    });

})();

$(function() {


    //Lettering
    $('.nombre-sitio').lettering();

    //Menu Fijo de la Barra

    var windowHeight = $(window).height();
    var barraAltura = $('.barra').innerHeight();
    //console.log(windowHeight);
    //console.log(barraAltura);

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > windowHeight) {
            //console.log('Has repasado la altura de la pantalla')
            $('.barra').addClass('fixed');
            $('body').css({ 'margin-top': barraAltura + 'px' });
        } else {
            $('.barra').removeClass('fixed');
            $('body').css({ 'margin-top': '0px' });
            //console.log('aun no');
        }
    });

    //Menu Responsivo
    $('.menu-mobile').on('click', function() {
        $('.navegacion-principal').slideToggle();
    });

    //Programa de Conferencias

    $('.programa-evento .info-curso:first').show();
    $('.menu-programa a:first').addClass('activo');
    $('.menu-programa a').on('click', function() {
        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo');
        $('.ocultar').hide();

        var enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);

        return false;
    });
    //Animaciones para los numeros

    $('.resumen-evento li:nth-child(1) p').animateNumber({ number: 6 }, 3000);
    $('.resumen-evento li:nth-child(2) p').animateNumber({ number: 15 }, 1000);
    $('.resumen-evento li:nth-child(3) p').animateNumber({ number: 3 }, 1500);
    $('.resumen-evento li:nth-child(4) p').animateNumber({ number: 9 }, 3000);
    //Cuenta Regresiva


    $('.cuenta-regresiva').countdown('2021/09/04 09:00:00', function(event) {
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    });
    //Colorbox

    $('.boton_newalatter').colorbox({ inline: true, width: "50%" });

});