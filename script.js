import {ethers} from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";

var signer;
var provider;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const abi = ["function storeUrl(string memory url) public", "function reward(string memory url, uint amount) public payable", "function withdraw() public"]; 
const tokenAbi = ["function approve(address spender, uint256 value) public  returns (bool)"]
var contract;
var token;
var url;

document.getElementById('creatorBtn').addEventListener('click', function () {
    document.getElementById('creatorOptions').classList.remove('hidden');
    document.getElementById('walletBtn').classList.add('hidden');
    document.getElementById('creatorBtn').classList.add('hidden');
    document.getElementById('readerBtn').classList.add('hidden');
});

document.getElementById('readerBtn').addEventListener('click', () => {
    document.getElementById('readerOptions').classList.remove('hidden');
    document.getElementById('walletBtn').classList.add('hidden');
    document.getElementById('readerBtn').classList.add('hidden');
    document.getElementById('creatorBtn').classList.add('hidden');
});

document.getElementById('walletBtn').addEventListener('click', () => {
    console.log(window.ethereum)
    if (window.ethereum == null) {
        console.log("Please install wallet first");
    }
    else {
        document.getElementById('walletBtn').classList.add('hidden');
        console.log("Connect Success!");
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = provider.getSigner();
        console.log(signer);
        contract = new ethers.Contract(contractAddress, abi, signer);
        token = new ethers.Contract(tokenAddress, tokenAbi, signer);
    }
});

document.getElementById('storeUrlButton').addEventListener('click', async () => {
    url = window.location.href;
    console.log(signer);
    console.log("contract111 = ", contract);
    await contract.storeUrl(url);
    console.log("Store Success!");
});

document.getElementById('withdrawButton').addEventListener('click', async () => {
    await contract.withdraw();
    console.log("Withdraw Success!");
});

document.getElementById('tipButton').addEventListener('click', async () => {
    const amount = document.getElementById('tipAmount').value;
    console.log(amount);
    url = window.location.href;
    await token.approve(contractAddress, amount);
    await contract.reward(url, amount);
    console.log("Donate Success!");
});

// Get Current Tab URL
document.addEventListener('DOMContentLoaded', function () {
    url = window.location.href;
    console.log(url);
    document.getElementById('urlInput').value = url;
});
