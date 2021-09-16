const express = require('express');
const router = express.Router();
const Login = require('./model/Login');
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');

router.get('/getAll', (req, res) => {
  Login.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Incorrect token");
  } else {
    jwt.verify(token, "secretKey", (err, decoded) => {
      if(err) {
        res.json({ auth: false, message: "U failed to authenticate"})
      } else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}

router.get('/isUserAuthenticated', verifyJWT, (req, res) => {
  res.send("you are authenticated");
})
router.post('/login', (req, res) => {
  Login.findOne({ email: req.body.email }, function (err, result) {
    if (err) {
      res.send(err);
    } else if (result) {
      console.log(result.password, req.body.password, result.password.localeCompare(req.body.password))
      if (!result.password.localeCompare(req.body.password)) {
        console.log(result, 'result')
        // res.send(result) 
        const token = jwt.sign({ id: result.id}, "secretKey", {
          expiresIn: 300
        });
        console.log(result.status, 'result', token, 'token');
        return res.status(200).json({auth: true, token, result: result});
      } else {
        res.status(500).json({
          auth: false,
          error: 'Password Incorrect'
        })
      }
    } else {
      res.status(500).json({
        auth: false,
        error: 'User not found!'
      })
    }
  })
});

router.post('/create', (req, res) => {
  Login.insertMany(req.body.body, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.delete('/delete', (req, res) => {
  console.log(req.params, 'res')
  Login.remove({ _id: mongoose.Types.ObjectId(req.body._id) }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post('/edit', (req, res) => {
  let set = {
    ...req.body
  };
  const query = req.body._id ? { _id: req.body._id } : { email: req.body.email };
  Login.findOneAndUpdate({ ...query }, { $set: set }, function (err, result) {
    if (err) {
      res.send(err);
    } else if (result) {
      res.status(200).json({auth: true, result: result, message: "User data updated"});
      // res.send('Data Updated');
    } else {
      res.status(500).json({
        error: 'Wrong Email!'
      })
    }
  });
});

router.post('/login', (req, res) => {
  jwt.sign();
});

module.exports = router;