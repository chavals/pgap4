// Declaraci�n de variables globales
var myScroll, myScrollMenu, cuerpo, menuprincipal, wrapper, estado;

// Guardamos en variables elementos para poder rescatarlos despu�s sin tener que volver a buscarlos
cuerpo = document.getElementById("cuerpo"),
menuprincipal = document.getElementById("menuprincipal"),
wrapper = document.getElementById("wrapper");
objetogen= document.getElementById("objeto");

var xhReq = new XMLHttpRequest();



var app2 = {
	initializemf: function() {
	   document.addEventListener("backbutton", onBackKeyDown, false);
	   		$('img.logo').attr('src',localStorage.getItem('logo'));
			$('#header').css('background',localStorage.getItem('color'));
			$('#footer').css('background',localStorage.getItem('color'));
			//$('img.publi').attr('src',localStorage.getItem('publicidad'));
			//$('.scroller li').css('background-color',localStorage.getItem('color'));
			//$('.scroller li:first-child').css('background-color','#202529');
			estado="cuerpo";
			
			// Creamos el elemento style, lo a�adimos al html y creamos la clase cssClass para aplicarsela al contenedor wrapper
			var heightCuerpo=window.innerHeight-46;
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = '.cssClass { position:absolute; z-index:2; left:0; top:46px; width:100%; height: '+heightCuerpo+'px; overflow:auto;}';
			document.getElementsByTagName('head')[0].appendChild(style);
			
			// A�adimos las clases necesarias
			cuerpo.className = 'page center';
			menuprincipal.className = 'page left';
			wrapper.className = 'cssClass';
				
			var url=localStorage.getItem('url');
				
			function getParameterByName(name) {
				name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
				var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
					results = regex.exec(location.search);
				return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}

			var seccion = getParameterByName('s');
			var id = getParameterByName('id');
			var hash= "g69x2Hl17Do.70Sn2";
			//var idc = getParameterByName('idc');
			var idc = 22;
			var idu = localStorage.getItem('idu') ;
			var idcat = getParameterByName('idcat');


			//alert("http://www.vando.es/app/ads.php?idc=" + idc + "&hash=" + hash + "&idu=" + idu);
			$("#adsContent").load("http://www.vando.es/app/ads.php?idc=" + idc + "&hash=" + hash + "&idu=" + idu);


			if (seccion == ""){
				//alert("http://www.vando.es/app/home.php?idc=" + idc + "&hash=" + hash + "&idu=" + idu);
				$("#contenidoCuerpo").load("http://www.vando.es/app/home.php?idc=" + idc + "&hash=" + hash + "&idu=" + idu);
			}else if (seccion == "cat"){
				//alert("http://www.vando.es/app/categoria.php?id=" + id + "&hash=" + hash + "&idu=" + idu);
				$("#cuerpo").addClass("cuerpoCat");
				$("#contenidoCuerpo").load("http://www.vando.es/app/categoria.php?id=" + id + "&hash=" + hash + "&idu=" + idu);
			}else if (seccion == "not"){
				//alert("http://www.vando.es/app/noticia.php?id=" + id + "&hash=" + hash + "&idu=" + idu);
				$("#cuerpo").addClass("cuerpoNot");
				$("#contenidoCuerpo").load("http://www.vando.es/app/noticia.php?id=" + id + "&hash=" + hash + "&idu=" + idu);
			}else if (seccion == "push"){
				//alert("http://www.vando.es/app/push.php?idc=" + idc + "&hash=" + hash + "&idu=" + idu);
				$("#cuerpo").addClass("cuerpoPush");
				$("#contenidoCuerpo").load("http://www.vando.es/app/push.php?idc=" + idc + "&hash=" + hash + "&idu=" + idu);
			}else if (seccion == "cms"){
				//alert("http://www.vando.es/app/cms.php?id=" + id + "&hash=" + hash + "&idu=" + idu);
				$("#cuerpo").addClass("cuerpoCms");
				$("#contenidoCuerpo").load("http://www.vando.es/app/cms.php?id=" + id + "&hash=" + hash + "&idu=" + idu);
			}else if (seccion == "msgForm"){
				//alert("http://www.vando.es/app/msgForm.php?hash=" + hash + "&idu=" + idu);
				$("#cuerpo").addClass("cuerpoMsgForm");
				$("#contenidoCuerpo").load("http://www.vando.es/app/msgForm.php?hash=" + hash + "&idu=" + idu);
    		}else if (seccion == "int"){
				//alert(id + "?hash=" + hash + "&idu=" + idu);
				$("#cuerpo").addClass("cuerpoInt");
				$("#contenidoCuerpo").load(id + "?hash=" + hash + "&idu=" + idu);
			}else if (seccion == "subhome"){
        		//alert("http://www.vando.es/app/home.php?hash=" + hash + "&idu=" + idu + "&idc=" + idc + "&idcat=" + idcat);
        		$("#contenidoCuerpo").load("http://www.vando.es/app/home.php?hash=" + hash + "&idu=" + idu + "&idc=" + idc + "&idcat=" + idcat);
			}


	
	},
	
	
	
	
	receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        //alert('Callback Success! Result = '+result)
    },
    errorHandler:function(error) {
        alert(error);
    },
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("regId " + e.regid);
					//alert('registration id = '+e.regid);
					window.localStorage.removeItem("regid");
					window.localStorage.setItem("regid", e.regid);
					
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
				//navigator.notification.alert(e.message);
				var ref = window.open('registro.html', '_self');
                break;

            case 'error':
                alert('GCM error = '+e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
		this.bindEvents();
		continuo();
    },

    onNotificationAPN: function (e) {
    	console.log(e);
        if (e.alert) {
			//$("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
			// showing an alert also requires the org.apache.cordova.dialogs plugin
			navigator.notification.alert(e.alert);
		}
                    
		if (e.sound) {
			// playing a sound also requires the org.apache.cordova.media plugin
			var snd = new Media(e.sound);
			snd.play();
		}
                
		if (e.badge) {
			pushNotification.setApplicationIconBadgeNumber(app2.successHandler, e.badge);
		}
		continuo();
	},

	tokenHandler: function (result) {
		//$("#app-status-ul").append('<li>token: '+ result +'</li>');
		console.log(result);
		// Your iOS push server needs to know the token before it can push to this device
		// here is where you might want to send it the token for later use.
	},
	
	bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
    	// Ejecutamos la funci�n FastClick, que es la que nos elimina esos 300ms de espera al hacer click
    	new FastClick(document.body);
    },
    

};

