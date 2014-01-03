jQuery.sap.declare("<%= namespace + '.util.Formatter' %>");

jQuery.sap.require("sap.ui.core.format.DateFormat");

<%= namespace %>.util.Formatter = {
        
    _statusStateMap: {
        "Neu": "Warning",
        "Initial": "Success"
    },
        
    statusState:  function (value) {
        var map = <%= namespace %>.util.Formatter._statusStateMap;
        return (value && map[value]) ? map[value] : "None";
    },
        
    date: function (value) {
        if (value) {
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"}); 
            return oDateFormat.format(new Date(value));
        } else {
            return value;
        }
    },

    quantity :  function (value) {
        try {
            return (value) ? parseFloat(value).toFixed(0) : value;
        } catch (err) {
            return "Not-A-Number";
        }
    }
};