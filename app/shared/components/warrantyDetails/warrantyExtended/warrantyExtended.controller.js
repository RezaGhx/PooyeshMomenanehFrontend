warrantyExtendedController.$inject = [
    "$state",
    "$resource",
    "Upload",
    "$auth"
];

function warrantyExtendedController(state, resource, upload, auth) {
    var self = this;

    self.$onInit = function () {
        let warrantyId = self.warrantyId;

        let warrantyExtendedDetailsServices = resource(
            `${apiWarranty}/WarrantyRequests/${warrantyId}/worksheet`
        );

        let user = auth.user();

        self.downloadWarrantyFile = function () {
            let promise1 = new Promise(function (resolve, reject) {
                var url = `${apiWarranty}/warrantyExtendCommands/${warrantyId}/warranty-file`;
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("Authorization", "Bearer " + user.auth_token);
                req.responseType = "blob";
                req.onload = function (event) {
                    if (req.status === 200) {
                        resolve(req.response);
                    } else {
                        reject(req.response);
                    }
                };
                req.send();
            });
            return promise1
                .then(function (value) {
                    var blob = value;
                    var link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "warranty-file.docx";
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                })
                .catch(reason => {
                    iziToast.show({
                        message: "فایل مورد نظر یافت نشد.",
                        theme: "light",
                        color: "red"
                    });
                });
        };

        

        self.submitWorksheet = function () {
            if (self.worksheetAttachment != null) {
                let command = {
                    workSheet: self.worksheetAttachment
                };

                warrantyExtendedDetailsServices.save({}, command).$promise.then(
                    response => {
                        iziToast.show({
                            message: response.message,
                            theme: "light",
                            color: "green"
                        });
                        state.go("panel.dashboard");
                    },
                    errResponse => {
                        iziToast.show({
                            message: errResponse.data.message,
                            theme: "light",
                            color: "red"
                        });
                    }
                );
            } else {
                iziToast.show({
                    message: "فایل کاربرگ را آپلود نمایید.",
                    theme: "light",
                    color: "red"
                });
            }
        };
    };
}

export { warrantyExtendedController };
