import { Component, Output, Input, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// ngModel
var DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DatePickerComponent; }),
    multi: true
};
import { MdDialog } from '@angular/material';
import { CalendarComponent } from './calendar.component';
import { LANG_EN } from './lang-en';
var DatePickerComponent = (function () {
    function DatePickerComponent(dialog) {
        this._format = 'mm/dd/yyyy';
        this.dateChange = new EventEmitter();
        this._MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this._DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        // ngModel
        this._onValueTouched = function () {
        };
        this._onValueChange = function (_) {
        };
        this.dialog = dialog;
        this.dayNames = LANG_EN.weekDays;
        this.monthNames = LANG_EN.months;
    }
    Object.defineProperty(DatePickerComponent.prototype, "format", {
        get: function () {
            return this._format;
        },
        set: function (value) {
            this._format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "date", {
        get: function () {
            return this.dateVal;
        },
        set: function (val) {
            var _this = this;
            this.dateVal = val;
            // Update ngModel
            this._onValueChange(val);
            setTimeout(function () {
                // trigger dateChange event
                _this.dateChange.emit(val);
            });
            // format date
            this.formattedDate = this.formatDate(val);
        },
        enumerable: true,
        configurable: true
    });
    ;
    DatePickerComponent.prototype.ngOnInit = function () {
        if (this.date === undefined) {
            this.date = new Date();
        }
    };
    DatePickerComponent.prototype.openDialog = function () {
        var _this = this;
        var ref = this.dialog.open(CalendarComponent);
        // Workaround to update style of dialog which sits outside of the component
        var containerDiv = ref._overlayRef._pane.children[0];
        containerDiv.style['padding'] = '0';
        ref.componentInstance.submit.subscribe(function (result) {
            _this.date = result;
            ref.close();
        });
        ref.componentInstance.cancel.subscribe(function (result) {
            ref.close();
        });
    };
    DatePickerComponent.prototype._LZ = function (x) {
        return (x < 0 || x > 9 ? "" : "0") + x;
    };
    // http://mattkruse.com/javascript/date/source.html
    DatePickerComponent.prototype._formatDate = function (date, format) {
        format = format + "";
        var result = "";
        var i_format = 0;
        var c = "";
        var token = "";
        var y = date.getYear().toString();
        var M = date.getMonth() + 1;
        var d = date.getDate();
        var E = date.getDay();
        var Ho = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
        // Convert real date parts into formatted versions
        var value = {};
        if (y.length < 4) {
            y = (y - 0 + 1900).toString();
        }
        value["y"] = "" + y;
        value["yyyy"] = y;
        value["yy"] = y.substring(2, 4);
        value["M"] = M;
        value["MM"] = this._LZ(M);
        value["MMM"] = this._MONTH_NAMES[M - 1];
        value["NNN"] = this._MONTH_NAMES[M + 11];
        value["d"] = d;
        value["dd"] = this._LZ(d);
        value["E"] = this._DAY_NAMES[E + 7];
        value["EE"] = this._DAY_NAMES[E];
        value["H"] = Ho;
        value["HH"] = this._LZ(Ho);
        if (Ho == 0) {
            value["h"] = 12;
        }
        else if (Ho > 12) {
            value["h"] = Ho - 12;
        }
        else {
            value["h"] = Ho;
        }
        value["hh"] = this._LZ(value["h"]);
        if (Ho > 11) {
            value["K"] = Ho - 12;
        }
        else {
            value["K"] = Ho;
        }
        value["k"] = Ho + 1;
        value["KK"] = this._LZ(value["K"]);
        value["kk"] = this._LZ(value["k"]);
        if (Ho > 11) {
            value["a"] = "PM";
        }
        else {
            value["a"] = "AM";
        }
        value["m"] = m;
        value["mm"] = this._LZ(m);
        value["s"] = s;
        value["ss"] = this._LZ(s);
        while (i_format < format.length) {
            c = format.charAt(i_format);
            token = "";
            while ((format.charAt(i_format) == c) && (i_format < format.length)) {
                token += format.charAt(i_format++);
            }
            if (value[token] != null) {
                result = result + value[token];
            }
            else {
                result = result + token;
            }
        }
        return result;
    };
    DatePickerComponent.prototype.formatDate = function (date) {
        if (!date) {
            return '';
        }
        return this._formatDate(date, this._format);
    };
    Object.defineProperty(DatePickerComponent.prototype, "value", {
        // get accessor
        get: function () {
            console.log('get value');
            return this.date;
        },
        // set accessor including call the onchange callback
        set: function (v) {
            console.log('set value', v);
            this._onValueChange(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    // From ControlValueAccessor interface
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this._onValueChange = fn;
    };
    // From ControlValueAccessor interface
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
        this._onValueTouched = fn;
    };
    // From ControlValueAccessor interface
    // ngModel change
    DatePickerComponent.prototype.writeValue = function (value) {
        this.date = value;
    };
    return DatePickerComponent;
}());
export { DatePickerComponent };
DatePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'md-datepicker',
                template: "\n    <md-input-container flex>\n      <input mdInput (click)=\"openDialog()\" mdInput [value]=\"formattedDate\" (ngModelChange)=\"onChange($event)\">\n      <md-icon mdPrefix>date_range</md-icon>\n    </md-input-container>\n  ",
                exportAs: 'datePicker',
                providers: [DATE_PICKER_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DatePickerComponent.ctorParameters = function () { return [
    { type: MdDialog, },
]; };
DatePickerComponent.propDecorators = {
    'dateChange': [{ type: Output },],
    'format': [{ type: Input },],
    'date': [{ type: Input },],
};
