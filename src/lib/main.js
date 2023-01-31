// 입력한 숫자들의 경우의 수(조합)
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
    let trSelector = document.querySelector('tbody tr');
    if (trSelector !== null){
        document.querySelector("tbody")?.remove();
    }
}

// 랜덤 20가지의 경우의 수 출력
const randomPrint = (arr) => {
    let newRandomArr = [];
    for (let i = 0; i < 20; i++) {
        let randomNum = arr[Math.floor(Math.random()*arr.length)];
        newRandomArr.push(randomNum);
    }
    return newRandomArr;
}

let submitBtn = document.querySelector('.submit-btn');
let clearBtn = document.querySelector('.clear-btn');
submitBtn.addEventListener('click',()=>{
    let isError = false
    let errMessage;
    let numList = [];
    // let result;
    let numInputList = document.getElementsByClassName('user-num');
    for (let i = 0; i < 10; i++) {
        let targetNum = numInputList.item(i).valueAsNumber;
        if (targetNum > 0 && targetNum < 46) {
            numList.push(targetNum);
        } else {
            isError = true;
            errMessage = '입력이 잘못 되었습니다 다시확인해주세요'
        }
    }

    if (!isError) {
        let resultNum = getCombinations(numList, 6);

        // 기획 변경.. 경우의 수 출력 후 랜덤으로 20가지만 저장
        let newRandomArr = randomPrint(resultNum);
        targetClear();
        document.querySelector('table').innerHTML += `<tbody></tbody>`;
        newRandomArr.map((numList,index)=>{
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
});

/* 테스트용
const testArr = [1,3,4,5,11,13,17,22,37,41]
const result = getCombinations(testArr, 6);
*/
