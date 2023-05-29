// Конечный автомат - функция состояния и она что-то делает в зависимости от своего состояния

// делаем транзакционную модель между юзерами

function transaction(user1, user2) {
    let status = ''
    switch (user1) {
        case 'pending': {
            ///
        }

        case 'sendMoney': {
            ///
        }
    }
}

// распарсить строку, в которой закодирвоано число

parseFloat('-0.12')

function parseFloat(str) {
    let state = 'begin'

    let sign = 1

    const int = [],
        dec = [];

    for(const char of str) {
        switch (state) {
            case 'begin': {
                state = 'int' // ожидается целая часть

                if(char === '-'){
                    sign = -1
                } else {
                    if(char === 0 && int.length === 0) {
                        state = 'sep'
                    } else {
                        int.push(char)
                    }
                }

                break;
            }

            case 'int': {
                if(char === '.') {
                    state = 'dec'
                    break;
                }

                if(isNaN(char)) {
                    throw new SyntaxError('Невереное число')
                }
            }

            case 'sep': {
                if(char !== '.'){
                    throw new SyntaxError('Невереное число')
                }

                state = 'dec';
                break
            }
        }
    }
}

// new Promise - это тоже конечный автомат