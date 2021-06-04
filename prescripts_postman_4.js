//Nuevos tests (en evaluación)
pm.globals.set("Tests", function loadTests() {
    let Tests = {};
    Tests.OK = () => {
        pm.test("Validación Código 200", function () {
            pm.response.to.have.status(200);
        });
        pm.test("Validación Status 'success' ", function () {
            pm.expect(jsonData.status).to.eql("success");
        });
    };
    Tests.Empty = () => {
        pm.test("Validación respuesta NO contiene datos", function () {
		    pm.expect(jsonData.data).to.be.empty;
	    });
    };
	Tests.NotEmpty = () => {
        pm.test("Validación respuesta contiene datos", function () {
		    pm.expect(jsonData.data).to.not.be.empty;
	    });
    };
    Tests.Status422 = () => {
        pm.test("Validación Código 422", function () {
		    pm.response.to.have.status(422);
	    });
	    pm.test("Validación Status 'error'", function () {
		    pm.expect(jsonData.status).to.eql("error");
	    });
    };
    Tests.IsWrong = () => {
        pm.test("Validación Mensaje 'Formato de datos incorrecto'", function () {
            pm.expect(jsonData.message).to.include("is wrong");
        });

        pm.test("Validación data null", function () {
            pm.expect(jsonData.data).to.equal(null);
        });
    };
	Tests.Status442 = () => {
        pm.test("Validación Código 422", function () {
		    pm.response.to.have.status(442);
	    });
	    pm.test("Validación Status 'error'", function () {
		    pm.expect(jsonData.status).to.eql("error");
	    });
		pm.test("Validación data null", function () {
            pm.expect(jsonData.data).to.equal(null);
        })
    };
  return Tests;
} + '; loadTests();');

/*pm.globals.set("Tests422Wrong", function loadTests422Wrong() {
	pm.test("Validación Código 422", function () {
		pm.response.to.have.status(422);
	});
	pm.test("Validación Status 'error'", function () {
		pm.expect(jsonData.status).to.eql("error");
	});
	pm.test("Validación Mensaje 'Formato de datos incorrecto'", function () {
		pm.expect(jsonData.message).to.include("is wrong");
	});

	pm.test("Validación data null", function () {
		pm.expect(jsonData.data).to.equal(null);
	})
} + '; loadTests422Wrong();');*/

//Tests reutilizables
var testsok = () => {
    pm.test("Validación Código 200", function () {
        pm.response.to.have.status(200);
    });
    pm.test("Validación Status 'success' ", function () {
        pm.expect(jsonData.status).to.eql("success");
    });
};

var testslogoutok = () => {
    pm.test("Validación Mensaje Logout", function () {
        pm.expect(jsonData.data.action).to.eql("Logout Success");
    });
};

var teststokenincorrecto = () => {
	pm.test("Validación Mensaje 'Token incorrecto'", function () {
		pm.expect(jsonData.data.message).to.include("Could not decode token: The token");
        pm.expect(jsonData.data.message).to.include("is an invalid JWS");
	});
    pm.test("Validación visualización del Token incorrecto", function () {
		pm.expect(jsonData.data.message).to.include(pm.variables.get("token_incorrecto"));
	});
};

var teststokenincorrectopuntos = () => {
	pm.test("Validación Mensaje 'Token incorrecto'", function () {
			pm.expect(jsonData.data.message).to.eql("Wrong number of segments");
	});
};

var teststokencaducado = () => {
	pm.test("Validación Mensaje 'Token cadudado'", function () {
			pm.expect(jsonData.data.message).to.eql("Token Signature could not be verified.");
	});
};

var testspaginacionok = () => {
    pm.test("Validación página actual paginada", function () {
        pm.expect(jsonData.current_page).to.eql(Number(pm.environment.get("pag_paginacion")));
    });

    pm.test("Validación registros por pagina en paginación", function () {
        pm.expect(jsonData.per_page).to.eql(Number(pm.environment.get("registros_paginacion")));
    });
};

var testsokempty = () => {
    pm.test("Validación Código 200", function () {
        pm.response.to.have.status(200);
    });
    pm.test("Validación Status 'success' ", function () {
        pm.expect(jsonData.status).to.eql("success");
    });
    pm.test("Validación respuesta NO contiene datos", function () {
		pm.expect(jsonData.data).to.be.empty;
	});
};

var testscreateok = () => {
    pm.test("Validación Código 201", function () {
        pm.response.to.have.status(201);
    });
    pm.test("Validación Status 'success' ", function () {
        pm.expect(jsonData.status).to.eql("success");
    });
};

