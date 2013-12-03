TabsView
========

Description:
------------
Control TabsView, which displays its content as set bookmarks, one of which is active. Each tab has an internal unique name by which it can be accessed from code applications, and the title that appears when the tabs are drawing. The contents of each bookmarks can be arbitrary.


Requirements:
-------------
TabsView configured as follows:



```JS
var tabs = new TabsView({
    renderTo: document.querySelector('.header-tabs'), // DOM element where to render
    tabs: [                                           // List of tabs        
        {                                             // Single tab
            name: "tab1",                             // string, tab's name
            title: "Tab 1",                           // string, tab's title
            content: "Content for tab 1"              // string, free content
        },
        {
            name: "tab2", 
            title: "Tab 2", 
            content: "Content for tab 2"
        },
    ],
    activeTab: "tab2",                                // name of active tab
    events: {                                         // list of tab events                        
        click: function (name) {                      // click on tab, param the name of active tab
            /* ...*/  
        } 
    } 
});
```
