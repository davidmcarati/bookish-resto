const express   =   require('express');
const router    =   express.Router();
const users     =   require('./APIHandlers/users_api.js');
const rtable    =   require('./APIHandlers/rtable_api.js');

router.post     ('/user'    , users.post_user);
router.put      ('/user'    , users.put_user);
router.get      ('/user'    , users.get_user);
router.get      ('/user/:id', users.get_user_id);
router.delete   ('/user/:id', users.delete_user);

router.post     ('/rtable'      , rtable.post_rtable);
router.put      ('/rtable'      , rtable.put_rtable);
router.get      ('/rtable'      , rtable.get_rtable);
router.get      ('/rtable/:id'  , rtable.get_rtable_id);
router.delete   ('/rtable/:id'  , rtable.delete_rtable);

module.exports  = router;