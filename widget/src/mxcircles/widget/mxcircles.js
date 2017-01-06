define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "mxcircles/lib/circles"

], function (declare, _WidgetBase, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, circles) {
    "use strict";

    return declare("mxcircles.widget.mxcircles", [_WidgetBase], {

        // Internal variables.
        _handles: [],
        _contextObj: null,
        _myCircle: null,

        constructor: function () {
            this._handles = [];
            this._myCircle = null;
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");
            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering(callback);
        },

        resize: function (box) {
            logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
            logger.debug(this.id + ".uninitialize");
        },

        _updateCircle: function (objRadius, objValue, objWidth) {
            this._myCircle.updateRadius(objRadius);
            this._myCircle.update(objValue);
            this._myCircle.updateWidth(objWidth);

        },
        _createCircle: function (objRadius, objValue, objMaxValue, objWidth) {
            this._myCircle = circles.create({
                el: this.domNode,
                radius: objRadius,
                value: objValue,
                maxValue: objMaxValue,
                width: objWidth,
                text: function (value) { return value + '%' },
                colors: this.colors.split(","),
                duration: this.duration,
                wrpClass: this.wrpClass,
                textClass: this.textClass,
                valueStrokeClass: this.valueStrokeClass,
                maxValueStrokeClass: this.maxValueStrokeClass,
                styleWrapper: true,
                styleText: true
            });
        },


        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");
            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
                var objRadius = parseInt(this._contextObj.get(this.radius));
                var objValue = parseInt(this._contextObj.get(this.value));
                var objMaxValue = parseInt(this._contextObj.get(this.maxValue));
                var objWidth = parseInt(this._contextObj.get(this.width));
                if (this._myCircle != null) {
                    this._updateCircle(objRadius, objValue, objWidth);
                } else {
                    this._createCircle(objRadius, objValue, objMaxValue, objWidth);
                }
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }

            this._executeCallback(callback);
        },

        _resetSubscriptions: function () {
            logger.debug(this.id + "._resetSubscriptions");
            // Release handle on previous object, if any.
            var i = 0;

            for (i = 0; i < this._handles.length; i++) {
                if (this._handles[i]) {
                    this.unsubscribe(this._handles[i]);
                    this._handles[i] = null;
                }
            }

            if (this._contextObj) {
                this._handles[0] = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: this._updateRendering
                });
            }
        },
        
        _executeCallback: function (cb) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["mxcircles/widget/mxcircles"]);
