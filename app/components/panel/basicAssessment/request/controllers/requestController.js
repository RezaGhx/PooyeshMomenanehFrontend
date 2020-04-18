requestController.$inject = ["panel.basicAssessment.requestServices", "$state"];

function requestController(requestServices, state) {
  var self = this;

  self.basicAssessment = {
    shareholdersSalaries: [],
    operatingProfits: [],
    totalCurrentStocks: [
      {
        yearsType: 0,
        amount: 0
      },
      {
        yearsType: 1,
        amount: 0
      },
      {
        yearsType: 2,
        amount: 0
      }
    ],
    totalCurrentLiabilities: [
      {
        yearsType: 0,
        amount: 0
      },
      {
        yearsType: 1,
        amount: 0
      },
      {
        yearsType: 2,
        amount: 0
      }
    ],
    recivedDocuments: [
      {
        yearsType: 0,
        amount: 0
      },
      {
        yearsType: 1,
        amount: 0
      },
      {
        yearsType: 2,
        amount: 0
      }
    ],
    operationIncome: [
      {
        yearsType: 0,
        amount: 0
      },
      {
        yearsType: 1,
        amount: 0
      },
      {
        yearsType: 2,
        amount: 0
      }
    ],
    totalStock: [
      {
        yearsType: 0,
        amount: 0
      },
      {
        yearsType: 1,
        amount: 0
      },
      {
        yearsType: 2,
        amount: 0
      }
    ],
    totalLiabilities: [
      {
        yearsType: 0,
        amount: 0
      },
      {
        yearsType: 1,
        amount: 0
      },
      {
        yearsType: 2,
        amount: 0
      }
    ],
    netGain: [
      {
        yearsType: 0,
        amount: 0
      },
      {
        yearsType: 1,
        amount: 0
      },
      {
        yearsType: 2,
        amount: 0
      }
    ]
  };

  self.basicAssessment.durationOfActivity = 0;

  const getBasicAssessment = async function() {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "complementary-info"
    };
    await requestServices.get(parameter).$promise.then(
      response => {
        self.basicAssessment = response.content;
      },
      errResponse => {
        if (errResponse.status != 404) {
          iziToast.show({
            message: errResponse.data.message,
            theme: "light",
            color: "red"
          });
        }
        console.log("ERror MACro");
      }
    );
  };
  getBasicAssessment();

  const calculateBasicAssessment = async function() {
    let parameter = {
      type: "LegalPersons",
      id: "self",
      routeParams: "initial-assessment"
    };
    await requestServices.update(parameter).$promise.then(
      response => {
        state.go("panel.basicAssessment.result");
      },
      errResponse => {
        iziToast.show({
          message: errResponse.data.message,
          theme: "light",
          color: "red"
        });
        console.log("ERror MACro");
      }
    );
  };

  self.submit = async function(basicAssessment, form) {
    if (form.$valid) {
      let parameter = {
        type: "LegalPersons",
        id: "self",
        routeParams: "complementary-info"
      };
      basicAssessment.registerDate = "1362/11/11";

      await requestServices.update(parameter, basicAssessment).$promise.then(
        response => {
          calculateBasicAssessment();
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
        },
        errResponse => {
          iziToast.show({
            message: errResponse.data.message,
            theme: "light",
            color: "red"
          });
          console.log("ERror MACro");
        }
      );
    } else {
      iziToast.show({
        message: "فرم را تکمیل کنید",
        theme: "light",
        color: "red"
      });
    }
  };
}

module.exports = ngModule => {
  ngModule.controller(
    "panel.basicAssessment.requestController",
    requestController
  );
};
