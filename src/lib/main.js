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