function continuo(){
	if ( localStorage.getItem('username') === null || localStorage.getItem('password') === null ) {
        var ref = window.open('login.html', '_self');
        }
	
		else{       
			window.localStorage.removeItem("url");
			window.localStorage.removeItem("logo");
			window.localStorage.removeItem("color");
			window.localStorage.removeItem("publicidad");
			window.localStorage.removeItem("url_publicidad");
			window.localStorage.removeItem("numop");
			window.localStorage.removeItem("idu");
			window.localStorage.removeItem("role");
			
			var datosUsuario = localStorage.getItem('username') ;
			var datosPassword = localStorage.getItem('password');
			
			var url = "http://www.vando.es/app/valida.php"; 
			$.ajax({
					   type: "GET",
					   url: url,
					   data: "usuario=" + datosUsuario + "&password=" + datosPassword + "&hash=g69x2Hl17Do.70Sn2" + "&idc=22" + "&regId=" + localStorage.getItem('regid'), 
					  
					   success: function(data)
					   {
							var dataJson = $.parseJSON(data);
							console.log(dataJson);
							if(dataJson.validacion == "ok"){
								window.localStorage.setItem("username", datosUsuario);
								window.localStorage.setItem("password", datosPassword);
								window.localStorage.setItem("idu", dataJson.idu);
								window.localStorage.setItem("role", dataJson.role);
								window.localStorage.setItem("perfil", dataJson.perfil);
								window.localStorage.setItem("url", dataJson.url);
								window.localStorage.setItem("logo", dataJson.logo);
								window.localStorage.setItem("color", dataJson.color);
								window.localStorage.setItem("publicidad", dataJson.publicidad);
								window.localStorage.setItem("url_publicidad", dataJson.url_publicidad);
								window.localStorage.setItem("numop", dataJson.numop);
								if (localStorage.numop>=1)
										window.localStorage.removeItem("op1");
										window.localStorage.removeItem("op1ico");
										window.localStorage.removeItem("op1url");
										window.localStorage.setItem("op1", dataJson.op1);
										window.localStorage.setItem("op1ico", dataJson.op1ico);
										window.localStorage.setItem("op1url", dataJson.op1url);
									if (localStorage.numop>=2)
										window.localStorage.removeItem("op2");
										window.localStorage.removeItem("op2ico");
										window.localStorage.removeItem("op2url");
										window.localStorage.setItem("op2", dataJson.op2);
										window.localStorage.setItem("op2ico", dataJson.op2ico);
										window.localStorage.setItem("op2url", dataJson.op2url);
									if (localStorage.numop>=3)
										window.localStorage.removeItem("op3");
										window.localStorage.removeItem("op3ico");
										window.localStorage.removeItem("op3url");
										window.localStorage.setItem("op3", dataJson.op3);
										window.localStorage.setItem("op3ico", dataJson.op3ico);
										window.localStorage.setItem("op3url", dataJson.op3url);
									if (localStorage.numop>=4)
										window.localStorage.removeItem("op4");
										window.localStorage.removeItem("op4ico");
										window.localStorage.removeItem("op4url");
										window.localStorage.setItem("op4", dataJson.op4);
										window.localStorage.setItem("op4ico", dataJson.op4ico);
										window.localStorage.setItem("op4url", dataJson.op4url);
									if (localStorage.numop>=5)
										window.localStorage.removeItem("op5");
										window.localStorage.removeItem("op5ico");
										window.localStorage.removeItem("op5url");
										window.localStorage.setItem("op5", dataJson.op5);
										window.localStorage.setItem("op5ico", dataJson.op5ico);
										window.localStorage.setItem("op5url", dataJson.op5url);
									if (localStorage.numop>=6)
										window.localStorage.removeItem("op6");
										window.localStorage.removeItem("op6ico");
										window.localStorage.removeItem("op6url");
										window.localStorage.setItem("op6", dataJson.op6);
										window.localStorage.setItem("op6ico", dataJson.op6ico);
										window.localStorage.setItem("op6url", dataJson.op6url);
									if (localStorage.numop>=7)
										window.localStorage.removeItem("op7");
										window.localStorage.removeItem("op7ico");
										window.localStorage.removeItem("op7url");
										window.localStorage.setItem("op7", dataJson.op7);
										window.localStorage.setItem("op7ico", dataJson.op7ico);
										window.localStorage.setItem("op7url", dataJson.op7url);
									if (localStorage.numop>=8)
										window.localStorage.removeItem("op8");
										window.localStorage.removeItem("op8ico");
										window.localStorage.removeItem("op8url");
										window.localStorage.setItem("op8", dataJson.op8);
										window.localStorage.setItem("op8ico", dataJson.op8ico);
										window.localStorage.setItem("op8url", dataJson.op8url);
									if (localStorage.numop>=9)
										window.localStorage.removeItem("op9");
										window.localStorage.removeItem("op9ico");
										window.localStorage.removeItem("op9url");
										window.localStorage.setItem("op9", dataJson.op9);
										window.localStorage.setItem("op9ico", dataJson.op9ico);
										window.localStorage.setItem("op9url", dataJson.op9url);
									if (localStorage.numop>=10)
										window.localStorage.removeItem("op10");
										window.localStorage.removeItem("op10ico");
										window.localStorage.removeItem("op10url");
										window.localStorage.setItem("op10", dataJson.op10);
										window.localStorage.setItem("op10ico", dataJson.op10ico);
										window.localStorage.setItem("op10url", dataJson.op10url);
									if (localStorage.numop>=11)
										window.localStorage.removeItem("op11");
										window.localStorage.removeItem("op11ico");
										window.localStorage.removeItem("op11url");
										window.localStorage.setItem("op11", dataJson.op11);
										window.localStorage.setItem("op11ico", dataJson.op11ico);
										window.localStorage.setItem("op11url", dataJson.op11url);
									if (localStorage.numop>=12)
										window.localStorage.removeItem("op12");
										window.localStorage.removeItem("op12ico");
										window.localStorage.removeItem("op12url");
										window.localStorage.setItem("op12", dataJson.op12);
										window.localStorage.setItem("op12ico", dataJson.op12ico);
										window.localStorage.setItem("op12url", dataJson.op12url);
									if (localStorage.numop>=13)
										window.localStorage.removeItem("op13");
										window.localStorage.removeItem("op13ico");
										window.localStorage.removeItem("op13url");
										window.localStorage.setItem("op13", dataJson.op13);
										window.localStorage.setItem("op13ico", dataJson.op13ico);
										window.localStorage.setItem("op13url", dataJson.op13url);
									if (localStorage.numop>=14)
										window.localStorage.removeItem("op14");
										window.localStorage.removeItem("op14ico");
										window.localStorage.removeItem("op14url");
										window.localStorage.setItem("op14", dataJson.op14);
										window.localStorage.setItem("op14ico", dataJson.op14ico);
										window.localStorage.setItem("op14url", dataJson.op14url);
									if (localStorage.numop>=15)
										window.localStorage.removeItem("op15");
										window.localStorage.removeItem("op15ico");
										window.localStorage.removeItem("op15url");
										window.localStorage.setItem("op15", dataJson.op15);
										window.localStorage.setItem("op15ico", dataJson.op15ico);
										window.localStorage.setItem("op15url", dataJson.op15url);
									if (localStorage.numop>=16)
										window.localStorage.removeItem("op16");
										window.localStorage.removeItem("op16ico");
										window.localStorage.removeItem("op16url");
										window.localStorage.setItem("op16", dataJson.op16);
										window.localStorage.setItem("op16ico", dataJson.op16ico);
										window.localStorage.setItem("op16url", dataJson.op16url);
									if (localStorage.numop>=17)
										window.localStorage.removeItem("op17");
										window.localStorage.removeItem("op17ico");
										window.localStorage.removeItem("op17url");
										window.localStorage.setItem("op17", dataJson.op17);
										window.localStorage.setItem("op17ico", dataJson.op17ico);
										window.localStorage.setItem("op17url", dataJson.op17url);
									if (localStorage.numop>=18)
										window.localStorage.removeItem("op18");
										window.localStorage.removeItem("op18ico");
										window.localStorage.removeItem("op18url");
										window.localStorage.setItem("op18", dataJson.op18);
										window.localStorage.setItem("op18ico", dataJson.op18ico);
										window.localStorage.setItem("op18url", dataJson.op18url);
									if (localStorage.numop>=19)
										window.localStorage.removeItem("op19");
										window.localStorage.removeItem("op19ico");
										window.localStorage.removeItem("op19url");
										window.localStorage.setItem("op19", dataJson.op19);
										window.localStorage.setItem("op19ico", dataJson.op19ico);
										window.localStorage.setItem("op19url", dataJson.op19url);
									if (localStorage.numop>=20)
										window.localStorage.removeItem("op20");
										window.localStorage.removeItem("op20ico");
										window.localStorage.removeItem("op20url");
										window.localStorage.setItem("op20", dataJson.op20);
										window.localStorage.setItem("op20ico", dataJson.op20ico);
										window.localStorage.setItem("op20url", dataJson.op20url);
									if (localStorage.numop>=21)
										window.localStorage.removeItem("op21");
										window.localStorage.removeItem("op21ico");
										window.localStorage.removeItem("op21url");
										window.localStorage.setItem("op21", dataJson.op21);
										window.localStorage.setItem("op21ico", dataJson.op21ico);
										window.localStorage.setItem("op21url", dataJson.op21url);
									if (localStorage.numop>=22)
										window.localStorage.removeItem("op22");
										window.localStorage.removeItem("op22ico");
										window.localStorage.removeItem("op22url");
										window.localStorage.setItem("op22", dataJson.op22);
										window.localStorage.setItem("op22ico", dataJson.op22ico);
										window.localStorage.setItem("op22url", dataJson.op22url);	
									if (localStorage.numop>=23)
										window.localStorage.removeItem("op23");
										window.localStorage.removeItem("op23ico");
										window.localStorage.removeItem("op23url");
										window.localStorage.setItem("op23", dataJson.op23);
										window.localStorage.setItem("op23ico", dataJson.op23ico);
										window.localStorage.setItem("op23url", dataJson.op23url);
									if (localStorage.numop>=24)
										window.localStorage.removeItem("op24");
										window.localStorage.removeItem("op24ico");
										window.localStorage.removeItem("op24url");
										window.localStorage.setItem("op24", dataJson.op24);
										window.localStorage.setItem("op24ico", dataJson.op24ico);
										window.localStorage.setItem("op24url", dataJson.op24url);
									if (localStorage.numop>=25)
										window.localStorage.removeItem("op25");
										window.localStorage.removeItem("op25ico");
										window.localStorage.removeItem("op25url");
										window.localStorage.setItem("op25", dataJson.op25);
										window.localStorage.setItem("op25ico", dataJson.op25ico);
										window.localStorage.setItem("op25url", dataJson.op25url);
								  var ref = window.open('principal.html', '_self');
								  //window.location.href='principal.html';
							}
							else{
							alert(dataJson.validacion);
							}
							
								   }
					 });
		}
	}
	
	 function exitFromApp(buttonIndex) {
	 	if (buttonIndex==1){
			
			if(navigator.app){
       			navigator.app.exitApp();
			}
			else if(navigator.device){
        		navigator.device.exitApp();
			}
		}
}