var testsbadrequest = () => {
    pm.test("Validación Código 400", function () {
        pm.response.to.have.status(400);
    });
    pm.test("Validación Status 'error'", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje error", function () {
        pm.expect(jsonData.message).to.eql("Bad Request");
    });
};

var teststokenvacio = () => {
    pm.test("Validación Código 401", function () {
        pm.response.to.have.status(401);
    });
    pm.test("Validación Status 'error' ", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje data token vacío", function () {
        pm.expect(jsonData.message).to.eql("Token not provided");
    });
};

var teststokenvaciocc = () => {
    pm.test("Validación Código 401", function () {
        pm.response.to.have.status(401);
    });
    pm.test("Validación Status 'error' ", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje data token vacío", function () {
        pm.expect(jsonData.message).to.eql("Token not provided");
    });
	pm.test("Validación Mensaje data token vacío", function () {
        pm.expect(jsonData.data.message).to.eql("Token not provided");
    });
};

var testsautko = () => {
    pm.test("Validación Código 403", function () {
        pm.response.to.have.status(403);
    });
    pm.test("Validación Status 'error'", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje 'Usuario no autorizado'", function () {
        pm.expect(jsonData.message).to.eql("Unauthorized user");
    });
};

var testsexpiredtoken = () => {
	pm.test("Validación Código 403", function () {
			pm.response.to.have.status(403);
	});

	pm.test("Validación Mensaje 'Token cadudado'", function () {
			pm.expect(jsonData.message).to.eql("Token has expired");
	});
};

var testsresourcenotfound = () => {
    pm.test("Validación Código 404", function () {
        pm.response.to.have.status(404);
    });
    pm.test("Validación Status 'error' ", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje recurso no encontrado ", function () {
        pm.expect(jsonData.message).to.eql("Resource Not Found");
    });
};

var testshttpnotfound = () => {
    pm.test("Validación Código 404", function () {
        pm.response.to.have.status(404);
    });
    pm.test("Validación Status 'error' ", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje recurso no encontrado", function () {
        pm.expect(jsonData.message).to.eql("Not found Http Request");
    });
};

var testdepnotfound = () => {
    pm.test("Validación Código 404", function () {
        pm.response.to.have.status(404);
    });
    pm.test("Validación Status 'error' ", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
	pm.test("Validación Mensaje recurso no encontrado", function () {
		pm.expect(jsonData.message).to.eql("Dependency not found");
	});

	pm.test("Validación data null", function () {
		pm.expect(jsonData.data).to.equal(null);
	});
};

var testsmethodnotallowed = () => {
    pm.test("Validación Código 405", function () {
        pm.response.to.have.status(405);
    });
    pm.test("Validación Status 'error' ", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje recurso no encontrado ", function () {
        pm.expect(jsonData.message).to.eql("Method Not Allowed");
    });
    
    pm.test("Validación data null", function () {
    pm.expect(jsonData.data).to.equal(null);
    });
};

var testspreconditionfailed = () => {
    pm.test("Validación Código 412", function () {
        pm.response.to.have.status(412);
    });
    pm.test("Validación Status 'error'", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje error", function () {
        pm.expect(jsonData.message).to.eql("Precondition Failed");
    });
    pm.test("Validación Mensaje data error", function () {
        pm.expect(jsonData.data.message).to.eql("Precondition Failed");
    });
};

var testsformatdatako = () => {
    pm.test("Validación Código 422", function () {
        pm.response.to.have.status(422);
    });
    pm.test("Validación Status 'error'", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje 'Formato de datos incorrecto'", function () {
        pm.expect(jsonData.message).to.eql("Data incorrectly formed");
    });
};


var testsinvaliddata = () => {
    pm.test("Validación Código 422", function () {
        pm.response.to.have.status(422);
    });
    pm.test("Validación Status 'error'", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje 'Formato de datos incorrecto'", function () {
        pm.expect(jsonData.message).to.eql("The given data was invalid.");
    });
};

var testsvalidationrequired = () => {
    pm.test("Validación Código 422", function () {
        pm.response.to.have.status(422);
    });
    pm.test("Validación Status 'error'", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje error", function () {
        pm.expect(jsonData.message).to.include("The given data was invalid");
    });
        pm.test("Validación Mensaje data", function () {
        pm.expect(jsonData.data.message).to.include("The given data was invalid");
    });
};

