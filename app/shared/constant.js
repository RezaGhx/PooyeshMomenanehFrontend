var protocol = location.protocol;

var projectTitle = "پویش مومنانه | سامانه هدفمندسازی مساعدتهای داوطلبانه جهادی";

gateway = protocol + "//api.htdf-dev.ir";

var mode = "Dev";
if (mode === "Dev") {
    loanGuide = "5051bf48-b23d-42a1-b15e-9693644bdc30";
    warrantyGuide = "c9ea7479-0685-49f0-860a-a63bf31fec91";
    client_id = "35b71e0f-4ff0-4238-a610-cfde368909d6";
    gateway = protocol + "//api.htdf-dev.ir";
}
if (mode === "Test") {
    loanGuide = "5051bf48-b23d-42a1-b15e-9693644bdc30";
    warrantyGuide = "c9ea7479-0685-49f0-860a-a63bf31fec91";
    client_id = "35b71e0f-4ff0-4238-a610-cfde368909d6";
    gateway = protocol + "//api.htdf-test.ir";
} else if (mode === "Demo") {
    loanGuide = "5051bf48-b23d-42a1-b15e-9693644bdc30";
    warrantyGuide = "c9ea7479-0685-49f0-860a-a63bf31fec91";
    client_id = "dcf1a718-d925-4c37-963d-fdfb8439217f";
    gateway = protocol + "//api.htdf-demo.ir";
} else if (mode === "Production") {
    loanGuide = "5051bf48-b23d-42a1-b15e-9693644bdc30";
    warrantyGuide = "c9ea7479-0685-49f0-860a-a63bf31fec91";
    client_id = "dcf1a718-d925-4c37-963d-fdfb8439217f";
    gateway = protocol + "//api.htdf.ir";
}

apiGetWay = gateway + "/csm/v1";
apiWarranty = gateway + "/warranty";
apiLoan = gateway + "/loan/v1";
apiSecurity = gateway + "/authentication/";
apiFileManagerPost = gateway + "/file/Upload";
apiFileManagerGet = gateway + "/file/media";
apiLeasing = gateway + "/leasing/v1";
apiLeasing = gateway + "/leasing/v1";
apiReportCenterRefactor = gateway + "/ReportCenterRefactor/v1";