function onBackKeyDown() {
		//history.go(-1);
		//$("#footer").css("z-index", 2);
		navigator.app.backHistory();
		//navigator.app.exitApp();

    }
	
function back(){
	/*//$("#footer").css("z-index", 2);
	//$("#menuprincipal").css("z-index", '');
	menuprincipal.className = 'page transition left';
	$("#menuprincipal").css("z-index", '');
	estado="cuerpo";
	//	$("#contenidoCuerpo").load("http://www.vando.es/app/home.php?hash=" + "g69x2Hl17Do.70Sn2");
	var hash= "g69x2Hl17Do.70Sn2";
	var idc = 6;
	$("#contenidoCuerpo").load("http://www.vando.es/app/home.php?idc=" + idc + "&hash=" + hash);*/
	if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos' ) {
		navigator.app.backHistory();
	}
	else{
		history.go(-1);
    	navigator.app.backHistory();
	}
}


function alertDismissed() {
	console.log("Maricones");
}


function openExternal(elem) {
        window.open(elem.href, "_system");
		return false; // Prevent execution of the default onClick handler 
    }
	
function abrirpubli(){
var url_publicidad=localStorage.getItem('url_publicidad');
var ref= window.open(url_publicidad, '_system');
}


function borrardatos(){
navigator.notification.alert(
		'Borrando datos',  // message
		alertDismissed,         // callback
		'Aviso',            // title
		'Hecho'                  // buttonName
	);
window.localStorage.clear();
window.localStorage.removeItem("username");
window.localStorage.removeItem("password");
var ref = window.open('login.html', '_self');
//navigator.app.exitApp();
}





