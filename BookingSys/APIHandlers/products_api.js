const valid     =   require('./../booking_valid.js');
const worker    =   require('./../workers/products_worker.js');

const productsRouter = {
    post_product   : async (req, res, next) => {
        let params = {
            name    : req.body.name,
            price   : req.body.price
        };
        let result = await POST_CreateProduct(params);
        if(!result.dataValid){
            res.send({error : "Invalid post data"})
        } else {
            res.send(result);
        }
    },

    put_product    : async (req, res, next) => {
        let params = {
            id          : req.body.id,
            name        : req.body.name,
            price       : req.body.price
        };
        let result = await PUT_UpdateProduct(params);
        if(!result.dataValid){
            res.send({error : "Invalid put data"})
        } else {
            res.send(result);
        }
    },

    get_product    : async (req, res, next) => {
        let result = await GET_GetProducts();
        if(!result.dataValid){
            res.send({error : "Invalid get data"})
        } else {
            res.send(result);
        }
    },

    get_product_id : async (req, res, next) => {
        let params = {
            id : req.params.id
        };
        let result = await GET_GetProduct(params);
        if(!result.dataValid){
            res.send({error : "Invalid get data"})
        } else {
            res.send(result);
        }
    },

    delete_product : async (req, res, next) => {
        let params = {
            id  : req.params.id
        };
        let result = await DELETE_Product(params);
        if(!result.dataValid){
            res.send({error : "Invalid delete data"})
        } else {
            res.send(result);
        }
    }
}

//---------------------vvv-----Handlers Here-----vvv------------------------------

const POST_CreateProduct     = async (params) => {
    let result = {
        dataValid   : false,
        product     : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_create_product_req(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.product      =   await worker.createProduct(params);
    result._status      =   "200 : Ok";
    return result;
};

const PUT_UpdateProduct      = async (params) => {
    let result = {
        dataValid   : false,
        product     : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_update_product(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.product      =   await worker.getProductData(params);
    if(!result.product)     {result._status = "404 : Not Found";    return result;}
    result.product      =   await worker.updateProduct(params);
    result._status      =   "200 : Ok";
    return result;
};

const GET_GetProducts       = async () => {
    let result = {
        dataValid   : true,
        product     : {},
        _status     : ""
    };
    result.product      =   await worker.getProductList();
    result._status      =   "200 : Ok";
    return result;
};

const GET_GetProduct         = async (params) => {
    let result = {
        dataValid   : false,
        product     : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_get_product_data(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.product      =   await worker.getProductData(params);
    if(!result.product)     {result._status = "404 : Not Found";    return result;}
    result._status      =   "200 : Ok";
    return result;
};

const DELETE_Product         = async (params) => {
    let result = {
        dataValid   : false,
        product     : {},
        _status     : ""
    };
    result.dataValid    =   valid.validate_delete_product(params);
    if(!result.dataValid)   {result._status = "400 : Bad Request";  return result;}
    result.product      =   await worker.getProductData(params);
    if(!result.product)     {result._status = "404 : Not Found";    return result;}
    result.product      =   await worker.deleteProduct(params);
    result._status      =   "200 : Ok";
    return result;
};

module.exports = productsRouter;