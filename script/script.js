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
    on: {
        onAfterSelect: function (id) {
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
const clearFields = function () {
    const formId = $$("form"),
        datatableId = $$("datatable");

    formId.clear();
    formId.clearValidation();
    datatableId.unselectAll();
};
const clearFieldsAndMessages = function () {
    webix.confirm({
        text: "Form will be cleared! Continue?"
    }).then(() => {
        clearFields();
    });
};
const addOrUpdateItem = function () {
    const formId = $$("form"),
        datatableId = $$("datatable");
    formId.clearValidation();
    if (formId.validate()) {

        const itemData = formId.getValues(),
            itemId = itemData.id;
        if (itemId) {
            datatableId.updateItem(itemId, itemData);
            clearFields();
            webix.message({
                text: "Data is updated successfully!",
                type: "success"
            });
        } else {
            datatableId.add(itemData);
            clearFields();
            webix.message({
                text: "Data is added successfully!",
                type: "success"
            });
        }
    } else {
        webix.message({
            text: "Wrong data in form! Check please!",
            type: "warning"
        });
    }
};


const formButtons = {
    cols: [{
            view: "button",
            id: "addBtn",
            value: "Add new",
            css: "webix_primary",
            click: addOrUpdateItem
        },
        {
            width: 10
        },
        {
            view: "button",
            id: "clearBtn",
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
            invalidMessage: "Field cannot be empty or 0."
        },
        {
            view: "text",
            label: "Votes",
            name: "votes",
            invalidMessage: "Cannot be more than 100000"
        },
        formButtons,
        {}
    ],
    rules: {
        title: webix.rules.isNotEmpty,
        year: function (value) {
            return value >= 1970 && value <= currentYear && webix.rules.isNumber(value);
        },
        votes: function (value) {
            return value <= 100000 && webix.rules.isNumber(value);
        },
        rating: function (value) {
            return webix.rules.isNotEmpty(value) && value !== "0";
        }
    }
};


const valuesToForm = function (id) {
    const selectedItemValues = $$("datatable").getItem(id);
    $$("form").setValues(selectedItemValues);
};


const datatable = {
    view: "datatable",
    id: "datatable",
    scroll: "y",
    select: true,
    url: "../data/data.js",
    hover: "hover-style",
    columns: [
        {
            id:"id",
            header: "",
            width: 50,
            css: "table-header"
        },
        {
            id: "title",
            header: "Film Title",
            fillspace: true
        },
        {
            id: "year",
            header: "Released",
        },
        {
            id: "votes",
            header: "Votes"
        },
        {
            id: "delete",
            header: "",
            template: "{common.trashIcon()}"

        }
    ],
    onClick: {
        "wxi-trash": function (e, id) {
            this.remove(id);
            if ($$("form").getValues()) {
                clearFields();
            }
            return false;
        }
    },
    on: {
        onAfterSelect: function (id) {
            valuesToForm(id);
            $$("form").clearValidation();
        }
    },
    scheme: {
        $init: function (obj) {
            let votes = obj.votes;
            if (votes.includes(",")) {
                obj.votes = parseFloat(votes.replace(",", ".")) * 1000;
            }
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
            id: "dashboard",
            cols: [datatable, form]
        },
        {
            id: "users",
            template: "Users View"
        },
        {
            id: "products",
            template: "Products view"
        },
        {
            id: "locations",
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
    $$("list").select("dashboard");
});