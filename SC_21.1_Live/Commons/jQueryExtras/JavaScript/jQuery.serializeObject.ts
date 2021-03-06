/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="jQuery.serializeObject"/>

/*
@module jQueryExtras
#jQuery.serializeObject
jQuery plugin used to transform a $form's data into an object literal with 'name: value' pairs. Usage:

	this.model.save(this.$savingForm.serializeObject()).done(...)
*/

import * as jQuery from '../../Core/JavaScript/jQuery';

(<any>jQuery.fn).serializeObject = <any>function() {
    const o = {};
    // http://api.jquery.com/serializeArray/
    const a = this.serializeArray();

    // When a checkbox is not checked, we need to send the "unchecked value"
    // that value is held as a data attribute: "data-unchecked-value"
    this.find('input[type=checkbox]:not(:checked)[data-unchecked-value]').each(function() {
        const $this = jQuery(this);

        a.push({
            name: $this.prop('name'),
            value: $this.data('unchecked-value')
        });
    });

    // Then we just loop through the array to create the object
    jQuery.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }

            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });

    return o;
};
const jQuerySerializeObjectModule = (<any>jQuery.fn).serializeObject;
export = jQuerySerializeObjectModule;
