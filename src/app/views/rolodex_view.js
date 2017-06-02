import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import Contact from '../models/contact.js';
import ContactView from '../views/contact_view.js';
import Rolodex from '../collections/rolodex.js';
import ContactDetailView from '../views/contact_detail_view.js';


var RolodexView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this, "click", this.hideCard);
  },


  render: function() {
    this.$('#contact-cards').empty();
    var that = this;
    this.model.each(function(contact) {
      var contactView = new ContactView({
        tagName: 'li',
        model: contact,
        template: that.template
      });
      that.$("#contact-cards").append(contactView.render().el);
      that.listenTo(contactView, "showCard", that.showCard)

    });

    return this;
  },
  events: {
    "click #create-contact" : "addContact",
    "click #cancel-form" : "clearForm",
    "click" : "hideCard"
  },

  getFormData: function() {
    var formName = $("#name").val();
    var formPhone = $("#phone").val();
    var formEmail = $("#email").val();
    this.clearForm();

    return {
      name: formName,
      phone: formPhone,
      email: formEmail
    };
  },

  hideCard: function() {
    console.log("tried to hide card");
    // console.log(this);
    $("#contact-details").empty();
    $("#contact-details").remove();
  },

  stopEvent: function(event) {
    event.stopPropagation();
    console.log("prop stopped");
  },

  addContact: function() {
    console.log("clicked add");
    var newContact = new Contact(this.getFormData());
    this.model.add(newContact);
  },

  showCard: function(event) {
    console.log("clicked a card");
    $("#contact-details").empty();
    $("#contact-details").removeClass("hide");
    var contactDetailView = new ContactDetailView({
      model: event.model,
      template: _.template($("#tmpl-contact-details").html())
    });

    $("#contact-details").append(contactDetailView.render().el);
    contactDetailView.addEventListener("click", this.stopEvent, false);

  },

  clearForm: function() {
    $("#name").val('');
    $("#phone").val('');
    $("#email").val('');
  },

  stopProp: function(e) {
    e.stopPropagation();
  }


});


export default RolodexView;
