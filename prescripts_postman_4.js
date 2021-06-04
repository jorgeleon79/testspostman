let globalEval = eval;

PMUtil = function loadTests() {
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
}
