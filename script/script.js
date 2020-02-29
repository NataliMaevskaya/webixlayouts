const currentYear = new Date().getFullYear();

const toolbar = {
    view: "toolbar",
    id: "toolbar",
    paddingX: 12,
    css: "webix_dark",
    elements: [{
            view: "label",
            label: "My App",
        },
        {},
        {
            view: "button",
            id: "userbtn",
            type: "icon",
            icon: "wxi-user",
            label: "Profile",
            width: 90,
            css: "webix_transparent",
            popup: "popupmenu"
        }
    ]
};
const menuList = {
    view: "list",
    id: "list",
    template: "#title#",
    select: true,
    scroll: false,
    css: "webix_layout_clean",
    on:{
        onAfterSelect:function(id){ 
          $$(id).show();
      }
    },
    data: menuListSet
};
const menuLink = {
    template: "<span class='webix_icon wxi-check'></span> Connected",
    height: 30,
    type: "clean",
    css: "span-green"
};
const sideMenu = {
    maxWidth: 200,
    minWidth: 100,
    type: "clean",
    rows: [
        menuList,
        {},
        menuLink
    ],
    css: "menu"

};
const datatable = {
    view: "datatable",
    id: "datatable",
    scroll: "y",
    url: "../data/data.js",
    columns: [{
            id: "title",
            header: "Title",
            fillspace: 3
        },
        {
            id: "year",
            header: "Year",
        },
        {
            id: "votes",
            header: "Votes",
            fillspace: 1
        },
        {
            id: "rating",
            header: "Rating",
        },
        {
            id: "rank",
            header: "Rank",
        }
    ]
};

const clearFieldsAndMessages = function () {
    webix.confirm({
        text: "Do you still want to clear all fields?"
    }).then(() => {
        $$("form").clear();
        $$("form").clearValidation();
    });
};
const addItemToDatatable = function () {
    if ($$("form").validate()) {
        const item = idForm.getValues();
        $$("datatable").add(item);
        webix.message({
            text: "Data is added successfully!",
            type: "success"
        });

    }
};
const formButtons = {
    cols: [{
            view: "button",
            value: "Add new",
            css: "webix_primary",
            click: addItemToDatatable
        },
        {
            width: 10
        },
        {
            view: "button",
            value: "Clear",
            click: clearFieldsAndMessages
        }
    ]
};
const form = {
    view: "form",
    id: "form",
    width: 300,
    paddingX: 20,
    elements: [{
            template: "Edit films",
            type: "section"
        },
        {
            view: "text",
            label: "Title",
            name: "title",
            invalidMessage: "Cannot be empty"
        },
        {
            view: "text",
            label: "Year",
            name: "year",
            invalidMessage: "Year between 1970 and 2020"
        },
        {
            view: "text",
            label: "Rating",
            name: "rating",
            invalidMessage: "Cannot be empty or 0"
        },
        {
            view: "text",
            label: "Votes",
            name: "votes",
            invalidMessage: "Cannot be less than 100000"
        },
        formButtons,
        {}
    ],
    rules: {
        title: webix.rules.isNotEmpty,
        year: function (value) {
            return value >= 1970 && value <= currentYear;
        },
        votes: function (value) {
            return value < 100000;
        },
        rating: function (value) {
            return webix.rules.isNotEmpty(value) && value !== "0";
        }
    }
};
const footer = {
    template: "The software is provided by <a href='https://webix.com/'>https://webix.com/</a>. All rights reserved (c)",
    height: 38,
    css: "footer"
};
const resizer = {
    view: "resizer"
};
const main = {
    animate: false,
    cells: [{
            id: "Dashboard",
            cols: [datatable, form]
        },
        {
            id: "Users",
            template: "Users View"
        },
        {
            id: "Products",
            template: "Products view"
        },
        {
            id: "Locations",
            template: "Admin view"
        }
    ]
};

webix.ready(function () {
    webix.ui({
        view: "popup",
        id: "popupmenu",

        body: {
            view: "list",
            scroll: false,
            position: "right",
            height: 70,
            data: ["Settings", "Log Out"]
        }
    });
    webix.ui({
        rows: [
            toolbar,
            {
                cols: [sideMenu, resizer, main]
            },
            footer
        ]
    });
    $$("list").select("Dashboard");
});