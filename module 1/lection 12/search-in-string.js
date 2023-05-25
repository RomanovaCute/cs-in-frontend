// Поиск подстроки в строке (прямой поиск)

function includes(substr, str) {
    const chars = [...str]

    outer: for(let i = 0; i < chars.length; i++) { // outer - метка для цикла
        let j = i

        for(const subchar of substr) {
            if(j >= chars.length){
                return false;
            }

            if(subchar !== chars[j]) {
                continue outer;
            }

            о++
        }

        break
    }

    return true;
}

console.log(includes('лава', 'Мирославу слава')) // true

// Алгоритм КМП - линейное время (НАЙТИ!!!)

// Поиск нескольких подстрок в строке:

// Алгоритм Ахо-Корасик
// Алгоритм Бора