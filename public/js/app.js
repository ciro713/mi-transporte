$(function(){

//alert('hola mundo');

//console.log('hola soy consola');

//alert($('#Buscar').Val());

//alert($('.Buscar').Val());

/*let Buscar='Hola';
alert (Buscar);*/

/*$('#btnBuscar').click(function(){
console.log('todo ok');
});*/

/*$('.btnBuscar').click(function(){
console.log('todo ok');
});*/

/*alert ('1');
$('#btnBuscar').click(function(){
alert ('2'); 

});

alert ('3');*/


/*$('#btnBuscar').click(function(){
let valor=$('#Buscar').val();
alert (valor);

});*/


/*$('#btnBuscar').click(function(){
    $('#Buscar').val('holaa');

    });*/


/*$('#Buscar').keyup(function(){
    alert('tecla');
    
     });*/


/*$('#Buscar').keyup(function(){
    alert($(this).val());
        
         }); */


/*let buscar='Hola';
console.log(buscar);*/


/*$('#btnBuscar').click(function(){
alert('entre boton');

});*/


   /* $('#btnBuscar').click(function(){
        let Buscar=$('#Buscar').val();
        console.log(Buscar);


        $('#tabla').load('mod.php',{
            dato:Buscar
            },function(){
            }
        );

    });    finalizo el evento de buscar*/



   /* $('#Buscar').keyup(function(){
        let Buscar=$('#Buscar').val();
        $('#tabla').load('mod.php',{
        dato:Buscar
        },function(){

        }
        );
    });   finalizo el evento de buscar mediante escribis */
    


  $('#Buscar').keyup(function(){
        let Buscar=$('#Buscar').val();
        $('#tabla').load('mod.php',{
        dato:Buscar
        },function(){
            
        }
        );
    });   


    function cargar() {
      $.ajax({
          url: '../src/models/mod2.php',
          type: 'GET',
          success: function(res) {
              let datos = JSON.parse(res);
              let html_tab = '';
              datos.forEach(dato => {
                  if (dato.estado_credencial === 'espera_escuela') {
                      html_tab += `
                          <tr>
                              <td>${dato.DNI}</td>
                              <td>${dato.nombre_apellido}</td>

                              <td><button type="button" data_id2="${dato.estado_credencial}" class="confirmar">Confirmar</button></td>
                              <td><button type="button" data_id="${dato.DNI}" class="borrar">Borrar</button></td>
                          </tr>`;
                  }
              });
              $('#tabla').html(html_tab);
          }
      });
  }

  /*                              <td><img src="../${dato.documento_frente}"/></td>
                              <td><img src="../${dato.documento_reverso}"/></td>
                              <td><img src="../${dato.constancia}"/></td>
                              <td><img src="../${dato.alumno}"/></td> */
  
    cargar();


    $('#btnNuevo').click(function(){
        if ($('#contenedor').is(':visible')) {
            $('#contenedor').hide(750);
          }  else {
        $('#contenedor').show(750);
          }
          
          $('#btnGuardar').click(function(){
            let DNI = $('#Buscar2').val ();
            let nombre_apellido=$('#Buscar3').val ();
            let estado_credencial=$('#Buscar4').val ();
            
            console.log(DNI);
            console.log(nombre_apellido);
            console.log(estado_credencial); 
            // alert ($('#Buscar2').val());
            // alert ($('#Buscar3').val());
            // alert ($('#Buscar4').val());

            $.ajax({
                url: '../src/controllers/modguardar.php',
                type: 'POST',
                data: {
                    postDNI:DNI,
                    postnombre_apellido:nombre_apellido,
                    postestado_credencial:estado_credencial,
                }, success: function (res) {
                    console.log(res)
                    cargar();
                }

          })

            });
            
        });
       /* $('#btnGuardar').click(function(){
            alert('hola');
                
                 }); */
                 
                 
                
                    $(document).on('click','.borrar',function(){
                        let id=$(this).attr('data_id'); 
                        //console.log($(this)); 
                        $.ajax({
                            url: '../src/controllers/modborrar.php',
                            type: 'POST',
                            data: {
                                id_borrar:id
                            }, success: function (res) {
                               console.log(res);
                                if (res=='1'){
                                   alert('Esta tarea ha sido eliminada');
                                   cargar();
                                   
                                } else {
                                   alert('esta mal');
                                }
                                
                                
                                
                            }

                            
                    });
                })
              
                $(document).on('click', '.confirmar', function() {
                  let row = $(this).closest('tr');
                  let DNI = row.find('td:first').text(); 
                  console.log('DNI a confirmar:', DNI); 
                  console.log('Fila a ocultar:', row); 
                  $.ajax({
                      url: '../src/controllers/modpasar.php',
                      type: 'POST',
                      data: {
                          id_confirmar: DNI 
                      },
                      success: function(res) {
                        console.log('Respuesta del servidor:', res); 
                        if (res === 'estado_cooperativa') {
                            alert('Esta tarea ha sido enviada a otra página');
                            row.hide(); 
                            cargar(); 
                        } else {
                            //alert('Respuesta del servidor no válida');
                            row.hide(); 
                            cargar();
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('Error en la solicitud AJAX:', error); 
                        alert('Hubo un error en la solicitud AJAX: ' + error);
                    }
                    
                  });
                  
              });
              
              
              
                
});



var selectedOptionElement = document.getElementById("selectedOption");

function selectOption(option) {
  $('#Buscar4').val(option);

  selectedOptionElement.textContent = option;
}

/* Resto del código permanece igual */
/* Función para mostrar u ocultar el menú desplegable */
function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");
  }
  
  /* Cerrar el menú desplegable si se hace clic fuera de él */
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  