// Funci�n para a�adir clases css a elementos
function addClass( classname, element ) {
    var cn = element.className;
    if( cn.indexOf( classname ) != -1 ) {
    	return;
    }
    if( cn != '' ) {
    	classname = ' '+classname;
    }
    element.className = cn+classname;
}

// Funci�n para eliminar clases css a elementos
function removeClass( classname, element ) {
    var cn = element.className;
    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
    cn = cn.replace( rxp, '' );
    element.className = cn;
}

function menu2(opcion){
	// Si pulsamos en el bot�n de "menu" entramos en el if
	
	$("#menuprincipal").css("display", "block");

	if(opcion=="menu"){
		if(estado=="cuerpo"){
	   		$("#menuprincipal").css("z-index", 1);
			menuprincipal.className = 'page transition right';
    		estado="menuprincipal";
		}else if(estado=="menuprincipal"){
			menuprincipal.className = 'page transition left';
			$("#menuprincipal").css("z-index", '');
			estado="cuerpo";	
		}
	// Si pulsamos un bot�n del menu principal entramos en el else
	}else{
		alert("NOSE");
		// A�adimos la clase al li presionado
		addClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
		//alert(opcion+".html");

		// Recogemos mediante ajax el contenido del html seg�n la opci�n clickeada en el menu
		$("#footer").css("z-index", 2);

		var opurltemp = localStorage.getItem("op"+opcion+"url");
		// A�adimos las clases necesarias para que la capa cuerpo se mueva al centro de nuestra app y muestre el contenido
		cuerpo.className = 'page transition left';
		estado="cuerpo";
		
		// Quitamos la clase a�adida al li que hemos presionado
		setTimeout(function() {
			removeClass('li-menu-activo' , document.getElementById("ulMenu").getElementsByTagName("li")[opcion]);
		}, 300);
		 
	 }
}


