const db = require("../models");
const formatResult = require("../helpers/formatResult");
const { decodeToken } = require("../helpers/jwtHelper");
const OrderedProduct = db.ordered;
const Product = db.product;
const Trx = db.transaction;
const User = db.user;

exports.input = (req, res) => {
  if (req.body.transactionId) {
    Trx.findOne({ where: { id: req.body.transactionId } }).then((checkTrx) => {
      if (checkTrx) {
        if (checkTrx.dataValues.statusOrder !== "Done") {
          Product.findOne({ where: { id: req.body.productId } })
            .then((result) => {
              if (result) {
                const decode = decodeToken(req);
                req.body.userId = decode.userId;
                OrderedProduct.create(req.body)
                  .then((resultOrder) => {
                    if (result.stock > 0) {
                      Product.update(
                        { stock: result.stock - 1 },
                        { where: { id: result.id } }
                      ).then(() => {
                        formatResult(res, 201, true, "Success Make Order", resultOrder);
                      });
                    } else {
                      formatResult(res, 500, false, "Product Out Of Stock", null);
                    }
                  })
                  .catch((err) => {
                    formatResult(res, 500, false, err, null);
                  });
              } else {
                formatResult(res, 404, false, "Product Not Found", null);
              }
            })
            .catch(() => {
              formatResult(res, 500, false, "Internal Server Error", null);
            });
        } else {
          formatResult(res, 400, false, "Failed Process! Transaction Has Been Done", null);
        }
      } else {
        formatResult(res, 500, false, "Transaction ID Not Found", null);
      }
    });
  } else {
    formatResult(res, 400, false, "You Don't Have Transaction", null);
  }
};