var testsentradanoprocesable = () => {
    pm.test("Validación Código 422", function () {
        pm.response.to.have.status(422);
    });
    pm.test("Validación Status 'error'", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje 'Formato de datos incorrecto'", function () {
        pm.expect(jsonData.message).to.eql("Unprocessable Entity");
    });
};

var testsunprocessableentity = () => {
    pm.test("Validación Código 422", function () {
        pm.response.to.have.status(422);
    });
    pm.test("Validación Status 'error' ", function () {
        pm.expect(jsonData.status).to.eql("error");
    });
    pm.test("Validación Mensaje no procesable", function () {
        pm.expect(jsonData.message).to.eql("Unprocessable Entity");
    });
    
    pm.test("Validación data null", function () {
    pm.expect(jsonData.data).to.equal(null);
    });
};

var tests440 = () => {
    pm.test("Validación Código 440", function () {
        pm.response.to.have.status(440);
    });
    pm.test("Validación Status 'error' ", function () {
        pm.expect(jsonData.status).to.eql("error");
    });    
    pm.test("Validación data null", function () {
		pm.expect(jsonData.data).to.equal(null);
    });
};

var tests441 = () => {
    pm.test("Validación Código 441", function () {
        pm.response.to.have.status(441);
    });
    pm.test("Validación Status 'error' ", function () {
        pm.expect(jsonData.status).to.eql("error");
    });    
    pm.test("Validación data null", function () {
		pm.expect(jsonData.data).to.equal(null);
    });
};

var tests441nodata = () => {
    pm.test("Validación Código 441", function () {
        pm.response.to.have.status(441);
    });
    pm.test("Validación Status 'error' ", function () {
        pm.expect(jsonData.status).to.eql("error");
    });    
};

var testsorder = () => {
	var _ = require('lodash');
	var responseArray = JSON.parse(responseBody);
	var responseData = responseArray.data;
	var ordenacion = pm.request.url.query.get("order").substr(0,1);
	var p_ordenacion = pm.request.url.query.get("order").substr(1);

	if (ordenacion == '-'){
		ordenacion = 'desc';
	} else {
		ordenacion = 'asc';
	}

	//console.log(ordenacion)

	pm.test('Validación orden', () => {
		var expectedSortedOrder = _.orderBy(responseData, [p_ordenacion],[ordenacion]);
		//console.log (expectedSortedOrder);
		pm.expect(responseData).to.eql(expectedSortedOrder);
	});
};

pm.globals.set("TestsOk", testsok.toString());
pm.globals.set("TestsOkEmpty", testsokempty.toString());
pm.globals.set("TestsLogoutOk", testslogoutok.toString());
pm.globals.set("TestsAutKo", testsautko.toString());
pm.globals.set("TestsFormatDataKo", testsformatdatako.toString());
pm.globals.set("TestsCreateOk", testscreateok.toString());
pm.globals.set("TestsResourceNotFound", testsresourcenotfound.toString());
pm.globals.set("TestsHttpNotFound", testshttpnotfound.toString());
pm.globals.set("TestsInvalidData", testsinvaliddata.toString());
pm.globals.set("TestsValidationRequired", testsvalidationrequired.toString());
pm.globals.set("TestsEntradaNoProcesable", testsentradanoprocesable.toString());
pm.globals.set("TestsUnprocessableEntity", testsunprocessableentity.toString());
pm.globals.set("TestsBadRequest", testsbadrequest.toString());
pm.globals.set("TestsExpiredToken", testsexpiredtoken.toString());
pm.globals.set("TestsTokenVacio", teststokenvacio.toString());
pm.globals.set("TestsTokenVacioCC", teststokenvaciocc.toString());
pm.globals.set("TestsTokenIncorrecto", teststokenincorrecto.toString());
pm.globals.set("TestsTokenIncorrectoPuntos", teststokenincorrectopuntos.toString());
pm.globals.set("TestsTokenCaducado", teststokencaducado.toString());
pm.globals.set("TestsPreconditionFailed", testspreconditionfailed.toString());
pm.globals.set("TestsMethodNotAllowed", testsmethodnotallowed.toString());
pm.globals.set("TestsDepNotFound", testdepnotfound.toString());
pm.globals.set("Tests440", tests440.toString());
pm.globals.set("Tests441", tests441.toString());
pm.globals.set("Tests441NoData", tests441nodata.toString());
pm.globals.set("TestsPaginacionOK", testspaginacionok.toString());
pm.globals.set("TestsOrder", testsorder.toString());

