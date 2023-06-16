"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBackground = exports.combineImages = exports.uploadToPinata = void 0;
const tslib_1 = require("tslib");
const axios = require("axios");
// const FormData = require("form-data");
const sharp_1 = tslib_1.__importDefault(require("sharp"));
const Rembg = require("rembg-node").Rembg;
const fs = require("fs");
const path = require('path');
const uploadToPinata = (data) => {
    // const formData = new FormData();
    // var formData = multipart();
    const JWT = `Bearer ${process.env.PINATA_JWT_SECRET}`;
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.PINATA_API_URL}pinning/pinFileToIPFS`,
        headers: Object.assign({ 'Authorization': JWT }, data.getHeaders()),
        data: data
    };
    return axios.request(config)
        .then((response) => response === null || response === void 0 ? void 0 : response.data)
        .catch((error) => {
        console.log(error);
        throw error;
    });
};
exports.uploadToPinata = uploadToPinata;
const combineImages = (images, outputPath) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let imageWidth = 500;
    // let imageHeight: number = Math.ceil(500 / images.length);
    let imageHeight = 400;
    let imageMeasurements = yield Promise.all(images.map((item) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            // const image = await sharp(item, { width: 500, height: 150 });
            const image = yield (0, sharp_1.default)(item);
            const metadata = yield image.metadata();
            let imageBuffer = yield image.resize(imageWidth, imageHeight).toBuffer(); // .resize(600, 400) .toBuffer();
            return { width: metadata.width, height: metadata.height, buffer: imageBuffer };
        }
        catch (error) {
            console.error(error);
            return null;
        }
    })));
    // let imageWidth: number = Math.ceil(Math.max(...imageMeasurements.map(image => image?.width))) + 300
    // let imageHeight: number = Math.ceil(Math.max(...imageMeasurements.map(image => image?.height)))
    let compositeArray = [];
    yield Promise.all(imageMeasurements.map((element, i) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // let imageBuffer = await sharp(element?.buffer)
        //     .resize(imageWidth, imageHeight)
        //     .toBuffer();
        let input = (0, sharp_1.default)(element === null || element === void 0 ? void 0 : element.buffer);
        const image = yield (0, sharp_1.default)(element === null || element === void 0 ? void 0 : element.buffer)
            .flatten({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .toFile("outputImagePath.png");
        // const rembg = new Rembg({
        //     logging: true,
        // });
        // const output = await rembg.remove(input);
        // let imageRm = await output.webp().toBuffer()
        compositeArray.push({
            input: element === null || element === void 0 ? void 0 : element.buffer,
            gravity: 'north',
            top: i * imageHeight + 50,
            left: 100
        });
    })));
    const compositeBuffer = yield (0, sharp_1.default)({
        create: {
            width: imageWidth + 200,
            // height: imageMeasurements.reduce((sum, item) => sum + item?.height, 0) + 20 * images.length,
            height: imageHeight * images.length + 50 * images.length,
            // height: 500,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })
        .composite(compositeArray)
        .jpeg()
        .toBuffer();
    return yield new Promise((resolve, reject) => {
        fs.writeFile(outputPath, compositeBuffer, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve("output.webp");
            }
        });
    });
});
exports.combineImages = combineImages;
const removeBackground = (formData, outputPath) => {
    // const inputPath = '/path/to/file.jpg';
    // axios({
    //     method: 'post',
    //     url: process.env.BGREMOVE_API_URL,
    //     data: formData,
    //     responseType: 'arraybuffer',
    //     headers: {
    //         ...formData.getHeaders(),
    //         'X-Api-Key': process.env.BGREMOVE_API_KEY
    //     },
    //     encoding: null
    // })
    let config = {
        method: 'post',
        url: process.env.BGREMOVE_API_URL,
        data: formData,
        responseType: 'arraybuffer',
        headers: Object.assign({ 'X-Api-Key': process.env.BGREMOVE_API_KEY }, formData.getHeaders()),
        encoding: null
    };
    return axios.request(config)
        .then((response) => {
        if (response.status != 200)
            return console.error('Error:', response.status, response.statusText);
        fs.writeFileSync(outputPath, response.data);
        return response.data;
    })
        .catch((error) => {
        return console.error('Request failed:', error);
    });
};
exports.removeBackground = removeBackground;
//# sourceMappingURL=imageProcess.js.map