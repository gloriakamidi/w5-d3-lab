const mongoose = require("mongoose");
// mongoose.set('useFindAndModify', false);
const Booklist = mongoose.model("Booklist");

//gets a posting book's info via request.body object
//Then it uses Mongoose to save the inventory object to database.
exports.createBooklist = (req, res) => {
  const booklist = new Booklist({
    title: req.body.title,
    author: req.body.author,
  
  });

  //Save a Book in the MongoDB
  booklist
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fail!",
        error: err.message,
      });
    });
};
exports.getBooklist = (req, res) => {
  Booklist.findById(req.params.id)
    .select("-__v")
    .then((booklist) => {
      res.status(200).json(booklist);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Book  not found with id" + req.params.id,
          error: err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Book with id" + req.params.id,
        error: err,
      });
    });
};

exports.booklist = (req, res) => {
  Booklist.find()
    .select("-__v")
    .then(booklistInfos => {
      res.status(200).json(booklistInfos);
    })
    .catch((error) => {
      //log on console
      console.log(error);

      res.status(500).json({
        message: "Error!",
        error: error,
      });
    });
};

exports.deleteBooklist = (req, res) => {
  Booklist.findByIdAndRemove(req.params.id)
    .select("-__v-_id")
    .then((booklist) => {
      if (!booklist) {
        res.status(404).json({
          message: "No Book found with id = " + req.params.id,
          error: "404",
        });
      }
      res.status(200).json({});
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error -> Can't delete book with id = " + req.params.id,
        error: err.message,
      });
    });
};

exports.updateBooklist = (req, res) => {
  //Find book and update it
  Booklist.findByIdAndUpdate(
    req.body._id,
    {
      title: req.body.title,
      author: req.body.author,
    },
    { new: false }
  )
    .select("-__v")
    .then((booklist) => {
      if (!booklist) {
        return res.status(404).send({
          message:
            "Error -> Can't update an book with id = " + req.params.id,
          error: "Not Found!",
        });
      }
      res.status(200).json(booklist);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          "Error -> Can't update a Book with id = " + req.params.id,
        error: err.message,
      });
    });
};