//Tests modelos
var testsmodelapikeys1 = () => {
	pm.test("Validación tipo datos modelo apikeys", function () {
		pm.expect(jsonData.data.id).to.be.a('number');
		pm.expect(jsonData.data.sg).to.be.a('number');
		pm.expect(jsonData.data.user_id).to.be.a('number');
		pm.expect(jsonData.data.api_key).to.be.a('string');
		pm.expect(jsonData.data.expiration_date).to.be.a('number');
		pm.expect(jsonData.data.read_only).to.be.a('number');
	});
};

var testsmodelapikeys2 = () => {
	pm.test("Validación tipo datos modelo apikeys", function () {
		for (var i = 0; i < jsonData.data.length; i++) {
			pm.expect(jsonData.data[i].id).to.be.a('number');
			pm.expect(jsonData.data[i].sg).to.be.a('number');
			pm.expect(jsonData.data[i].user_id).to.be.a('number');
			pm.expect(jsonData.data[i].api_key).to.be.a('string');
			pm.expect(jsonData.data[i].expiration_date).to.be.a('number');
			pm.expect(jsonData.data[i].read_only).to.be.a('number');
		}
	});
};

var testsmodelbiaconclusions2 = () => {
	pm.test("Validación tipo datos modelo biaConclusions", function () {
		for (var i = 0; i < jsonData.data.length; i++) {
			pm.expect(jsonData.data[i].id).to.be.a('number');
			pm.expect(jsonData.data[i].id_encuesta).to.be.a('number');
			pm.expect(jsonData.data[i].conclusion).to.be.a('string');
		}
	});
};

var testsmodelcategories1 = () => {
	pm.test("Validación tipo datos modelo categories", function () {
		pm.expect(jsonData.data.id).to.be.a('number');
		pm.expect(jsonData.data.id_empresa).to.be.a('number');
		pm.expect(jsonData.data.id_padre).to.be.a('number');
		pm.expect(jsonData.data.nombre).to.be.a('string');
		pm.expect(jsonData.data.ruta).to.be.a('string');
		pm.expect(jsonData.data.icono).to.be.a('string');
		pm.expect(jsonData.data.serv_proc).to.be.a('number');
	});
};

var testsmodeldimensions = () => {
	pm.test("Validación tipo datos modelo dimensions", function () {
		pm.expect(jsonData.data.id).to.be.a('number');
		pm.expect(jsonData.data.id_empresa).to.be.a('number');
		pm.expect(jsonData.data.nombre).to.be.a('string');
		pm.expect(jsonData.data.orden).to.be.a('number');
		pm.expect(jsonData.data.acumulado).to.be.a('number');
		pm.expect(jsonData.data.mostrar_color).to.be.a('number');
		pm.expect(jsonData.data.es_manual).to.be.a('number');
		pm.expect(jsonData.data.es_formula).to.be.a('number');
		pm.expect(jsonData.data.tipo_dimension).to.be.a('number');
		pm.expect(jsonData.data.alias).to.be.a('string');
		pm.expect(jsonData.data.min).to.be.a('string');
		pm.expect(jsonData.data.visibilidad_global_tabla).to.be.a('number');
		pm.expect(jsonData.data.visibilidad_global_tabla_formulario).to.be.a('number');
		pm.expect(jsonData.data.visibilidad_ens).to.be.a('number');
		pm.expect(jsonData.data.visibilidad_evaluacion_riesgos).to.be.a('number');
	});
};

var testsmodelemployees1 = () => {
	pm.test("Validación tipo datos modelo employees", function () {
		pm.expect(jsonData.data.id).to.be.a('number');
		pm.expect(jsonData.data.sg).to.be.a('number');
		pm.expect(jsonData.data.nombre).to.be.a('string');
	});
};

var testsmodelemployees2 = () => {
	pm.test("Validación tipo datos modelo employees", function () {
		for (var i = 0; i < jsonData.data.length; i++) {
			pm.expect(jsonData.data[i].id).to.be.a('number');
			pm.expect(jsonData.data[i].sg).to.be.a('number');
			pm.expect(jsonData.data[i].nombre).to.be.a('string');
		}
	});
};

