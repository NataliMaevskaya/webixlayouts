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
            type: "icon",
            icon: "wxi-user",
            label: "Profile",
            width: 90,
            css: "webix_transparent"
        }
    ]
};
const menuList = {
    view: "list",
    id: "list",
    template: "#title#",
    scroll: false,
    css: "webix_layout_clean",
    data: menuListSet
};
const menuLink = {
    template: "<span class='webix_icon wxi-check'></span> Connected",
    height: 30,
    type: "clean",
    css: "span-green"
};
const menu = {
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
    autoConfig: true,
    scroll: "y",
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
    ],
    data: smallFilmSet
};
const formButtons = {
    autoConfig: true,
    cols: [{
            view: "button",
            value: "Add new",
            css: "webix_primary"
        },
        {
            width: 10
        },
        {
            view: "button",
            value: "Clear",

        }
    ]
};
const form = {
    view: "form",
    width: 300,
    paddingX: 20,
    elements: [{
            template: "Edit films",
            type: "section"
        },
        {
            view: "text",
            label: "Title"
        },
        {
            view: "text",
            label: "Year"
        },
        {
            view: "text",
            label: "Rating"
        },
        {
            view: "text",
            label: "Votes"
        },
        formButtons,
        {}
    ]
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
    cols: [
        menu,
        resizer,
        datatable,
        form
    ]
};

webix.ready(function () {
    webix.ui({
        rows: [
            toolbar,
            main,
            footer
        ]
    });
});