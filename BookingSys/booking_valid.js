const validators    = {
    validate_create_user_req        : (params) => {
        if(params.username === undefined || params.password === undefined)                                  { return false; }
        else                                                                                                { return true;  }
    },

    validate_get_user_data          : (params) => {
        if(params.id === undefined) { return false; }
        else                        { return true;  }
    },

    validate_delete_user            : (params) => {
        if(params.id === undefined) { return false; }
        else                        { return true;  }
    },

    validate_update_user            : (params) => {
        if(params.username === undefined || params.password === undefined || params.id === undefined)       { return false; }
        else                                                                                                { return true;  }
    },

    validate_create_rtable_req      : (params) => {
        let isValid     = false;
        isValid         = params.name !== undefined && params.seats !== undefined;
        if(!isValid)    return false;
        params.seats    = parseInt(params.seats);
        isValid         = !isNaN(params.seats);
        return isValid;
    },

    validate_get_rtable_data        : (params) => {
        if(params.id === undefined) { return false; }
        else                        { return true;  }
    },

    validate_delete_rtable          : (params) => {
        if(params.id === undefined) { return false; }
        else                        { return true;  }
    },

    validate_update_rtable          : (params) => {
        let isValid     = false;
        isValid         = params.name !== undefined && params.seats !== undefined && params.id !== undefined;
        if(!isValid)    return false;
        params.seats    = parseInt(params.seats);
        isValid         = !isNaN(params.seats);
        return isValid;
    },

    validate_create_product_req     : (params) => {
        let isValid     = false;
        isValid         = params.name !== undefined && params.price !== undefined;
        if(!isValid)    return false;
        params.price    = parseFloat(params.price);
        isValid         = !isNaN(params.price);
        return isValid;
    },

    validate_get_product_data       : (params) => {
        if(params.id === undefined) { return false; }
        else                        { return true;  }
    },

    validate_delete_product         : (params) => {
        if(params.id === undefined) { return false; }
        else                        { return true;  }
    },

    validate_update_product         : (params) => {
        let isValid     = false;
        isValid         = params.name !== undefined && params.price !== undefined && params.id !== undefined;
        if(!isValid)    return false;
        params.price    = parseFloat(params.price);
        isValid         = !isNaN(params.price);
        return isValid;
    },

    validate_create_reserve_req     : (params) => {
        let isValid         = false;
        isValid             = params.p_id !== undefined && params.rt_id !== undefined && params.start_time !== undefined && params.end_time !== undefined;
        if(!isValid)        return false;
        params.start_time   = Date.parse(params.start_time);
        params.end_time     = Date.parse(params.end_time);
        if(isNaN(params.start_time) || isNaN(params.end_time)) { return false };
        return true;
    },

    validate_get_reserve            : (params) => {
        return !isNaN(parseInt(params.id)) 
    },

    validate_delete_reserve         : (params) => {
        if(params.id === undefined) { return false; }
        else                        { return true;  }
    },

    validate_get_reserve_by_date    : (params) => {
        return validators.validate_date(params);
    },

    validate_get_free_reserves_day  : (params) => {
        return validators.validate_date(params);
    },

    validate_date                   : (params) => {
        let dat     = params.date.split("-");
        let isValid = false;
        if(dat.length !== 3) {isValid = false; return isValid; }
        if(dat[0].length !== 4 || dat[1].length !== 2 || dat[2].length !== 2) {
            isValid = false; return isValid;
        }
        dat[0]      = parseInt(dat[0]);
        dat[1]      = parseInt(dat[1]);
        dat[2]      = parseInt(dat[2]);
        if(isNaN(dat[0]) || isNaN(dat[1]) || isNaN(dat[2])){
            isValid = false; return isValid;
        }
        let testDat = Date.parse(params.date);
        if(!isNaN(testDat)) { isValid = true; return isValid; }
        return isValid;
    },

    validate_put_orders             : (params) => {
        if(params.id === undefined || params.orders === undefined){
            console.log("first");
            return false;
        }
        if(typeof(params.orders) !== "string" || params.orders instanceof String){
            console.log("Second");
            return false;
        }
        if(isNaN(parseInt(params.id))) { console.log("third"); return false; }
        return true;
    }
};

module.exports      = validators;