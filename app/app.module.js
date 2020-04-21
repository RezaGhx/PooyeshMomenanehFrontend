import { ngInputFilter } from "ng-input-filter";
// Fontawesome 5
import "./shared/font-awesome";

// Style
import "../scss/app.scss";

// App Config
import AppConfig from "./app.config";

// App Filters
const jalaliDateFilter = require("./shared/filters/jalaliDateFilter");
const warrantyTypeFilter = require("./shared/filters/warrantyTypeFilter");
const activityTypeFilter = require("./shared/filters/activityTypeFilter");
const companyTypeFilter = require("./shared/filters/companyTypeFilter");
const salesTypeFilter = require("./shared/filters/salesTypeFilter");
const technologyTypeFilter = require("./shared/filters/technologyTypeFilter");
const isStartupTypeFilter = require("./shared/filters/isStartupTypeFilter");
const knowledgeBaseTypeFilter = require("./shared/filters/knowledgeBaseTypeFilter");
const loanTypeFilter = require("./shared/filters/loanTypeFilter");
const loanNumTypeFilter = require("./shared/filters/loanNumTypeFilter");
const loanIntroducerFilter = require("./shared/filters/loanIntroducerFilter");
const genderFilter = require("./shared/filters/genderFilter");
const personTypeFilter = require("./shared/filters/personTypeFilter");
const dateFromNow = require("./shared/filters/dateFromNow");
const bailTypeFilter = require("./shared/filters/bailTypeFilter");
const contractTypeFilter = require("./shared/filters/contractTypeFilter");
const leasingCustomerType = require("./shared/filters/leasingCustomerType");

// App Factories
const dateFactory = require("./shared/factories/dateFactory");
const warrantyTypeFactory = require("./shared/factories/warrantyTypeFactory");
const loanTypeFactoryEnum = require("./shared/factories/loanTypeFactoryEnum");
const companyTypeFactory = require("./shared/factories/companyTypeFactory");
const activityTypeFactory = require("./shared/factories/activityTypeFactory");
const technologyTypeFactory = require("./shared/factories/technologyTypeFactory");
const isStartupTypeFactory = require("./shared/factories/isStartupTypeFactory");
const knowledgeBaseTypeFactory = require("./shared/factories/knowledgeBaseTypeFactory");
const ProvinceFactory = require("./shared/factories/ProvinceFactory");
const CityFactory = require("./shared/factories/CityFactory");
const serviceTypeFactory = require("./shared/factories/serviceTypeFactory");
const leasingCustomerTypeEnum = require("./shared/factories/leasingCustomerTypeEnum");

const dataStore = require("./shared/service/dataStore");

// App Controller
const AppController = require("./app.controller");

// ImportModuleJS
import panelModule from "./components/panel/panel.module";
import generalModule from "./components/general/general.module";

// ImportComponentJS
import footerComponent from "./shared/components/footer/footer.component";
import carouselComponent from "./shared/components/carousel/carousel.component";

// sooranDesign
import sdModule from "../dev_modules/sooranDesign/sooranDesign";

import { ngAuthMiddleware } from "ng-auth-middleware";

// App Run
import AppRun from "./app.run";

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 * @apiDeprecated use now (#Group:Name).
 * @apiDescription This is the Description.
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

const ngModule = angular.module("app", [
  /* Shared modules */
  //"app.core",
  "ui.router",
  "oc.lazyLoad",
  "ngResource",
  "ngMessages",
  "ngAnimate",
  "ADM-dateTimePicker",
  "angular-loading-bar",
  "ngCookies",
  "ngFileUpload",
  "ngTable",
  "cgBusy",
  "angularPromiseButtons",
  "angularPagination",
  "tc.chartjs",
  "moment-picker",
  "sdModule",
  "ngAuthMiddleware",
  /* Feature areas*/
  "panelModule",
  "generalModule",
  "ngInputFilter"
]);

// Inject Components
footerComponent(ngModule);
carouselComponent(ngModule);

ngModule.config(AppConfig);
ngModule.run(AppRun);
AppController(ngModule);
// filters
jalaliDateFilter(ngModule);
salesTypeFilter(ngModule);
warrantyTypeFilter(ngModule);
personTypeFilter(ngModule);
activityTypeFilter(ngModule);
companyTypeFilter(ngModule);
technologyTypeFilter(ngModule);
isStartupTypeFilter(ngModule);
genderFilter(ngModule);
dateFromNow(ngModule);
knowledgeBaseTypeFilter(ngModule);
loanTypeFilter(ngModule);
loanNumTypeFilter(ngModule);
bailTypeFilter(ngModule);
contractTypeFilter(ngModule);
loanIntroducerFilter(ngModule);
leasingCustomerType(ngModule);

// factories
dateFactory(ngModule);
warrantyTypeFactory(ngModule);
loanTypeFactoryEnum(ngModule);
companyTypeFactory(ngModule);
activityTypeFactory(ngModule);
technologyTypeFactory(ngModule);
isStartupTypeFactory(ngModule);
knowledgeBaseTypeFactory(ngModule);
CityFactory(ngModule);
ProvinceFactory(ngModule);
serviceTypeFactory(ngModule);
dataStore(ngModule);
leasingCustomerTypeEnum(ngModule);

// Directive
require("./shared/directive/currencyInput")(ngModule);
// Auth
require("./shared/auth/authHttpResponseInterceptor")(ngModule);
require("./shared/auth/compareTo")(ngModule);
require("./shared/Directive/otpInput")(ngModule);

// cgBusyConfig
ngModule.value("cgBusyDefaults", {
  message: "صبر کنید ..."
});

export { ngModule };
