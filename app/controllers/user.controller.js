const userService = require('../services/user.service');

function init(router) {
    router.route('/user')
        .get(getAllUsers)
        .post(addUser);
    router.route('/user/:id')
        .get(getUserById)
        .delete(deleteUser)
        .put(updateUser);
}

function getAllUsers(req,res) {
  userService.getAllUser().then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function getUserById(req,res) {

  let userId = req.params;
  userService.getUserById(userId).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function addUser(req,res) {
  var userData=req.body;

  userService.addUser(userData).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

}


function updateUser(req,res) {
   var userData=req.body;
   var id = req.params.id;
   userService.updateUser(id,userData).then((data)=>{
      res.json(data);
  }).catch((err)=>{
      res.json(err);
   });
}


function deleteUser(req,res) {
  var delId = req.params.id;
  userService.deleteUser(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
}


module.exports.init = init;



