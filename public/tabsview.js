/**
 * Add utils functions.
 */
;(function (window, document, _, undefined) {
    /**
     * Simple
     *
     * @type {Function|*}
     */
    _.each = function (arr, fn) {
        var res = [], i;
        for (i in arr) {
            if (arr.hasOwnProperty(i)) {
                res.push(fn(i, arr[i]));
            }
        }
        return res;
    };
    /**
     * Simple templater.
     *
     * @param template string
     * @param params object
     * @returns string
     */
    _.template = function (template, params) {
        _.each(params, function (i, part) {
            template = template.replace(new RegExp('{{' + i + '}}', 'g'), part);
        });
        return template;
    };

    /**
     * Simple extend function
     *
     * @type {Function|*}
     */
    _.extend = function (from, to) {
        return _.each(from, function (i, val) {
            to[i] = to[i] || val;
        });
    };

    /**
     * Hide collection on elements.
     *
     * @type {Function|*}
     */
    _.hide = function (elems) {
        _.each(elems, function (i, el) {
            el.style.display = "none";
        });
    };

    /**
     * Show collection of elements.
     *
     * @type {Function|*}
     */
    _.show = function (elems) {
        _.each(elems, function (i, el) {
            el.style.display = "block";
        });
    };

    /**
     * Append element to container.
     *
     * @type {Function|*}
     */
    _.append = function (el, to) {
        var wrp = document.createElement("div");
        wrp.innerHTML = el;
        document.querySelector(to || "body").appendChild(wrp.firstChild);
        return wrp.firstChild;
    };
}(this, this.document ,this._ = {}));

/**
 * TabView plugin.
 */
;(function (window, document, _, undefined) {
    "use strict";

    var wrapperTpl = "<div class='tabsview-wrp'><ul class='tabs-wrp'>{{header}}</ul><div class='cnt-wrp'>{{content}}</div></div>",
        headTpl = "<li class='tab tab-{{name}}' data-name='{{name}}'>{{title}}</li>",
        contentTpl = "<div class='cnt cnt-{{name}}' style='display: none;'>{{content}}</div>",
        defaults = { renderTo: null, tabs: [], activeTab: '', events: {}};

    /**
     * Tabs view constructor.
     *
     * @param params
     * @constructor
     */
    function TabsView(params) {
        _.extend(defaults, params);

        this.tabs = params.tabs;
        this.elem = params.renderTo;
        this.active = params.activeTab;

        _render.call(this, this.tabs);

        _attachEvents.call(this, params.events);
        _attachEvents.call(this, {click: this.activeTab.bind(this)});
    }

    /**
     * Render tabs to view
     *
     * @param tabs
     * @private
     */
    function _render(tabs) {
        var res = {header: [], content: []};

        _.each(tabs, function (i, val) {
            res.header.push(_.template(headTpl, val));
            res.content.push(_.template(contentTpl, val));
        });

        res = _.template(wrapperTpl, {
            header: res.header.join(''),
            content: res.content.join('')
        });

        this.elem.innerHTML = res;

        this.activeTab(this.active);
    }

    /**
     * Attach events to element.
     *
     * @param events
     * @private
     */
    function _attachEvents(events) {
        var self = this;
        _.each(events, function (eType, fn) {
            if ("function" === typeof fn) {
                self.elem.addEventListener(eType, function (e) {
                    var el = e.target || e.srcElement;
                    if (el.classList.contains('tab')) {
                        fn(el.dataset.name);
                    }
                });
            }
        });
    }

    TabsView.prototype = {

        constructor: TabsView,

        /**
         * Get or set active tab
         *
         * @param name string
         * @return string
         */
        activeTab: function (name) {
            if (!name) {
                return this.active;
            }

            this.active = name;

            _.hide(this.elem.querySelectorAll('.cnt'));
            _.show(this.elem.querySelectorAll('.cnt-' + name));
        },

        /**
         * get set tab title
         *
         * @param name
         * @param title
         */
        tabTitle: function (name, title) {
            var el = this.elem.querySelector('.cnt-' + name);
            if (!!title) {
                el.innerHTML = title;
            } else {
                return el.innerHTML;
            }
        },

        /**
         * Add new Tab
         *
         * @param name
         * @param title
         * @param content
         */
        addTab: function (name, title, content) {
            var obj = {name: name, title: title, content: content};

            _.append(_.template(headTpl, obj), '.tabs-wrp');
            _.append(_.template(contentTpl, obj), '.cnt-wrp');
        },

        /**
         * Remove existed tab
         *
         * @param name
         */
        removeTab: function (name) {
            this.elem.querySelector('.tabs-wrp').removeChild(document.querySelector('.tab-' + name));
            this.elem.querySelector('.cnt-wrp').removeChild(document.querySelector('.cnt-' + name));
        }
    };

    window.TabsView = TabsView;
} (this, this.document ,this._));s