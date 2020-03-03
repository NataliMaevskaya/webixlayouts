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

// clearing fields, validation, selection of all items
const clearFields = function () {
    const formId = $$("form"),
        datatableId = $$("datatable");

    formId.clear();
    formId.clearValidation();
    datatableId.unselectAll();
};

// confirmation for clearing all fieldes of form is required
const clearFieldsAndMessages = function () {
    webix.confirm({
        text: "Form will be cleared! Continue?"
    }).then(() => {
        clearFields();
    });
};

const saveForm = function () {
    const form = $$('form');
    if (form.isDirty()) {
        if (!form.validate())
            return false;
        form.save();
    }
};
const formButtons = {
    cols: [{
            view: "button",
            id: "addBtn",
            value: "Add new",
            css: "webix_primary",
            click: saveForm
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

const datatable = {
    rows: [{
            view: "tabbar",
            id: "tabbar",
            options: [{
                    id: "all",
                    value: "All"
                },
                {
                    id: "old",
                    value: "Old"
                },
                {
                    id: "modern",
                    value: "Modern"
                },
                {
                    id: "new",
                    value: "New"
                }
            ],
            on: {
                onChange: function () {
                    $$("datatable").filterByAll();
                }
            }
        },
        {
            view: "datatable",
            id: "datatable",
            scroll: "y",
            select: true,
            url: "../data/data.js",
            hover: "hover-style",
            sort: "multi",
            columns: datatableColumns,
            onClick: {
                "wxi-trash": function (e, id) {
                    this.remove(id);
                    const values = $$("form").getValues();
                    if (id.row === values.id) {
                        clearFields();
                    }
                    return false;
                }
            },
            scheme: {
                $init: function (obj) {
                    let votes = obj.votes;
                    if (votes.includes(",")) {
                        obj.votes = parseFloat(votes.replace(",", ".")) * 1000;
                    }
                    obj.categoryId = randomInteger(1, 4);
                }
            }
        }
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

// enabling list editing name field
webix.protoUI({
    name: "editlist",
}, webix.EditAbility, webix.ui.list);

const usersList = {
    view: "editlist",
    id: "usersList",
    template: "#name# from #country# <span class='webix_icon wxi-close btn-right '></span>",
    select: "cell",
    editable: true,
    editor: "text",
    editValue: "name",
    url: "../data/dataUsers.js",
    on: {
        onValidationError: function (key, obj) {
            const text = "Name cannot be empty!!! ";
            obj.name = text;
        },
        onClick: {
            "wxi-close": function (e, id) {
                this.remove(id);
                return false;
            }
        }
    },
    scheme: {
        $change: function (item) {
            if (item.age < 26) {
                item.$css = {
                    "background-color": "#fdfe89"
                };
            }
        }
    },
    rules: {
        name: webix.rules.isNotEmpty
    }
};

const randomInteger = function (min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
};

const usersSortFilter = {
    padding: 10,
    cols: [{
            view: "text",
            id: "filterUsersList",
            on: {
                onTimedKeypress: function () {
                    const filterText = this.getValue().toLowerCase(),
                        usersList = $$("usersList");

                    usersList.filter(function (obj) {
                        return obj.name.toLowerCase().indexOf(filterText) !== -1 || obj.country.toLowerCase().indexOf(filterText) !== -1;
                    });
                }
            }
        },
        {
            view: "button",
            id: "sortAscBtn",
            value: "Sort asc",
            width: 150,
            css: "webix_primary",
            on: {
                onItemClick: function () {
                    const usersList = $$("usersList");
                    usersList.sort("#name#", "asc", "string");
                }
            }
        },
        {
            view: "button",
            id: "sortDescBtn",
            value: "Sort desc",
            width: 150,
            css: "webix_primary",
            on: {
                onItemClick: function () {
                    const usersList = $$("usersList");
                    usersList.sort("#name#", "desc", "string");
                }
            }
        },
        {
            view: "button",
            id: "addUserBtn",
            value: "Add new",
            width: 150,
            css: "webix_primary",
            on: {
                onItemClick: function () {

                    const age = randomInteger(1, 90);
                    const country = countryList[randomInteger(1, Object.keys(countryList).length)];
                    const userName = nameList[randomInteger(1, Object.keys(nameList).length)];
                    console.log(typeof (age));
                    console.log(typeof (country));
                    console.log(typeof (userName));
                    $$("usersList").add({
                        name: userName,
                        country: country,
                        age: age
                    });
                }
            }
        }
    ],


};

const usersChart = {
    view: "chart",
    id: "usersChart",
    type: "bar",
    value: "#name#",
    barWidth: 35,
    xAxis: {
        template: "#country#",
        title: "Country"
    },
    yAxis: {}
};

const treetable = {
    view: "treetable",
    id: "treetable",
    scroll: "y",
    select: "cell",
    editable: true,
    columns: [{
            id: "id",
            header: "",
            width: 80
        },
        {
            id: "title",
            name:"title",
            header: "Title",
            fillspace: 2,
            editor: "text",
            template: "{common.treetable()} #title#"
        },
        {
            id: "price",
            name: "price",
            header: "Price",
            editor: "text",
            fillspace: 2,
        }
    ],
    url: "../data/dataProducts.js",
    on: {
        onAfterLoad: function () {
            this.openAll();
        }
    },
    rules: {
        title: webix.rules.isNotEmpty,
        price: function(value) {
            return value > 0 && webix.rules.isNotEmpty(value);
        }
    }
};

const main = {
    animate: false,
    cells: [{
            id: "dashboard",
            cols: [datatable, form]
        },
        {
            id: "users",
            rows: [usersSortFilter, usersList, usersChart]
        },
        {
            id: "products",
            rows: [treetable]
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

    // binding a form to datatable
    $$("form").bind($$("datatable"));

    //simultaneously filtering by tab and header
    $$("datatable").registerFilter(
        $$("tabbar"), {
            columnId: "year",
            compare: function (value, filter) {
                switch (filter) {
                    case "all":
                        return value;
                    case "old":
                        return value < 2000;
                    case "modern":
                        return value >= 2000 && value < 2010;
                    case "new":
                        return value >= 2010;
                }
            }
        }, {
            getValue: function (view) {
                return view.getValue();
            },
            setValue: function (view, value) {
                view.setValue(value);
            }
        }
    );

    // syncing chart data to list data, grouping chart data by country
    $$("usersChart").sync($$("usersList"), function () {
        this.group({
            by: "country",
            map: {
                name: ["country", "count"]
            }
        });
    });
});