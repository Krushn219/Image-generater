"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendErrorResponse = exports.SendSuccessResponse = void 0;
const SendSuccessResponse = (res, message, data, status = 200, statusText = "Success") => {
    return res.status(status).json({
        status: true,
        message,
        data: data
    });
};
exports.SendSuccessResponse = SendSuccessResponse;
const SendErrorResponse = (res, message, data, status = 400) => {
    return res.status(status).json({
        status: false,
        message,
        data: data,
    });
};
exports.SendErrorResponse = SendErrorResponse;
//# sourceMappingURL=response.js.map