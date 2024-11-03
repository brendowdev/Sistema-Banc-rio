function showLogin() {
    document.getElementById('loginForm').classList.add('show');
    document.getElementById('registerForm').classList.remove('show');
    document.getElementById('sistemaBancario').classList.remove('show');
}

function showRegister() {
    document.getElementById('registerForm').classList.add('show');
    document.getElementById('loginForm').classList.remove('show');
    document.getElementById('sistemaBancario').classList.remove('show');
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login bem-sucedido!');
        mostrarSistemaBancario();
    } else {
        alert('Usuário não encontrado. Por favor, registre-se.');
        showRegister();
    }
}

function register() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword === confirmPassword) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registro bem-sucedido! Retornando ao login.');
        showLogin();
    } else {
        alert('As senhas não coincidem.');
    }
}

function mostrarSistemaBancario() {
    document.getElementById('sistemaBancario').classList.add('show');
    document.getElementById('loginForm').classList.remove('show');
    document.getElementById('registerForm').classList.remove('show');
}

let saldo = 0;

function exibirMensagem(mensagem) {
    document.getElementById("mensagem").innerText = mensagem;
}

function depositar() {
    let valor = parseFloat(prompt("Informe o valor para depósito:"));
    if (isNaN(valor) || valor <= 0) {
        exibirMensagem("Valor inválido para depósito!");
        return;
    }
    saldo += valor;
    if (saldo > 10000) {
        exibirMensagem("Parabéns! Seu saldo ultrapassou R$ 10.000.");
    } else {
        exibirMensagem(`Depósito realizado com sucesso! Saldo atual: R$ ${saldo.toFixed(2)}`);
    }
}

function sacar() {
    let valor = parseFloat(prompt("Informe o valor para saque:"));
    if (isNaN(valor) || valor <= 0) {
        exibirMensagem("Valor inválido para saque!");
        return;
    }
    if (valor > saldo) {
        exibirMensagem("Saque não permitido! Saldo insuficiente.");
    } else {
        saldo -= valor;
        if (saldo < 10) {
            exibirMensagem("Aviso: Seu saldo está baixo!");
        } else {
            exibirMensagem(`Saque realizado com sucesso! Saldo atual: R$ ${saldo.toFixed(2)}`);
        }
    }
}

function extrato() {
    exibirMensagem(`Seu saldo atual é: R$ ${saldo.toFixed(2)}`);
}

function sair() {
    exibirMensagem("Saindo do sistema. Até mais!");
    showLogin(); 
    
}