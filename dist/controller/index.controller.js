"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const tslib_1 = require("tslib");
const response_1 = require("../services/response");
const index_repository_1 = require("../repository/index.repository");
class Controller {
    constructor() { }
}
_a = Controller;
// Controller for minting a single nft
Controller.mintSingleNFT = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield index_repository_1.Repository.mintSingleNFT(req.body);
        return (0, response_1.SendSuccessResponse)(res, "Single NFT Minted Successfully!", results, 200);
    }
    catch (err) {
        return (0, response_1.SendErrorResponse)(res, "Something went wrong!", err, 500);
    }
});
// Controller for minting multiple nfts
Controller.mintMultipleNFTs = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield index_repository_1.Repository.mintMultipleNFTs(req.body);
        return (0, response_1.SendSuccessResponse)(res, "Multiple NFTs Minted Successfully!", results, 200);
    }
    catch (err) {
        return (0, response_1.SendErrorResponse)(res, "Something went wrong!", err, 500);
    }
});
// Controller for transfer nfts
Controller.transferNFT = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield index_repository_1.Repository.transferNFT(req.body);
        return (0, response_1.SendSuccessResponse)(res, "NFT Transferred Successfully!", results, 200);
    }
    catch (err) {
        return (0, response_1.SendErrorResponse)(res, "Something went wrong!", err, 500);
    }
});
// Controller for checking owner of nft
Controller.ownerOfNFT = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield index_repository_1.Repository.ownerOfNFT(req.body);
        return (0, response_1.SendSuccessResponse)(res, "Owner of NFT fetched Successfully!", results, 200);
    }
    catch (err) {
        return (0, response_1.SendErrorResponse)(res, "Something went wrong!", err, 500);
    }
});
// Controller for checking owner of nft
Controller.imageGenerate = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield index_repository_1.Repository.imageGenerate(req.body, req === null || req === void 0 ? void 0 : req.files);
        // let results = [{
        //     image_url: "https://gateway.pinata.cloud/ipfs/QmZt4PZyCaqyLfcKhziQGsm6nYJUcFY4kh8C3yrj9c5F9t"
        // }]
        res.render("images", { results });
        // return SendSuccessResponse(res, "Ipfs image url created Successfully!", results, 200);
    }
    catch (err) {
        console.log(err);
        return (0, response_1.SendErrorResponse)(res, "Something went wrong!", err, 500);
    }
});
exports.Controller = Controller;
//# sourceMappingURL=index.controller.js.map