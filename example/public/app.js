;(function (window, TabsView, document) {
    "use strict";
    document.addEventListener('DOMContentLoaded', function () {
        var tabs = new TabsView({
            renderTo: document.querySelector('.header-tabs'),
            tabs: [
                {name: "tab1", title: "Tab 1", content: "Content for tab 1"},
                {name: "tab2", title: "Tab 2", content: "Content for tab 2"},
                {name: "tab3", title: "Tab 3", content: "Content for tab 3"}
            ],
            activeTab: "tab2",
            events: { 
                click: function (name) { 
                    console.log('tab clicked: ' + name + ' | ' + tabs.tabTitle(name)); 
                } 
            }
        });

        setTimeout(function () {
            tabs.addTab("tab4", "Tab 4", "Content for tab 4");
        }, 3000);

        setTimeout(function () {
            tabs.removeTab("tab3");
        }, 5000);
    });
}(this, this.TabsView, this.document));