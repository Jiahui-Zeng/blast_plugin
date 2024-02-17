import { ethers } from "./ethers.min.js";


let signer;
let provider;
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = []; // Your contract ABI
let contract
var url

// ethereum.request({ method: 'eth_requestAccounts' })

if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    console.log(provider);
    signer = provider.getSigner();
    console.log(signer);
    contract = new window.ethers.Contract(contractAddress, contractABI, signer);
    console.log(contract);
}

document.getElementById('creatorBtn').addEventListener('click', function () {
    document.getElementById('creatorOptions').classList.remove('hidden');
    document.getElementById('creatorBtn').classList.add('hidden');
    document.getElementById('readerBtn').classList.add('hidden');
});

document.getElementById('readerBtn').addEventListener('click', () => {
    document.getElementById('readerOptions').classList.remove('hidden');
    document.getElementById('readerBtn').classList.add('hidden');
    document.getElementById('creatorBtn').classList.add('hidden');
});

document.getElementById('walletBtn').addEventListener('click', () => {
    document.getElementById('readerBtn').classList.add('hidden');
    document.getElementById('creatorBtn').classList.add('hidden');
    if (window.ethereum && window.ethereum.isMetaMask) {
        console.log("metamsk is installed");
    }
    if (window.ethereum == null) {
        console.log("Please install wallet first");
    } else {
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = provider.getSigner();
        console.log(provider);
        console.log(signer);
    }
});

async function handleConnection() {
   
}


document.getElementById('storeUrlButton').addEventListener('click', async () => {
    
});

document.getElementById('withdrawButton').addEventListener('click', async () => {
    await contract.withdraw();
    // 添加提现成功的提示
});

document.getElementById('tipButton').addEventListener('click', async () => {
    const amount = ethers.utils.parseEther(document.getElementById('tipAmount').value);
    // 这里添加调用合约打赏的代码，你需要知道被打赏的URL或其它标识符
});

// Get Current Tab URL
document.addEventListener('DOMContentLoaded', function () {
    // url = window.location.href;
    // console.log(url);
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = tabs[0].url;
        console.log(url);
        document.getElementById('urlInput').value = url;
    });
    // chrome.runtime.sendMessage({ message: "get_current_url" }, function (response) {
    //     console.log(response);
    //     console.log("Current URL is: " + response.url); // Use this URL as needed
    //     // Optionally, auto-fill the URL input for the creator
    //     document.getElementById('urlInput').value = response.url;
    // });
});
