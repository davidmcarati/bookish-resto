const express   =   require('express');
const router    =   express.Router();
const users     =   require('./APIHandlers/person_api.js');
const rtable    =   require('./APIHandlers/rtable_api.js');
const products  =   require('./APIHandlers/products_api.js');
const reserves  =   require('./APIHandlers/reserve_api.js');
const time      =   require('./APIHandlers/time_api.js');

router.post     ('/user'            , users.post_user);
router.put      ('/user'            , users.put_user);
router.get      ('/user'            , users.get_user);
router.get      ('/user/:id'        , users.get_user_id);
router.delete   ('/user/:id'        , users.delete_user);

router.post     ('/rtable'          , rtable.post_rtable);
router.put      ('/rtable'          , rtable.put_rtable);
router.get      ('/rtable'          , rtable.get_rtable);
router.get      ('/rtable/:id'      , rtable.get_rtable_id);
router.delete   ('/rtable/:id'      , rtable.delete_rtable);

router.post     ('/product'         , products.post_product);
router.put      ('/product'         , products.put_product);
router.get      ('/product'         , products.get_product);
router.get      ('/product/:id'     , products.get_product_id);
router.delete   ('/product/:id'     , products.delete_product);

router.post     ('/reserve'         , reserves.post_reserve);
router.put      ('/reserve'         , reserves.put_reserve_orders);
router.delete   ('/reserve/:id'     , reserves.delete_reserve);
router.get      ('/reserve/:id'     , reserves.get_reserve);
router.options  ('/reserve/:date'   , reserves.view_reserve_by_date)

router.get      ('/time/:date'      , time.get_locked_times_day);    //date == YYYY-MM-DD
module.exports  = router;