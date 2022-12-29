//import Web3 from './web3.js';
//import Crud from '../build/contracts/Crud.json';

let contractABI = [
    {
      "inputs": [],
      "name": "nextId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "create",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "read",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "update",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "destroy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
let contractAddress = '0x58ce59853F0Bb8bF96f3Bc4A21609AC04692e341';
var web3 = new Web3('http://127.0.0.1:9545/');
let crudContract = new web3.eth.Contract(contractABI, contractAddress);

const initWeb3 = () => {
    return new Promise((resolve, reject) => {
        if(typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            window.ethereum.enable()
                .then(() => {
                    resolve(
                        new Web3(window.ethereum)
                    );
                })
                .catch(error => {
                    reject(error);
                });
                return;
        }
        if(typeof window.web3 !== 'undefined') {
            return resolve(
                new Web3(window.web3.currentProvider)
            );
        }
    })
}

const initContract = () => {
    return new web3.eth.Contract(
        contractABI, contractAddress
    );
};

const initApp = () => {
  const $create = document.getElementById('create');
  const $createResult = document.getElementById('create-result');
  const $read = document.getElementById('read');
  const $readResult = document.getElementById('read-result');
  const $edit = document.getElementById('edit');
  const $editResult = document.getElementById('edit-result');
  const $delete = document.getElementById('delete');
  const $deleteResult = document.getElementById('delete-result');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

  $create.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.elements[0].value;
    crud.methods.create(name).send({from: accounts[0]})
    .then(result => {
      $createResult.innerHTML = `New user ${name} successfully created`;
    })
    .catch(_e => {
      $createResult.innerHTML = `Ooops... there was an error while trying to create a new user...`;
    });
  });

  $read.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods.read(id).call()
    .then(result => {
      $readResult.innerHTML = `Id: ${result[0]} Name: ${result[1]}`;
    })
    .catch(_e => {
      $readResult.innerHTML = `Ooops... there was an error while trying to read user ${id}`;
    });
  });

  $edit.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const name = e.target.elements[1].value;
    crud.methods.update(id, name).send({from: accounts[0]})
    .then(result => {
      $editResult.innerHTML = `Changed name of user ${id} to ${name}`;
    })
    .catch(_e => {
      $editResult.innerHTML = `Ooops... there was an error while trying to update name of user ${id} to ${name}`;
    });
  });

  $delete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods.destroy(id).send({from: accounts[0]})
    .then(result => {
      $deleteResult.innerHTML = `Deleted user ${id}`;
    })
    .catch(_e => {
      $deleteResult.innerHTML = `Ooops... there was an error while trying to delete iser ${id}`;
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp(); 
    })
    .catch(e => console.log(e.message));
});