webix.protoUI({
    name: "threeStateButton",
    $cssName: "threeStateButton",
    defaults: {
        width: 150
    },
    $init: function (config) {
        const state = config.state || 0;
        config.label = config.states[state];

        webix.html.addCss(this.$view, `state-${state}`);
        this.attachEvent("onItemClick", function () {
            let state = this.config.state;
            webix.html.removeCss(this.$view, `state-${state}`);

            this.config.state = state = state >= 2 ? 0 : ++state;
            this.config.label = this.config.states[state];
            this.refresh();

            webix.html.addCss(this.$view, `state-${state}`);
            this.callEvent("onStateChange", [state]);
        });
    }
}, webix.ui.button);