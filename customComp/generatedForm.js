webix.protoUI({
    name: "generatedForm",
    defaults: {
        autoheight: true
    },
    $init: function (config) {
        const cancelAction = config.cancelAction || function () {
            webix.message("Cancel");
        };
        const saveAction = config.saveAction || function () {
            webix.message("Save");
        };
        const generatedElements = config.fields.map(function (field) {
            return {
                view: "text",
                label: field[0].toUpperCase() + field.slice(1),
                // name: field,
                // rules: {
                //     field: webix.rules.isNotEmpty
                // }
            };
        });
        config.elements = [{
                rows: generatedElements
            },
            {
                cols: [{
                        view: "button",
                        value: "Cancel",
                        width: 150,
                        click: cancelAction
                    },
                    {
                        width: 20
                    },
                    {
                        view: "button",
                        value: "Save",
                        width: 150,
                        css: "webix_primary",
                        click: saveAction
                    }
                ]
            }
        ];
    },
}, webix.ui.form);