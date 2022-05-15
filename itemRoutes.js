const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const items = require("./itemModel");

router.post("/add", (req, res) => {

  try {
    console.log(req.body);
    const newItem = new items({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      date: req.body.date,
      isdeleted: "false",
      comments: "",
    });

    newItem
      .save()
      .then((result) => {
        res.statusCode = 200;
        res.send({ message: "item added", success: true });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send({ message: "Item addition failed!" });
      });
  } catch (err) {
    res.statusCode = 500;
    res.send({ message: "Something went wrong!" });
  }
});

router.get("/", (req, res) => {
  items
    .find()
    .exec()
    .then((result) => {
      try {
        if (!result || result.length === 0) {
          res.statusCode = 404;
          res.send({ message: "Items not found!" });
        } else {
          res.statusCode = 200;
          res.send({
            message: "Items retrieved",
            success: true,
            items: result,
          });
        }
      } catch (err) {
        res.statusCode = 500;
        res.send({ message: "Items retrival failed!" });
      }
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send({ message: "Something went wrong!" });
    });
});

router.get("/:id", (req, res) => {
  items
    .find({ _id: req.params.id })
    .exec()
    .then((result) => {
      try {
        if (!result || result.length === 0) {
          res.statusCode = 404;
          res.send({ message: "Item not found!" });
        } else {
          res.statusCode = 200;
          res.send({ success: true, item: result[0] });
        }
      } catch (err) {
        res.statusCode = 500;
        res.send({ message: "Item retrival failed!" });
      }
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send({ message: "Something went wrong!" });
    });
});

router.put("/update/:id", (req, res) => {
  try {
    const name = req.body.name;
    const qty = req.body.qty;
    const _id = req.params.id;
    const price = req.body.price;
    const date = req.body.date;
    
    const updatedItem = {
      _id,
      name,
      qty,
      price,
      date
    };

    items.findByIdAndUpdate(_id, updatedItem, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.send({ message: "Item update failed!" });
      } else {
        res.statusCode = 200;
        res.send({ message: "Item updated", success: true });
      }
    });
  } catch (err) {
    res.statusCode = 500;
    res.send({ message: "Something went wrong!" });
  }
});

router.put("/delete/:id", (req, res) => {
  try {
    const _id = req.params.id;

    const updatedItem = {
      _id,
      isdeleted: "true",
      comments: req.body.comments
    };
    
    items.findByIdAndUpdate(_id, updatedItem, (err, item) => {
      if (err) {
        res.statusCode = 500;
        res.send({ message: "Item deletion failed!" });
      } else {
        res.statusCode = 200;
        res.send({ message: "Item deleted", success: true });
      }
    });
  } catch (err) {
    res.statusCode = 500;
    res.send({ message: "Something went wrong!" });
  }
});

router.put("/undelete/:id", (req, res) => {
  try {
    const _id = req.params.id;

    const updatedItem = {
      _id,
      isdeleted: "false",
      comments: ""
    };
    
    items.findByIdAndUpdate(_id, updatedItem, (err, item) => {
      if (err) {
        res.statusCode = 500;
        res.send({ message: "Item undeletion failed!" });
      } else {
        res.statusCode = 200;
        res.send({ message: "Item undeleted", success: true });
      }
    });
  } catch (err) {
    res.statusCode = 500;
    res.send({ message: "Something went wrong!" });
  }
});

module.exports = router;