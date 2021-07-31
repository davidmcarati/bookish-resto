const validators    = {
    validate_create_user_req    : (params) => {
        if(params.username === undefined || params.password === undefined)                                  { return false; }
        else                                                                                                { return true;  }
    },

    validate_get_user_data      : (params) => {
        if(params.id === undefined) { return false; }
        else                        { return true;  }
    },

    validate_delete_user        : (params) => {
        if(params.id === undefined) { return false; }
        else                        { return true;  }
    },

    validate_update_user        : (params) => {
        if(params.username === undefined || params.password === undefined || params.id === undefined)       { return false; }
        else                                                                                                { return true;  }
    },

    validate_create_rtable_req  : (params) => {
        let isValid     = false;
        isValid         = params.name !== undefined && params.seats !== undefined;
        if(!isValid)    return false;
        params.seats    = parseInt(params.seats);
        isValid         = params.seats !== NaN;
        return isValid;
    },

    validate_get_rtable_data    : (params) => {
        if(params.id === undefined) { return false; }
        else                        { return true;  }
    },

    validate_delete_rtable      : (params) => {
        if(params.id === undefined) { return false; }
        else                        { return true;  }
    },

    validate_update_rtable      : (params) => {
        let isValid     = false;
        isValid         = params.name !== undefined && params.seats !== undefined && params.id !== undefined;
        if(!isValid)    return false;
        params.seats    = parseInt(params.seats);
        isValid         = params.seats !== NaN;
        return isValid;
    }
};

module.exports      = validators;