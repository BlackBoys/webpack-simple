import 'babel-polyfill';
// import "jquery";
// import "imports-loader?$=jquery!select2";
// import "select2/dist/css/select2.css"
// import "imports-loader?$=jquery!bootstrap";
// import "imports-loader?$=jquery!./bootstrap-datetimepicker.min";
import "angular";
// import "angular-animate";
import "angular-ui-router";
// import "angular-ui-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
// import "./index.css";
// import XuntongJSBridge from "XuntongJSBridge";
// import "./common";
// import "imports-loader?angular!./assets/global/plugins/angularjs/angular-sanitize.min";
// import "imports-loader?angular!./assets/global/plugins/angularjs/angular-touch.min";
import "frozenui/dist/css/basic.css";
import "frozenui/dist/css/frozen.css";
// import "frozenui/dist/js/frozen";
import "moment";
import "moment/locale/zh-cn";
import "angular-moment-picker";
import "angular-moment-picker/dist/angular-moment-picker.css";
import "./dashboard.css";
// import "angular-datepicker";
// import "angular-datepicker/dist/index.css";
import "./app";
// function importControler (r) {
//   r.keys().forEach(r);
// }
// importControler(require.context('./', true, /\.controller.js$/));


// function importService (r) {
//   r.keys().forEach(r);
// }
// importService(require.context('./', true, /\.service.js$/));

// function importDirective (r) {
//   r.keys().forEach(r);
// }
// importDirective(require.context('./', true, /\.directive.js$/));


function importFactory (r) {
  r.keys().forEach(r);
}
importFactory(require.context('./', true, /\.factory.js$|\.contant.js$|\.directive.js$|\.service.js$|\.controller.js$/));

// function importContant (r) {
//   r.keys().forEach(r);
// }
// importContant(require.context('./', true, /\.contant.js$/));

// import "./visitor-apply.controller";
// import "./visiting-records.controller";
// import "./visiting-records-detail.controller";
// import "./code-log.controller";
// import "./domain.contant";