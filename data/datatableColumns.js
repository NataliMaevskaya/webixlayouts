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
        id: "year",
        header: [
            "Released", {
                content: "numberFilter"
            }
        ],
        sort: "int"
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
        id: "delete",
        header: "",
        template: "{common.trashIcon()}"

    }
];