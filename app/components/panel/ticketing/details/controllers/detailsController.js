let nullLogo = require("../../images/userLogo.jpg");
detailsController.$inject = [
  "panel.ticketing.detailsServices",
  "$stateParams",
  "Upload",
  "$state"
];

function detailsController(detailsServices, stateParams, upload, state) {
  var self = this;
  self.nullLogo = nullLogo;
  let ticketId = stateParams.id;
  self.userContent = {};

  const getTicket = async function() {
    let parameter = {
      type: "persons",
      id: "self",
      routeParams: "tickets",
      ticketId: ticketId
    };
    self.promiseLoading = await detailsServices.get(parameter).$promise.then(
      response => {
        self.ticket = response.content;
      },
      errResponse => {
        iziToast.show({
          message: errResponse.data.message,
          theme: "light",
          color: "red"
        });
        state.go("panel.ticketing.list");
        console.log("error");
      }
    );
  };
  getTicket();

  self.closeTicket = async function() {
    let parameter = {
      type: "persons",
      id: "self",
      routeParams: "tickets",
      ticketId: ticketId,
      action: "close"
    };
    await detailsServices.update(parameter).$promise.then(
      response => {
        state.go("panel.ticketing.list");
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
        console.log("error");
      }
    );
  };

  let pushComment = function(description) {
    document.querySelector(".send-message-input").textContent = null;
    let command = {
      attachment: null,
      dateTime: moment()
        .locale("fa")
        .format("YYYY/MM/DD hh:mm:ss"),
      description: description,
      id: "id",
      itemType: 0,
      ownerId: "ownerId",
      ownerType: 0
    };
    self.ticket.detailItems.push(command);
  };

  self.comment = async function(type, attachment) {
    let message = document.querySelector(".send-message-input").textContent;
    let command = {};
    if (type == "text" && message.trim()) {
      command.description = message;
    } else if (type == "attachment" && attachment != null) {
      command.attachment = attachment;
    } else {
      return iziToast.show({
        message: "امکان ثبت نظر بدون محتوا وجود ندارد نمیتوانید ارسال کنید",
        theme: "light",
        color: "red"
      });
    }
    let parameter = {
      type: "persons",
      id: "self",
      routeParams: "tickets",
      ticketId: ticketId,
      action: "comments"
    };
    await detailsServices.create(parameter, command).$promise.then(
      response => {
        if (type == "text") {
          pushComment(message);
        }
        // command = {};
        // getTicket();
      },
      errResponse => {
        iziToast.show({
          message: errResponse.data.message,
          theme: "light",
          color: "red"
        });
        console.log("error");
      }
    );
  };

  const fileUploaderProgressbar = function(progressPercentage) {
    let uploadingFile = self.ticket.detailItems.find(
      item => item.attachment == "uploading"
    );
    if (progressPercentage < 100) {
      uploadingFile.progressPercent = progressPercentage;
    } else {
      uploadingFile.progressPercent = 100;
    }
  };
  const fileUploaderSuccess = function(attachment) {
    let uploadingFile = self.ticket.detailItems.find(
      item => item.attachment == "uploading"
    );
    uploadingFile.attachment = attachment;
  };

  self.uploadAttachment = function(file) {
    if (file.length > 0) {
      let command = {
        attachment: "uploading",
        dateTime: moment()
          .locale("fa")
          .format("YYYY/MM/DD hh:mm:ss"),
        description: null,
        id: "id",
        itemType: 0,
        ownerId: "ownerId",
        ownerType: 0
      };

      self.ticket.detailItems.push(command);

      upload
        .upload({
          url: apiFileManagerPost,
          data: {
            file: file
          }
        })
        .then(
          function(response) {
            let attachment = response.data[0].fileName;
            fileUploaderSuccess(attachment);
            self.comment("attachment", attachment);
          },
          function(resp) {
            self.userContent = {};
          },
          function(evt) {
            var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
            fileUploaderProgressbar(progressPercentage);
          }
        );
    }
  };

  var isInViewport = function(elem) {
    var bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  // var h1 = document.querySelector('.request');
  // var goToTop = document.querySelector('.go-to-top');

  // window.addEventListener('scroll', function (event) {
  //   if (!isInViewport(h1)) {
  //     console.log("In view");
  //     goToTop.style.display = "block";
  //   }
  //   else {
  //     goToTop.style.display = "none";
  //   }
  // }, false);
  $(".go-to-top").click(function() {
    //1 second of animation time
    //html works for FFX but not Chrome
    //body works for Chrome but not FFX
    //This strange selector seems to work universally
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
}

module.exports = ngModule => {
  ngModule.controller("panel.ticketing.detailsController", detailsController);
};