var testsmodelsurvey1 = () => {
	pm.test("Validación tipo datos modelo surveys", function () {
		pm.expect(jsonData.data.id).to.be.a('number');
		pm.expect(jsonData.data.id_configuracion).to.be.a('number');
		pm.expect(jsonData.data.id_tipo).to.be.a('number');
		pm.expect(jsonData.data.sg).to.be.a('number');
		pm.expect(jsonData.data.nombre).to.be.a('string');
		pm.expect(jsonData.data.fecha).to.be.a('number');
		pm.expect(jsonData.data.alertado).to.be.a('number');
		pm.expect(jsonData.data.finalizado).to.be.a('number');
		pm.expect(jsonData.data.consolidado).to.be.a('number');
		pm.expect(jsonData.data.pendiente).to.be.a('number');
	});
};

var testsmodelsurvey2 = () => {
	pm.test("Validación tipo datos modelo surveys", function () {
		for (var i = 0; i < jsonData.data.length; i++) {
			pm.expect(jsonData.data[i].id).to.be.a('number');
			pm.expect(jsonData.data[i].id_configuracion).to.be.a('number');
			pm.expect(jsonData.data[i].id_tipo).to.be.a('number');
			pm.expect(jsonData.data[i].sg).to.be.a('number');
			pm.expect(jsonData.data[i].nombre).to.be.a('string');
			pm.expect(jsonData.data[i].fecha).to.be.a('number');
			pm.expect(jsonData.data[i].alertado).to.be.a('number');
			pm.expect(jsonData.data[i].finalizado).to.be.a('number');
			pm.expect(jsonData.data[i].consolidado).to.be.a('number');
			pm.expect(jsonData.data[i].pendiente).to.be.a('number');
		}
	});
};

pm.globals.set("TestsModelApiKey1", testsmodelapikeys1.toString());
pm.globals.set("TestsModelApiKeys2", testsmodelapikeys2.toString());
pm.globals.set("TestsModelBiaConclusions2", testsmodelbiaconclusions2.toString());
pm.globals.set("TestsModelCategories1", testsmodelcategories1.toString());
pm.globals.set("TestsModelDimensions", testsmodeldimensions.toString());
pm.globals.set("TestsModelEmployees1", testsmodelemployees1.toString());
pm.globals.set("TestsModelEmployees2", testsmodelemployees2.toString());
pm.globals.set("TestsModelSurvey1", testsmodelsurvey1.toString());
pm.globals.set("TestsModelSurvey2", testsmodelsurvey2.toString());

//variables entornos
tempbaseurl = pm.environment.get("url") + "/api"
pm.globals.set("baseUrl", tempbaseurl);
tempurlsurvey = pm.environment.get("url") + "/surveys/api"
pm.globals.set("urlAPISurvey", tempurlsurvey);

//variables aleatorias
function randomString(length) {
    var result           = [];
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

pm.globals.set("RandomStr", randomString(10));
pm.globals.set("RandomStr250", randomString(250));
pm.globals.set("RandomStr251", randomString(251));
pm.globals.set("RandomStr500", randomString(500));
pm.globals.set("RandomStr501", randomString(501));
pm.globals.set("RandomStr1000", randomString(1000));
pm.globals.set("RandomStr1550", randomString(1550));
pm.globals.set("RandomStr1551", randomString(1551));
pm.globals.set("RandomIntID", _.random(99999, 1000000));
pm.globals.set("RandomInt5", _.random(10000, 99999));
pm.globals.set("RandomInt20", _.random(100000000000000000, 999999999999999999));
pm.globals.set("RandomNum21dig", _.random(10000000000000000000, 99999999999999999999));

//variables fijas
pm.globals.set("StringCaracteresEspeciales", "@$*+-=?^_`{}|~#");
pm.globals.set("TimestampMax", 4294967295);
pm.globals.set("email_long_text", "fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasfd@eedddddddddddddddddddddddddddddddddddddddddddddddddddddddddddde.eddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddds");
pm.globals.set("email_long_text_fail", "fdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasfda@eeddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddea.edddddddddddddddddddddddddddddddddddddddddddddddddddadddddddddds");
pm.globals.set("frase491","pruebas longtext 491+timestamp Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis Pneumonoultramicroscopicsilicovolcanoconiosis ");
pm.globals.set("url_long_text","https://wwwwwwwwwwwwww.ddddddddwwwwwwwwwwwwwddddddddddddddddddddddddddddddddddddddddde.es");
pm.globals.set("url_long_text_fail","https://wwwwwwwwwwwwww.ddddddddwwwwwwwwwwwwwdddddddddddddadddddddddddddddddddddddddddde.es");
pm.globals.set("xxs1","<script>alert('1')</script>");
pm.globals.set("xxs2","%3cscript%3ealert(document.cookie)%3c/script%3e");