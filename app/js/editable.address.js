/**
Address editable input.
Internally value stored as {city: "Moscow", street: "Lenina", building: "15"}

@class address
@extends abstractinput
@final
@example
<a href="#" id="address" data-type="address" data-pk="1">awesome</a>
<script>
$(function(){
    $('#address').editable({
        url: '/post',
        title: 'Enter city, street and building #',
        value: {
            city: "Moscow", 
            street: "Lenina", 
            building: "15"
        }
    });
});
</script>
**/
(function ($) {
    "use strict";
    
    var Address = function (options) {
        this.init('address', options, Address.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(Address, $.fn.editabletypes.abstractinput);

    $.extend(Address.prototype, {
        /**
        Renders input from tpl

        @method render() 
        **/        
        render: function() {
           this.$input = this.$tpl.find('input');
        },
        
        /**
        Default method to show value in element. Can be overwritten by display option.
        
        @method value2html(value, element) 
        **/
        value2html: function(value, element) {
            if(!value) {
                $(element).empty();
                return; 
            }
            var html = $('<div>').text(value.city).html() + ', ' + $('<div>').text(value.street).html() + ' st., bld. ' + $('<div>').text(value.building).html();
            $(element).html(html); 
        },
        
        /**
        Gets value from element's html
        
        @method html2value(html) 
        **/        
        html2value: function(html) {        
          /*
            you may write parsing method to get value by element's html
            e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
            but for complex structures it's not recommended.
            Better set value directly via javascript, e.g. 
            editable({
                value: {
                    city: "Moscow", 
                    street: "Lenina", 
                    building: "15"
                }
            });
          */ 
          return null;  
        },
      
       /**
        Converts value to string. 
        It is used in internal comparing (not for sending to server).
        
        @method value2str(value)  
       **/
       value2str: function(value) {
           var str = '';
           if(value) {
               for(var k in value) {
                   str = str + k + ':' + value[k] + ';';  
               }
           }
           return str;
       }, 
       
       /*
        Converts string to value. Used for reading value from 'data-value' attribute.
        
        @method str2value(str)  
       */
       str2value: function(str) {
           /*
           this is mainly for parsing value defined in data-value attribute. 
           If you will always set value by javascript, no need to overwrite it
           */
           return str;
       },                
       
       /**
        Sets value of input.
        
        @method value2input(value) 
        @param {mixed} value
       **/         
       value2input: function(value) {
           if(!value) {
             return;
           }
           this.$input.filter('[name="person_name"]').val(value.name);
           this.$input.filter('[name="person_city"]').val(value.city);
           this.$input.filter('[name="person_day"]').val(value.day);
           this.$input.filter('[name="person_month"]').val(value.month);
           this.$input.filter('[name="person_year"]').val(value.year);
       },       
       
       /**
        Returns value of input.
        
        @method input2value() 
       **/          
       input2value: function() { 
           return {
              name: this.$input.filter('[name="person_name"]').val(), 
              city: this.$input.filter('[name="person_city"]').val(), 
              day: this.$input.filter('[name="person_day"]').val(), 
              month: this.$input.filter('[name="person_month"]').val(),
              year: this.$input.filter('[name="person_year"]').val()
           };
       },        
       
        /**
        Activates input: sets focus on the first field.
        
        @method activate() 
       **/        
       activate: function() {
            this.$input.filter('[name="person_name"]').focus();
       },  
       
       /**
        Attaches handler to submit form in case of 'showbuttons=false' mode
        
        @method autosubmit() 
       **/       
       autosubmit: function() {
           this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
           });
       }       
    });

    Address.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl:  '<div class="editable-address item"><input type="text" placeholder="Ваше имя" name="person_name" class="input-small"></div>'+
              '<div class="editable-address item">\
              <select data-live-search="true" name="person_city" class="display_block select_ajax">\
                <option value="">Город</option>\
                <option value="">СПб</option>\
                <option value="">Москва</option>\
              </select>\
              </div>'+
              '<div class="editable-address item">\
              <div class="row">\
                <div class="col-xs-4 right_padding5">\
                  <select name="person_day" class="display_block select_ajax" data-live-search="true">\
                    <option value="">Дата</option>\
                    <option value="">СПб</option>\
                    <option value="">Москва</option>\
                  </select>\
                </div>\
                <div class="col-xs-4 right_padding5 left_padding5">\
                  <select name="person_month" class="display_block select_ajax" data-live-search="true">\
                    <option value="">Месяц</option>\
                    <option value="">СПб</option>\
                    <option value="">Москва</option>\
                  </select>\
                </div>\
                <div class="col-xs-4 left_padding5">\
                  <select name="person_year" class="display_block select_ajax" data-live-search="true">\
                    <option value="">Год</option>\
                    <option value="">СПб</option>\
                    <option value="">Москва</option>\
                  </select></div>\
              </div>\
            </div>',
             
        inputclass: ''
    });



    $.fn.editabletypes.address = Address;

}(window.jQuery));