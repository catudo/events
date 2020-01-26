/**
 * Created by shontauro on 6/5/17.
 */
'use strict';

var _ = require('underscore');
const ApiErrors = require('../api-errors/index');
const checkForObjecIdHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

//Paginate
exports.paginate = function paginate(page, limit) {
    if (page === 1) {
        page = 0;
    } else {
        page = page * limit;
        page = page - limit;
    }
    return page;
};


exports.handlerMongoErrors = function (error, res, next) {
    if (error.name === 'MongoError') {

        if (error.code === 11000) {
            var apiError = new ApiErrors.ValidationError(error.errmsg || 'There was a duplicate key error', 409);
            next(apiError);
        } else {
            next(error)
        }
    } else if (error.name === "ValidationError") {
        next(new ApiErrors.ValidationError(error.message));
    } else {
        next();
    }
};

exports.isValidObjectId = function (req, res, next) {

    if (req.params.employee_id && !req.params.employee_id.match(checkForObjecIdHexRegExp)) {
        return createBadRequest("Bad Request - employee_id is not valid", res);
    }

    if (req.params.id && !req.params.id.match(checkForObjecIdHexRegExp)) {
        return createBadRequest("Bad Request - id is not valid", res);
    }

    if (req.params.turn_id && !req.params.turn_id.match(checkForObjecIdHexRegExp)) {
        return createBadRequest("Bad Request - turn_id is not valid", res);
    }

    if (req.params.user_id && !req.params.user_id.match(checkForObjecIdHexRegExp)) {
        return createBadRequest("Bad Request - user_id is not valid", res);
    }

    if (req.params.business_id && !req.params.business_id.match(checkForObjecIdHexRegExp)) {
        return createBadRequest("Bad Request - business_id is not valid", res);
    }

    if (req.params.jti && !req.params.jti.match(checkForObjecIdHexRegExp)) {
        return createBadRequest("Bad Request - jti is not valid", res);
    }

    if (req.params.variant_id && !req.params.variant_id.match(checkForObjecIdHexRegExp)) {
        return createBadRequest("Bad Request - variant_id is not valid", res);
    }

    if (req.params.product_id && !req.params.product_id.match(checkForObjecIdHexRegExp)) {
        return createBadRequest("Bad Request - product_id is not valid", res);
    }

    if (req.query.product_id && !req.query.product_id.match(checkForObjecIdHexRegExp)) {
        return createBadRequest("Bad Request - product_id is not valid", res);
    }

    next();
};

//Bad Request to Bad URI
function createBadRequest(message, res) {

    var responseError = {};
    responseError.statusCode = 400;
    responseError.validationErrors = [{
        keyword: "ValidationError",
        message: message
    }];

    return res.status(400).json(responseError);

}