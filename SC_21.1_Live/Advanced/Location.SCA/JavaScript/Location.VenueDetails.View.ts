/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Location.VenueDetails.View"/>

import * as _ from 'underscore';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as locator_venue_details_tpl from 'locator_venue_details.tpl';

import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');

const LocationVenueDetailsView: any = BackboneView.extend({
    template: locator_venue_details_tpl,

    // @method initialize
    // @params {Object} options
    initialize: function initialize(options) {
        this.model = options.model;
        this.application = options.application;
        this.show_address = options.showAddress;
        this.hide_cutoff_time = options.hideCutoffTime;
    },
    // @method setOpeningHours
    setOpeningHours: function setOpeningHours() {
        const opening_hours = this.model.get('servicehours');
        const opening_hours_str_list = [];

        _.each(opening_hours, function(row: any) {
            const hours = row.starttime + Utils.translate(' to ') + row.endtime;
            const days_list = [
                row.monday === 'T',
                row.tuesday === 'T',
                row.wednesday === 'T',
                row.thursday === 'T',
                row.friday === 'T',
                row.saturday === 'T',
                row.sunday === 'T'
            ];
            const days_name = [
                Utils.translate('Monday'),
                Utils.translate('Tuesday'),
                Utils.translate('Wednesday'),
                Utils.translate('Thursday'),
                Utils.translate('Friday'),
                Utils.translate('Saturday'),
                Utils.translate('Sunday')
            ];
            let days = '';
            let sequence_days = [];
            let discontinuous_days = [];
            let sequence_active = false;
            let sequence_finish = false;

            _.each(days_list, function(day, key) {
                if (day) {
                    if (sequence_days.length === 0) {
                        sequence_active = true;
                    }
                    if (sequence_active && !sequence_finish) {
                        sequence_days.push(days_name[key]);
                    } else {
                        discontinuous_days.push(days_name[key]);
                    }
                } else if (sequence_active) {
                    if (sequence_days.length < 3) {
                        sequence_active = false;
                        discontinuous_days = discontinuous_days.concat(sequence_days);
                        sequence_days = [];
                    } else {
                        sequence_finish = true;
                    }
                }
            });

            if (sequence_days.length < 3) {
                sequence_active = false;
                discontinuous_days = discontinuous_days.concat(sequence_days);
            }

            if (sequence_active) {
                days =
                    sequence_days[0] +
                    Utils.translate(' to ') +
                    sequence_days[sequence_days.length - 1];
            }

            _.each(discontinuous_days, function(discontinuous_day, key) {
                if (key === 0 && !sequence_active) {
                    days += discontinuous_day;
                } else if (key === discontinuous_days.length - 1) {
                    days = days + Utils.translate(' and ') + discontinuous_day;
                } else {
                    days = days + ', ' + discontinuous_day;
                }
            });

            const open_hours_row = { row: days + ' - ' + hours };

            opening_hours_str_list.push(open_hours_row);
        });

        return opening_hours_str_list;
    },
    // @method getContext
    getContext: function getContext() {
        const { model } = this;

        return {
            // @property {StoreLocator.Model} model
            location: model,
            // @property {Boolean} showAddress
            showAddress: this.show_address,
            // @property {Boolean} showStoreAddress
            showStoreAddress: !!model.get('address1'),
            // @property {Boolean} showCity
            showCity: !!model.get('city'),
            // @property {Boolean} showZipCode
            showZipCode: !!model.get('zip'),
            // @property {Boolean} showStoreState
            showStoreState: !!model.get('state'),
            // @property {Boolean} showPhone
            showPhone: !!model.get('phone'),
            // @property {Boolean} showServiceHours
            showServiceHours: !!(model.get('servicehours') && model.get('servicehours').length),
            // @property {Array} serviceHours
            serviceHours: this.setOpeningHours(),
            // @property {Boolean} showCutoffTime
            showCutoffTime: !this.hide_cutoff_time && !!model.get('nextpickupday'),
            // @property {Boolean} showCutoffTime
            nextPickupDayIsToday: this.model.get('nextpickupday') === 'today',
            // @property {Boolean} nextPickupDayIsToday
            nextPickupDayIsTomorrow: this.model.get('nextpickupday') === 'tomorrow',
            // @property {Boolean} nextPickupDayIsTomorrow
            nextPickupDayIsSunday: this.model.get('nextpickupday') === 'sunday',
            // @property {Boolean} nextPickupDayIsSunday
            nextPickupDayIsMonday: this.model.get('nextpickupday') === 'monday',
            // @property {Boolean} nextPickupDayIsMonday
            nextPickupDayIsTuesday: this.model.get('nextpickupday') === 'tuesday',
            // @property {Boolean} nextPickupDayIsTuesday
            nextPickupDayIsWednesday: this.model.get('nextpickupday') === 'wednesday',
            // @property {Boolean} nextPickupDayIsWednesday
            nextPickupDayIsThursday: this.model.get('nextpickupday') === 'thursday',
            // @property {Boolean} nextPickupDayIsThursday
            nextPickupDayIsFriday: this.model.get('nextpickupday') === 'friday',
            // @property {Boolean} nextPickupDayIsFriday
            nextPickupDayIsSaturday: this.model.get('nextpickupday') === 'saturday'
        };
    }
});

export = LocationVenueDetailsView;
