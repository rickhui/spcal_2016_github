(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var wkhtmltopdf;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/classcraft_meteor-wkhtmltopdf/packages/classcraft_meteor-wkht //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/classcraft:meteor-wkhtmltopdf/classcraft:meteor-wkhtmlto //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
wkhtmltopdf = Npm.require('wkhtmltopdf');                            // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////

}).call(this);

////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['classcraft:meteor-wkhtmltopdf'] = {}, {
  wkhtmltopdf: wkhtmltopdf
});

})();
