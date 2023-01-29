// 경우의 수
const getCombinations = (arr, selectNumber)=>{
    const results = [];
    if (selectNumber === 1) return arr.map((value)=>[value])

    arr.forEach((fixed, index, org)=>{
        const rest = org.slice(index+1);
        const combinations = getCombinations(rest, selectNumber-1);
        const attached = combinations.map((combination)=>[fixed, ...combination]);
        results.push(...attached)
    })
    return results;
}


const targetClear = () => {
    console.log(document.querySelector('tbody tr'))
    document.querySelector("tbody")?.remove();
}



let submitBtn = document.querySelector('.submit-btn');
let clearBtn = document.querySelector('.clear-btn');
submitBtn.addEventListener('click',()=>{
    let isError = false
    let errMessage;
    let numList = [];
    let result;
    let numInputList = document.getElementsByClassName('user-num');
    for (let i = 0; i < 10; i++) {
        let targetNum = numInputList.item(i).valueAsNumber
        if (targetNum > 0 && targetNum < 46) {
            numList.push(targetNum);
        } else {
            isError = true;
            errMessage = '입력이 잘못 되었습니다 다시확인해주세요'
        }
    }

    if (!isError) {
        let resultNum = getCombinations(numList, 6);
        resultNum.map((x) => console.log(x));
        targetClear();
        document.querySelector('table').innerHTML += `<tbody></tbody>`;
        resultNum.map((numList,index)=>{
            document.querySelector("tbody").innerHTML += `<tr>
              <td class="row-num">${index+1}</td>
              <td>${numList[0]}</td>
              <td>${numList[1]}</td>
              <td>${numList[2]}</td>
              <td>${numList[3]}</td>
              <td>${numList[4]}</td>
              <td>${numList[5]}</td>
            </tr>`;
        })
    } else {
        return alert(errMessage);
    }
});

clearBtn.addEventListener('click',()=>{
    targetClear()
})


// 경우의 수 리스트 조회
// let searchBtn = document.getElementById('searchBtn');
// searchBtn.addEventListener('click', /*리스트조회함수*/)


// const getList = (arr) =>{
//     document.getElementById('result').innerText = arr;
//     console.log('lotto 경우의 수', arr)
// }

// 테스트용
const testArr = [1,3,4,5,11,13,17,22,37,41]
const result = getCombinations(testArr, 6);
console.log(result);
result.map(x => console.log(x));

