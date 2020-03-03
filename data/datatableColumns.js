const datatableColumns = [{
        id: "id",
        header: "",
        width: 50,
        css: "table-header"
    },
    {
        id: "title",
        header: [
            "Film Title", {
                content: "textFilter"
            }
        ],
        fillspace: true,
        sort: "string"
    },
    {
        id: "categoryId",
        header: ["Category", {
            content: "selectFilter"
        }],
        editor: "select",
        options: "data/categories.js"
    },
    {
        id: "rating",
        header: [
            "Rating", {
                content: "textFilter"
            }
        ]
    },
    {
        id: "votes",
        header: [
            "Votes", {
                content: "numberFilter"
            }
        ],
        sort: "int"
    },
    {
        id: "year",
        header: "Year",
        sort: "int"
    },
    {
        id: "delete",
        header: "",
        template: "{common.trashIcon()}"

    }
];