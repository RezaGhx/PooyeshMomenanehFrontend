feedbackController.$inject = ["$state", "$resource", "$stateParams"];

function feedbackController(state, resource, stateParams) {
  var self = this;
  let id = stateParams.id;
  self.reasons = [];
  self.feedback = {
    rate: 0
  };

  self.$onInit = function() {
    let requestId = self.requestId;

    let feedback = resource(`${apiGetWay}/:type/:id/:routeParams`, {
      // requestId: requestId,
      id: "@id",
      type: "@type",
      routeParams: "@routeParams"
    });

    let feedbackWarranty = resource(`${apiWarranty}/:type/:id/:routeParams`, {
      // requestId: requestId,
      id: "@id",
      type: "@type",
      routeParams: "@routeParams"
    });

    const resetReasons = function() {
      self.reasons.forEach(reason => {
        reason.selected = false;
      });
    };

    const feedbackReasonTitle = function() {
      let query = {
        type: "feedbacks",
        id: "facilities",
        routeParams: "reasons"
      };
      feedback.get(query).$promise.then(
        response => {
          self.reasons = response.content;
        },
        errResponse => {
          console.log("error");
        }
      );
    };

    feedbackReasonTitle();

    self.selectedReasons = function(item) {
      let selectedReasons = self.reasons.find(x => x.id == item.id);
      selectedReasons.selected
        ? (selectedReasons.selected = false)
        : (selectedReasons.selected = true);
    };

    self.rate = function(event) {
      resetReasons();
      self.feedback.rate = event.rating;
    };

    self.checkRating = function(rate) {
      if (rate == 0) {
        iziToast.show({
          message: "اگر میخواهید نظر بدهید باید حداقل امتیازی را بدهید",
          theme: "light",
          color: "red"
        });
      }
    };

    self.submit = function(item) {
      let command = item;
      command.serviceType = 1;
      command.serviceId = id;
      command.reasonIds = reasonsSubmitHandler(self.reasons);

      if (item.rate >= 0) {
        let parameter = {
          type: "feedbacks"
        };

        feedback.save(parameter, item).$promise.then(
          response => {
            // feedback = {};
            // form.$setUntouched();
            // form.$setPristine();
            iziToast.show({
              message: response.message,
              theme: "light",
              color: "green"
            });
            state.go("panel.dashboard");

            // state.go("panel.ticketing.list");
          },
          errResponse => {
            iziToast.show({
              message: errResponse.data.message,
              theme: "light",
              color: "red"
            });
            console.log("fail createYear");
          }
        );
      } else {
        iziToast.show({
          message: "اگر میخواهید نظر بدهید باید حداقل امتیازی را بدهید",
          theme: "light",
          color: "red"
        });
      }
    };

    self.skip = function() {
      let parameter = {
        type: "applicantWarrantyRequest",
        id: id,
        routeParams: "archive"
      };

      feedbackWarranty.save(parameter, { id }).$promise.then(
        response => {
          // feedback = {};
          // form.$setUntouched();
          // form.$setPristine();
          iziToast.show({
            message: response.message,
            theme: "light",
            color: "green"
          });
          state.go("panel.dashboard");

          // state.go("panel.ticketing.list");
        },
        errResponse => {
          iziToast.show({
            message: errResponse.data.message,
            theme: "light",
            color: "red"
          });
          console.log("fail createYear");
        }
      );
    };
  };

  function reasonsSubmitHandler(reasons) {
    let finalReasons = [];
    const result = reasons.filter(reason => reason.selected == true);
    result.forEach(reason => {
      finalReasons.push(reason.id);
    });
    return finalReasons;
  }
}

export { feedbackController };
