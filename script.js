import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = []; // Your contract ABI

const contract = new ethers.Contract(contractAddress, contractABI, signer);

document.getElementById('creatorBtn').addEventListener('click', function() {
    document.getElementById('creatorOptions').classList.remove('hidden');
    document.getElementById('creatorBtn').classList.add('hidden');
});

document.getElementById('readerBtn').addEventListener('click', () => {
    document.getElementById('readerOptions').classList.remove('hidden');
    document.getElementById('readerBtn').classList.add('hidden');
});

document.getElementById('storeUrlButton').addEventListener('click', async () => {
    // const url = document.getElementById('urlInput').value;
    var url = window.location.href;
    // 这里添加调用合约存储URL的代码
});

document.getElementById('withdrawButton').addEventListener('click', async () => {
    await contract.withdraw();
    // 添加提现成功的提示
});

document.getElementById('tipButton').addEventListener('click', async () => {
    const amount = ethers.utils.parseEther(document.getElementById('tipAmount').value);
    // 这里添加调用合约打赏的代码，你需要知道被打赏的URL或其它标识符
});

document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({message: "get_current_url"}, function(response) {
        console.log("Current URL is: " + response.url); // Use this URL as needed
        // Optionally, auto-fill the URL input for the creator
        document.getElementById('urlInput').value = response.url;
    });
});
