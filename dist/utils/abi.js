"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageProbability = exports.modifyCategoryData = exports.getIndex = exports.contract_ABI = void 0;
const tslib_1 = require("tslib");
exports.contract_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Mint",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "string[]",
                "name": "_URI",
                "type": "string[]"
            }
        ],
        "name": "batchMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_tokenId",
                "type": "uint256[]"
            },
            {
                "internalType": "address",
                "name": "taker",
                "type": "address"
            }
        ],
        "name": "batchTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_URI",
                "type": "string"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "onERC721Received",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_URI",
                "type": "string"
            }
        ],
        "name": "setURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const getIndex = (str) => {
    const indexRegex = /\[(\d+)\]/g;
    const matches = str.matchAll(indexRegex);
    return [...matches].map(match => parseInt(match[1]));
};
exports.getIndex = getIndex;
const modifyCategoryData = (fileData, category) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let fileIndex = 0;
    return yield category.map((item, index) => {
        var _a;
        item.file = (_a = item.file) === null || _a === void 0 ? void 0 : _a.map(data => {
            var _a;
            data.image = (_a = fileData[fileIndex]) === null || _a === void 0 ? void 0 : _a.buffer;
            fileIndex++;
            return data;
        });
        return item;
    });
    fileData === null || fileData === void 0 ? void 0 : fileData.forEach(file => {
        var _a;
        const fileIndex = (0, exports.getIndex)(file === null || file === void 0 ? void 0 : file.fieldname);
        category[fileIndex[0]] = Object.assign(Object.assign({}, category[fileIndex[0]]), { file: ((_a = category[fileIndex[0]]) === null || _a === void 0 ? void 0 : _a.file) || [] });
        const currentItem = category[fileIndex[0]];
        const files = (currentItem === null || currentItem === void 0 ? void 0 : currentItem.file) || [];
        files[fileIndex[1]] = Object.assign({ image: file === null || file === void 0 ? void 0 : file.buffer }, (files[fileIndex[1]] || {}));
        category[fileIndex[0]].file = files;
    });
});
exports.modifyCategoryData = modifyCategoryData;
const imageProbability = (category) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let secondArray = [...category];
    return ({
        inputs: yield category.map((items, index) => {
            var _a, _b, _c, _d, _e, _f;
            if (!(items === null || items === void 0 ? void 0 : items.userProbability)) {
                let fileLength = 0;
                let probabilities;
                // if (items?.file?.length > 1) {
                const totalProbability = (_a = items === null || items === void 0 ? void 0 : items.file) === null || _a === void 0 ? void 0 : _a.reduce((total, item, index) => {
                    if (item === null || item === void 0 ? void 0 : item.probability) {
                        fileLength++;
                        return total + parseFloat(item === null || item === void 0 ? void 0 : item.probability);
                    }
                    else {
                        return total;
                    }
                }, 0);
                probabilities = ((_b = items === null || items === void 0 ? void 0 : items.file) === null || _b === void 0 ? void 0 : _b.map((file) => { var _a, _b; return parseFloat((_a = file.probability) !== null && _a !== void 0 ? _a : (100 - totalProbability) / (fileLength || ((_b = items === null || items === void 0 ? void 0 : items.file) === null || _b === void 0 ? void 0 : _b.length))); })) || [];
                // }
                //  else {
                //   probabilities = [parseFloat(items?.file[0]?.probability || items?.file?.probability)]
                //   console.log("🚀 ~ file: abi.ts:624 ~ inputs:awaitcategory.map ~ items?.file[0]?.probability:", items?.file[0]?.probability, items.file?.probability)
                // }
                const maxProbabilityIndex = probabilities.indexOf(Math.max(...probabilities));
                // if (items?.file?.length > 1) {
                let newFiles = (_c = items === null || items === void 0 ? void 0 : items.file) === null || _c === void 0 ? void 0 : _c.filter(file => parseFloat(file === null || file === void 0 ? void 0 : file.probability) !== Math.max(...probabilities));
                secondArray[index] = Object.assign(Object.assign({}, secondArray[index]), { file: newFiles });
                // console.log("🚀 ~ file: abi.ts:631 ~ inputs:awaitcategory.map ~ secondArray[index]:", secondArray[index], secondArray[index].file)
                // }
                items.file = (_d = items.file) === null || _d === void 0 ? void 0 : _d[maxProbabilityIndex];
                return items;
            }
            else {
                const randomIndex = Math.floor(Math.random() * (((_e = items.file) === null || _e === void 0 ? void 0 : _e.length) || 0));
                items.file = (_f = items.file) === null || _f === void 0 ? void 0 : _f[randomIndex];
                return items;
            }
        }),
        secondArray
    });
});
exports.imageProbability = imageProbability;
//# sourceMappingURL=abi.js.map