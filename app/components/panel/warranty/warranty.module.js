import warrantyRouting from './warranty.routes';

import { requestModule } from "./request/request.module";
const warrantyModule = angular.module('warrantyModule', ["warranty.requestModule"]);

warrantyModule.config(warrantyRouting);

export default warrantyModule;