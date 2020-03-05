webix.protoUI({
    name: "formControl",
    defaults: {
        cancelAction: function () {
            this.clear();
        },
        saveAction: function () {
            webix.message(JSON.stringify(this.getValues(), null, 2));
        }
    },
    $init: function (config) {
        config.elements = this.generateFormElements(config.fields);
    },
    generateFormElements(fields) {
        var elements = [];
        for (var i = 0; i < fields.length; i++) {
            elements.push({
                view: "text",
                label: fields[i][0].toUpperCase() + fields[i].slice(1),
                name: fields[i]
            });
        }
        elements.push(this.generateButtons());
        return elements;
    },
    generateButtons: function () {
        return {
            cols: [{
                    view: "button",
                    value: "Cancel",
                    click: webix.bind(function () {
                        this.config.cancelAction.call(this);
                    }, this)
                },
                {},
                {
                    view: "button",
                    value: "Save",
                    css: "webix_primary",
                    click: webix.bind(function () {
                        this.config.saveAction.call(this);
                    }, this)
                }
            ]
        }
    },
}, webix.ui.form);

webix.ui({
    rows: [{
        view: "form",
        elements: [{
                view: "formControl",
                fields: ["fname", "lname", "address"],
                saveAction: function () {
                    webix.alert("Custom action");
                }
            },
            {
                view: "formControl",
                fields: ["one", "two"]
            }
        ]
    }]
});