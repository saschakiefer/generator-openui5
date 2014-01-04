sap.ui.controller("<%= namespace %>.view.App", {

    /**
     * Navigates to another page
     * @param {string} pageId The id of the next page
     * @param {sap.ui.model.Context} context The data context to be applied to the next page (optional)
     */
    to : function (pageId, context) {
        
        var app = this.getView().app;

        // load page on demand
        var master = ("Master" === pageId);
        if (app.getPage(pageId, master) === null) {
            var page = sap.ui.view({
                id : pageId,
                viewName : "<%= namespace + '.view.'%>" + pageId,
                type : "XML"
            });
            page.getController().nav = this;
            app.addPage(page, master);
            jQuery.sap.log.info("app controller > loaded page: " + pageId);
        }

        // show the page
        app.to(pageId);

        // set data context on the page
        if (context) {
            var page = app.getPage(pageId);
            page.setBindingContext(context);
        }
    },

    /**
     * Navigates back to a previous page
     * @param {string} pageId The id of the next page
     */
    back : function (pageId) {
        this.getView().app.backToPage(pageId);
    }
});