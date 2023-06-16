"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const tslib_1 = require("tslib");
const web3_1 = tslib_1.__importDefault(require("web3"));
const interfaces_1 = require("../interfaces");
const abi_1 = require("../utils/abi");
const imageProcess_1 = require("../services/imageProcess");
const validation_1 = require("../validation");
const fs = require("fs");
const FormData = require('form-data');
const path = require('path');
class Repository {
    constructor() { }
}
_a = Repository;
Repository.mintSingleNFT = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let transactionID = "";
        let blockchain = "";
        let tokenId = "";
        // Conditions to check on which blockchain we need to mint the nft
        if (data.blockchain === interfaces_1.BlockchainType.Ethereum) {
            // Creating an instance of provider for contract interaction
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.ETHEREUM_RPC_URL));
            // Get the private key from env file and add to provider
            const privateKey = `0x${process.env.ETHEREUM_CONTRACT_OWNER_PRIVATE_KEY}`;
            const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
            web3.eth.accounts.wallet.add(privateKey);
            const myAccount1 = web3.eth.accounts.privateKeyToAccount(`0x${process.env.ETHEREUM_WALLET_PRIVATE_KEY}`);
            // Creating an instance of contract using contract addresss and ABI
            const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.ETHEREUM_CONTRACT_ADDRESS);
            // Get block for generating the gas limit
            const block = yield web3.eth.getBlock("latest");
            const gasLimit = Math.round(block.gasLimit / block.transactions.length);
            // Calling the mint method of the contract and passing the transfer_to from payload 
            // and the metadata url from payload
            const resp = yield myContract.methods.mint(myAccount1.address, data.metadata_url).send({ from: myAccount.address, gas: gasLimit });
            if (resp) {
                const resp1 = yield web3.eth.getTransactionReceipt(resp.transactionHash);
                const eventAbi = abi_1.contract_ABI.find((abi) => abi.name === 'Mint');
                const mintEvent = resp1.logs.find((log) => log.topics[0] === eventAbi.signature);
                const decodedData = web3.eth.abi.decodeLog(eventAbi.inputs, mintEvent.data, mintEvent.topics.slice(1));
                // Set the transaction ID for response
                transactionID = resp.transactionHash;
                blockchain = interfaces_1.BlockchainType.Ethereum;
                tokenId = decodedData.tokenId;
            }
        }
        else if (data.blockchain === interfaces_1.BlockchainType.Binance) {
            // Creating an instance of provider for contract interaction
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.BINANCE_RPC_URL));
            // Get the private key from env file and add to provider
            const privateKey = `0x${process.env.BINANCE_CONTRACT_OWNER_PRIVATE_KEY}`;
            const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
            web3.eth.accounts.wallet.add(privateKey);
            const myAccount1 = web3.eth.accounts.privateKeyToAccount(`0x${process.env.BINANCE_WALLET_PRIVATE_KEY}`);
            // Creating an instance of contract using contract addresss and ABI
            const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.BINANCE_CONTRACT_ADDRESS);
            // Get block for generating the gas limit
            const block = yield web3.eth.getBlock("latest");
            const gasLimit = Math.round(block.gasLimit / block.transactions.length);
            // Calling the mint method of the contract and passing the transfer_to from payload 
            // and the metadata url from payload
            const resp = yield myContract.methods.mint(myAccount1.address, data.metadata_url).send({ from: myAccount.address, gas: gasLimit });
            if (resp) {
                const resp1 = yield web3.eth.getTransactionReceipt(resp.transactionHash);
                const eventAbi = abi_1.contract_ABI.find((abi) => abi.name === 'Mint');
                const mintEvent = resp1.logs.find((log) => log.topics[0] === eventAbi.signature);
                const decodedData = web3.eth.abi.decodeLog(eventAbi.inputs, mintEvent.data, mintEvent.topics.slice(1));
                // Set the transaction ID for response
                transactionID = resp.transactionHash;
                blockchain = interfaces_1.BlockchainType.Binance;
                tokenId = decodedData.tokenId;
            }
        }
        else if (data.blockchain === interfaces_1.BlockchainType.Klaytn) {
            // Creating an instance of provider for contract interaction
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.KLAYTN_RPC_URL));
            // Get the private key from env file and add to provider
            const privateKey = `0x${process.env.KLAYTN_CONTRACT_OWNER_PRIVATE_KEY}`;
            const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
            web3.eth.accounts.wallet.add(privateKey);
            const myAccount1 = web3.eth.accounts.privateKeyToAccount(`0x${process.env.KLAYTN_WALLET_PRIVATE_KEY}`);
            // Creating an instance of contract using contract addresss and ABI
            const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.KLAYTN_CONTRACT_ADDRESS);
            // Calling the mint method of the contract and passing the transfer_to from payload 
            // and the metadata url from payload
            const resp = yield myContract.methods.mint(myAccount1.address, data.metadata_url).send({ from: myAccount.address, gas: 2000000 });
            if (resp) {
                const resp1 = yield web3.eth.getTransactionReceipt(resp.transactionHash);
                const eventAbi = abi_1.contract_ABI.find((abi) => abi.name === 'Mint');
                const mintEvent = resp1.logs.find((log) => log.topics[0] === eventAbi.signature);
                const decodedData = web3.eth.abi.decodeLog(eventAbi.inputs, mintEvent.data, mintEvent.topics.slice(1));
                // Set the transaction ID for response
                transactionID = resp.transactionHash;
                blockchain = interfaces_1.BlockchainType.Klaytn;
                tokenId = decodedData.tokenId;
            }
        }
        // Return the object as a response to API
        return {
            transactionID: transactionID,
            blockchain_type: blockchain,
            tokenId: Number(tokenId)
        };
    }
    catch (err) {
        throw err;
    }
});
Repository.mintMultipleNFTs = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        if (data.metadata_urls.length > 0) {
            let transactionID = "";
            // Conditions to check on which blockchain we need to mint the nft
            if (data.blockchain === interfaces_1.BlockchainType.Ethereum) {
                // Creating an instance of provider for contract interaction
                const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.ETHEREUM_RPC_URL));
                // Get the private key from env file and add to provider
                const privateKey = `0x${process.env.ETHEREUM_CONTRACT_OWNER_PRIVATE_KEY}`;
                const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
                web3.eth.accounts.wallet.add(privateKey);
                const myAccount1 = web3.eth.accounts.privateKeyToAccount(`0x${process.env.ETHEREUM_WALLET_PRIVATE_KEY}`);
                // Creating an instance of contract using contract addresss and ABI
                const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.ETHEREUM_CONTRACT_ADDRESS);
                // Get block for generating the gas limit
                const block = yield web3.eth.getBlock("latest");
                const gasLimit = Math.round(block.gasLimit / block.transactions.length);
                // Calling the batchMint method of the contract and passing the transfer_to from payload 
                // and the metadata url from payload
                const resp = yield myContract.methods.batchMint(myAccount1.address, data.metadata_urls).send({ from: myAccount.address, gas: gasLimit });
                if (resp) {
                    const resp1 = yield web3.eth.getTransactionReceipt(resp.transactionHash);
                    const eventAbi = abi_1.contract_ABI.find((abi) => abi.name === 'Mint');
                    const mintEvent = resp1.logs.filter((log) => log.topics[0] === eventAbi.signature);
                    const tokenIds = [];
                    for (let i = 0; i < mintEvent.length; i++) {
                        const decodedData = web3.eth.abi.decodeLog(eventAbi.inputs, mintEvent[i].data, mintEvent[i].topics.slice(1));
                        tokenIds.push(Number(decodedData.tokenId));
                    }
                    // Set the transaction ID for response
                    transactionID = resp.transactionHash;
                    result = {
                        transactionID: transactionID,
                        blockchain: interfaces_1.BlockchainType.Ethereum,
                        tokenIds: tokenIds
                    };
                }
            }
            else if (data.blockchain === interfaces_1.BlockchainType.Binance) {
                // Creating an instance of provider for contract interaction
                const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.BINANCE_RPC_URL));
                // Get the private key from env file and add to provider
                const privateKey = `0x${process.env.BINANCE_CONTRACT_OWNER_PRIVATE_KEY}`;
                const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
                web3.eth.accounts.wallet.add(privateKey);
                const myAccount1 = web3.eth.accounts.privateKeyToAccount(`0x${process.env.BINANCE_WALLET_PRIVATE_KEY}`);
                // Creating an instance of contract using contract addresss and ABI
                const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.BINANCE_CONTRACT_ADDRESS);
                // Get block for generating the gas limit
                const block = yield web3.eth.getBlock("latest");
                const gasLimit = Math.round(block.gasLimit / block.transactions.length);
                // Calling the batchMint method of the contract and passing the transfer_to from payload 
                // and the metadata url from payload
                const resp = yield myContract.methods.batchMint(myAccount1.address, data.metadata_urls).send({ from: myAccount.address, gas: gasLimit });
                if (resp) {
                    const resp1 = yield web3.eth.getTransactionReceipt(resp.transactionHash);
                    const eventAbi = abi_1.contract_ABI.find((abi) => abi.name === 'Mint');
                    const mintEvent = resp1.logs.filter((log) => log.topics[0] === eventAbi.signature);
                    const tokenIds = [];
                    for (let i = 0; i < mintEvent.length; i++) {
                        const decodedData = web3.eth.abi.decodeLog(eventAbi.inputs, mintEvent[i].data, mintEvent[i].topics.slice(1));
                        tokenIds.push(Number(decodedData.tokenId));
                    }
                    // Set the transaction ID for response
                    transactionID = resp.transactionHash;
                    result = {
                        transactionID: transactionID,
                        blockchain: interfaces_1.BlockchainType.Binance,
                        tokenIds: tokenIds
                    };
                }
            }
            else if (data.blockchain === interfaces_1.BlockchainType.Klaytn) {
                // Creating an instance of provider for contract interaction
                const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.KLAYTN_RPC_URL));
                // Get the private key from env file and add to provider
                const privateKey = `0x${process.env.KLAYTN_CONTRACT_OWNER_PRIVATE_KEY}`;
                const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
                web3.eth.accounts.wallet.add(privateKey);
                const myAccount1 = web3.eth.accounts.privateKeyToAccount(`0x${process.env.KLAYTN_WALLET_PRIVATE_KEY}`);
                // Creating an instance of contract using contract addresss and ABI
                const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.KLAYTN_CONTRACT_ADDRESS);
                // Calling the batchMint method of the contract and passing the transfer_to from payload 
                // and the metadata url from payload
                const resp = yield myContract.methods.batchMint(myAccount1.address, data.metadata_urls).send({ from: myAccount.address, gas: 2000000 });
                if (resp) {
                    const resp1 = yield web3.eth.getTransactionReceipt(resp.transactionHash);
                    const eventAbi = abi_1.contract_ABI.find((abi) => abi.name === 'Mint');
                    const mintEvent = resp1.logs.filter((log) => log.topics[0] === eventAbi.signature);
                    const tokenIds = [];
                    for (let i = 0; i < mintEvent.length; i++) {
                        const decodedData = web3.eth.abi.decodeLog(eventAbi.inputs, mintEvent[i].data, mintEvent[i].topics.slice(1));
                        tokenIds.push(Number(decodedData.tokenId));
                    }
                    // Set the transaction ID for response
                    transactionID = resp.transactionHash;
                    result = {
                        transactionID: transactionID,
                        blockchain: interfaces_1.BlockchainType.Klaytn,
                        tokenIds: tokenIds
                    };
                }
            }
            // Return the result object as a response to API
            return result;
        }
    }
    catch (err) {
        throw err;
    }
});
Repository.transferNFT = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let transactionID = "";
        let blockchain = "";
        let tokenId;
        if (data.tokenIds.length > 1) {
            // Conditions to check on which blockchain we need to transfer the nft
            if (data.blockchain === interfaces_1.BlockchainType.Ethereum) {
                // Creating an instance of provider for contract interaction
                const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.ETHEREUM_RPC_URL));
                // Get the private key from env file and add to provider
                const privateKey = `0x${process.env.ETHEREUM_WALLET_PRIVATE_KEY}`;
                const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
                web3.eth.accounts.wallet.add(privateKey);
                // Creating an instance of contract using contract addresss and ABI
                const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.ETHEREUM_CONTRACT_ADDRESS);
                // Get block for generating the gas limit
                const block = yield web3.eth.getBlock("latest");
                const gasLimit = Math.round(block.gasLimit / block.transactions.length);
                // Calling the safeTransferFrom method of the contract and passing the wallet_address from env file
                // and the receiver address and tokenId which we want to transfer
                const resp = yield myContract.methods.batchTransfer(data.tokenIds, data.receipent_address).send({ from: myAccount.address, gas: gasLimit });
                if (resp) {
                    // Set the transaction ID for response
                    transactionID = resp.transactionHash;
                    blockchain = interfaces_1.BlockchainType.Ethereum;
                    tokenId = data.tokenIds;
                }
            }
            else if (data.blockchain === interfaces_1.BlockchainType.Binance) {
                // Creating an instance of provider for contract interaction
                const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.BINANCE_RPC_URL));
                // Get the private key from env file and add to provider
                const privateKey = `0x${process.env.BINANCE_WALLET_PRIVATE_KEY}`;
                const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
                web3.eth.accounts.wallet.add(privateKey);
                // Creating an instance of contract using contract addresss and ABI
                const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.BINANCE_CONTRACT_ADDRESS);
                // Get block for generating the gas limit
                const block = yield web3.eth.getBlock("latest");
                const gasLimit = Math.round(block.gasLimit / block.transactions.length);
                // Calling the safeTransferFrom method of the contract and passing the wallet_address from env file
                // and the receiver address and tokenId which we want to transfer
                const resp = yield myContract.methods.batchTransfer(data.tokenIds, data.receipent_address).send({ from: myAccount.address, gas: gasLimit });
                if (resp) {
                    // Set the transaction ID for response
                    transactionID = resp.transactionHash;
                    blockchain = interfaces_1.BlockchainType.Binance;
                    tokenId = data.tokenIds;
                }
            }
            else if (data.blockchain === interfaces_1.BlockchainType.Klaytn) {
                // Creating an instance of provider for contract interaction
                const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.KLAYTN_RPC_URL));
                // Get the private key from env file and add to provider
                const privateKey = `0x${process.env.KLAYTN_WALLET_PRIVATE_KEY}`;
                const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
                web3.eth.accounts.wallet.add(privateKey);
                // Creating an instance of contract using contract addresss and ABI
                const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.KLAYTN_CONTRACT_ADDRESS);
                // Calling the safeTransferFrom method of the contract and passing the wallet_address from env file
                // and the receiver address and tokenId which we want to transfer
                const resp = yield myContract.methods.batchTransfer(data.tokenIds, data.receipent_address).send({ from: myAccount.address, gas: 2000000 });
                if (resp) {
                    // Set the transaction ID for response
                    transactionID = resp.transactionHash;
                    blockchain = interfaces_1.BlockchainType.Klaytn;
                    tokenId = data.tokenIds;
                }
            }
        }
        else {
            // Conditions to check on which blockchain we need to transfer the nft
            if (data.blockchain === interfaces_1.BlockchainType.Ethereum) {
                // Creating an instance of provider for contract interaction
                const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.ETHEREUM_RPC_URL));
                // Get the private key from env file and add to provider
                const privateKey = `0x${process.env.ETHEREUM_WALLET_PRIVATE_KEY}`;
                const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
                web3.eth.accounts.wallet.add(privateKey);
                // Creating an instance of contract using contract addresss and ABI
                const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.ETHEREUM_CONTRACT_ADDRESS);
                // Get block for generating the gas limit
                const block = yield web3.eth.getBlock("latest");
                const gasLimit = Math.round(block.gasLimit / block.transactions.length);
                // Calling the safeTransferFrom method of the contract and passing the wallet_address from env file
                // and the receiver address and tokenId which we want to transfer
                const resp = yield myContract.methods.safeTransferFrom(myAccount.address, data.receipent_address, data.tokenIds[0]).send({ from: myAccount.address, gas: gasLimit });
                if (resp) {
                    // Set the transaction ID for response
                    transactionID = resp.transactionHash;
                    blockchain = interfaces_1.BlockchainType.Ethereum;
                    tokenId = data.tokenIds;
                }
            }
            else if (data.blockchain === interfaces_1.BlockchainType.Binance) {
                // Creating an instance of provider for contract interaction
                const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.BINANCE_RPC_URL));
                // Get the private key from env file and add to provider
                const privateKey = `0x${process.env.BINANCE_WALLET_PRIVATE_KEY}`;
                const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
                web3.eth.accounts.wallet.add(privateKey);
                // Creating an instance of contract using contract addresss and ABI
                const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.BINANCE_CONTRACT_ADDRESS);
                // Get block for generating the gas limit
                const block = yield web3.eth.getBlock("latest");
                const gasLimit = Math.round(block.gasLimit / block.transactions.length);
                // Calling the safeTransferFrom method of the contract and passing the wallet_address from env file
                // and the receiver address and tokenId which we want to transfer
                const resp = yield myContract.methods.safeTransferFrom(myAccount.address, data.receipent_address, data.tokenIds[0]).send({ from: myAccount.address, gas: gasLimit });
                if (resp) {
                    // Set the transaction ID for response
                    transactionID = resp.transactionHash;
                    blockchain = interfaces_1.BlockchainType.Binance;
                    tokenId = data.tokenIds;
                }
            }
            else if (data.blockchain === interfaces_1.BlockchainType.Klaytn) {
                // Creating an instance of provider for contract interaction
                const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.KLAYTN_RPC_URL));
                // Get the private key from env file and add to provider
                const privateKey = `0x${process.env.KLAYTN_WALLET_PRIVATE_KEY}`;
                const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
                web3.eth.accounts.wallet.add(privateKey);
                // Creating an instance of contract using contract addresss and ABI
                const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.KLAYTN_CONTRACT_ADDRESS);
                // Calling the safeTransferFrom method of the contract and passing the wallet_address from env file
                // and the receiver address and tokenId which we want to transfer
                const resp = yield myContract.methods.safeTransferFrom(myAccount.address, data.receipent_address, data.tokenIds[0]).send({ from: myAccount.address, gas: 2000000 });
                if (resp) {
                    // Set the transaction ID for response
                    transactionID = resp.transactionHash;
                    blockchain = interfaces_1.BlockchainType.Klaytn;
                    tokenId = data.tokenIds;
                }
            }
        }
        return {
            transactionID: transactionID,
            tokenIds: tokenId,
            blockchain: blockchain,
            receipent_address: data.receipent_address,
            wallet_address: data.wallet_address
        };
    }
    catch (err) {
        throw err;
    }
});
Repository.ownerOfNFT = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let isOwner = false;
        let result;
        // Conditions to check on which blockchain we need to transfer the nft
        if (data.blockchain === interfaces_1.BlockchainType.Ethereum) {
            // Creating an instance of provider for contract interaction
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.ETHEREUM_RPC_URL));
            // Creating an instance of contract using contract addresss and ABI
            const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.ETHEREUM_CONTRACT_ADDRESS);
            // Calling the ownerOf method of the contract and pass the tokenId for getting the owner of tokenId
            const resp = yield myContract.methods.ownerOf(data.tokenId).call();
            if (resp) {
                if (String(resp).toLowerCase() === String(data.wallet_address).toLowerCase()) {
                    isOwner = true;
                }
            }
            result = {
                isOwner: isOwner,
                blockchain: interfaces_1.BlockchainType.Ethereum,
                tokenId: data.tokenId
            };
        }
        else if (data.blockchain === interfaces_1.BlockchainType.Binance) {
            // Creating an instance of provider for contract interaction
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.BINANCE_RPC_URL));
            // Creating an instance of contract using contract addresss and ABI
            const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.BINANCE_CONTRACT_ADDRESS);
            // Calling the ownerOf method of the contract and pass the tokenId for getting the owner of tokenId
            const resp = yield myContract.methods.ownerOf(data.tokenId).call();
            if (resp) {
                if (String(resp).toLowerCase() === String(data.wallet_address).toLowerCase()) {
                    isOwner = true;
                }
            }
            result = {
                isOwner: isOwner,
                blockchain: interfaces_1.BlockchainType.Binance,
                tokenId: data.tokenId
            };
        }
        else if (data.blockchain === interfaces_1.BlockchainType.Klaytn) {
            // Creating an instance of provider for contract interaction
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.KLAYTN_RPC_URL));
            // Creating an instance of contract using contract addresss and ABI
            const myContract = new web3.eth.Contract(abi_1.contract_ABI, process.env.KLAYTN_CONTRACT_ADDRESS);
            // Calling the ownerOf method of the contract and pass the tokenId for getting the owner of tokenId
            const resp = yield myContract.methods.ownerOf(data.tokenId).call();
            if (resp) {
                if (String(resp).toLowerCase() === String(data.wallet_address).toLowerCase()) {
                    isOwner = true;
                }
            }
            result = {
                isOwner: isOwner,
                blockchain: interfaces_1.BlockchainType.Klaytn,
                tokenId: data.tokenId
            };
        }
        return result;
    }
    catch (err) {
        throw err;
    }
});
Repository.imageGenerate = (data, files) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let { category, noOfImage, blockchain } = data;
    try {
        let isOwner = false;
        let result = [];
        let modifiedData = yield (0, abi_1.modifyCategoryData)(files, category || []);
        const { error, value } = validation_1.userValidation.imageGenerate.validate(data);
        if (error) {
            // Validation failed
            throw error === null || error === void 0 ? void 0 : error.details;
            //   res.status(400).json({ error: error.details });
        }
        // let newArray = [...modifiedData]
        let i = 0;
        let inputsArray = [];
        for (let i = 0; i < noOfImage; i++) {
            const { inputs, secondArray } = yield (0, abi_1.imageProbability)(modifiedData);
            const modifiedInputs = Object.assign(Object.assign({}, inputs[0]), { file: inputs[0].file });
            inputsArray.push(inputs.map((item, index) => (Object.assign(Object.assign({}, item), { file: inputs[index].file }))));
            modifiedData = secondArray;
        }
        const results = yield Promise.all(inputsArray.map((inputs, index) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const sortedByOrder = [...inputs].sort((a, b) => parseInt(a === null || a === void 0 ? void 0 : a.order) - parseInt(b === null || b === void 0 ? void 0 : b.order));
            const images = sortedByOrder.map(item => { var _b; return ((_b = item === null || item === void 0 ? void 0 : item.file) === null || _b === void 0 ? void 0 : _b.image) || ""; });
            let inputPath = `output${index}.jpeg`;
            yield (0, imageProcess_1.combineImages)(images === null || images === void 0 ? void 0 : images.filter(item => item), inputPath);
            const formData = new FormData();
            formData.append('size', 'auto');
            formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
            let removedBgImage = yield (0, imageProcess_1.removeBackground)(formData, inputPath);
            const metadata = sortedByOrder[0];
            delete metadata["file"];
            metadata["name"] = metadata === null || metadata === void 0 ? void 0 : metadata.categoryName;
            metadata["blockchain"] = blockchain;
            const data = new FormData();
            data.append('pinataMetadata', JSON.stringify(metadata));
            data.append('file', fs.createReadStream(`output${index}.jpeg`));
            // data.append('file', removedBgImage);
            const response = yield (0, imageProcess_1.uploadToPinata)(data);
            // fs.unlink('output.jpeg', err => {
            //     if (err) {
            //         console.log("Error unlinking file:", err);
            //     }
            // });
            return { image_url: `https://gateway.pinata.cloud/ipfs/${response === null || response === void 0 ? void 0 : response.IpfsHash}`, uid: response === null || response === void 0 ? void 0 : response.IpfsHash, blockchain };
        })));
        // while (i < noOfImage) {
        //     console.log("🚀 ~ file: index.repository.ts:499 ~ Repository ~ imageGenerate= ~ newArray:", newArray)
        //     const { inputs, secondArray } = await imageProbability(newArray)
        //     console.log("🚀 ~ file: index.repository.ts:501 ~ Repository ~ imageGenerate= ~ newArray:", newArray, secondArray)
        //     const sortedByOrder = await inputs.sort((a, b) => parseInt(a?.order) - parseInt(b?.order));
        //     let images = sortedByOrder?.map(item => item?.file ? item?.file?.image : "")
        //     await combineImages(images);
        //     let metadata = sortedByOrder[0]
        //     delete metadata["file"]
        //     metadata["name"] = metadata?.categoryName
        //     let data = new FormData();
        //     data.append('pinataMetadata', JSON.stringify(metadata));
        //     data.append('file', fs.createReadStream('output.jpeg'));
        //     const response = await uploadToPinata(data);
        //     result.push({ image_url: `https://gateway.pinata.cloud/ipfs/${response?.IpfsHash}`, uid: response?.IpfsHash })
        //     fs.unlink('output.jpeg', err => {
        //         console.log("err:", err)
        //     })
        //     newArray = [...secondArray]
        //     i++
        // }
        return results;
    }
    catch (err) {
        // console.log("🚀 ~ file: index.repository.ts:517 ~ Repository ~ imageGenerate= ~ err:", err)
        throw err;
    }
});
exports.Repository = Repository;
exports.default = new Repository();
//# sourceMappingURL=index.repository.js.map