webix.protoUI({
    name: "mybutton",
    $cssName: "button three_state",
    $init: function (config) {
        var state = config.state || 0;
        config.value = config.states[state];
        webix.html.addCss(this.$view, "webix_state_" + state);

        this.attachEvent("onItemClick", this.changeState);
    },
    changeState: function () {
        var state = this.config.state;
        webix.html.removeCss(this.$view, "webix_state_" + (state));

        state++;
        if (state > 2) state = 0;
        this.config.state = state;
        this.config.label = this.config.states[state]
        this.refresh();

        webix.html.addCss(this.$view, "webix_state_" + (state));
        this.callEvent("onStateChange", [state]);
    }
}, webix.ui.button);

webix.ui({
    rows: [{
            cols: [{
                    view: "label",
                    label: "Sort list: ",
                    width: 100
                },
                {
                    view: "mybutton",
                    width: 100,
                    state: 0,
                    states: {
                        0: "Off",
                        1: "Sort Asc",
                        2: "Sort Desc"
                    },
                    on: {
                        onStateChange: function (state) {
                            var data = $$("data");
                            if (state == 0)
                                data.sort("id", "asc"); //there's no unsort, so sort by some index column
                            else if (state == "1")
                                data.sort("title", "asc");
                            else
                                data.sort("title", "desc");
                        }
                    }
                }
            ]
        },
        {
            view: "list",
            id: "data",
            xCount: 3,
            type: {
                height: 60,
            },
            template: "<b>#id#. #title#</b><br> Year: #year#, rank: #rank#",
            data: grid_data
        }
    ]
});