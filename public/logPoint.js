(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['logPoint'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class= \"log-field\"># of Cardsets: "
    + alias4(((helper = (helper = helpers.max || (depth0 != null ? depth0.max : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"max","hash":{},"data":data}) : helper)))
    + ", # of Matching Cards: "
    + alias4(((helper = (helper = helpers.flips || (depth0 != null ? depth0.flips : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"flips","hash":{},"data":data}) : helper)))
    + ", Amount of Turns Taken: "
    + alias4(((helper = (helper = helpers.turnCount || (depth0 != null ? depth0.turnCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"turnCount","hash":{},"data":data}) : helper)))
    + "</li>";
},"useData":true});
})();