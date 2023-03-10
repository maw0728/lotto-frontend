// const RANDOM_PRINT_COUNT = 20; // 랜덤 출력할 경우의 수

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

// 랜덤 섞기 후 20가지 배열 생성 함수
/*const shuffle = (arr) => {
    arr.sort(()=>Math.random() - 0.5);
    arr.length=RANDOM_PRINT_COUNT;
    return arr;
}*/

// form 중복 숫자 입력 체크 함수
const hasDuplicates = (arr) => {
    return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
}

const targetClear = () => {
    let trSelector = document.querySelector('tbody tr');
    if (trSelector !== null){
        document.querySelector("tbody")?.remove();
        document.querySelector('#pagination').remove();
    }
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
            errMessage = '입력이 잘못 되었습니다. 다시확인해주세요.'
        }
    }
    if (hasDuplicates(numList)){
        isError=true;
        errMessage='중복 입력된 숫자가 존재합니다. 다시 확인해주세요.'
    }

    if (!isError) {
       numList.sort((a,b)=>a-b);
        let resultNum = getCombinations(numList, 6);
        // let newRandomArr = shuffle(resultNum);
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
        pageControl();
    } else {
        return alert(errMessage);
    }
});

clearBtn.addEventListener('click',()=>{
    targetClear()
});

/*중복 횟수 테스트 함수*/
/*const getElCount = (arr) =>{
    let result ={}
    for (const el of arr){
        result[el] = (result[el]||0) +1;
    }
    return result;
}*/


// 경우의 수 페이징 처리
const pageControl = () => {
    const $setRows = $('#setRows');

    $setRows.submit((e) => {
        e.preventDefault();
        const rowPerPage = $('[name="rowPerPage"]').val() * 1;// 1 을  곱하여 문자열을 숫자형로 변환
        const zeroWarning = '데이터가 존재하지 않습니다. 다시 시도해주세요.'
        if (!rowPerPage) {
            alert(zeroWarning);
            return;
        }
        $('#pagination').remove();
        const $products = $('#products');

        $products.after('<div id="pagination">');


        const $tr = $($products).find('tbody tr');
        const rowTotals = $tr.length;

        const pageTotal = Math.ceil(rowTotals/ rowPerPage);
        for (let i = 0; i < pageTotal; i++) {
            $('<a href="#"></a>')
                .attr('rel', i)
                .html(i + 1)
                .appendTo('#pagination');
        }

        $tr.addClass('off-screen')
            .slice(0, rowPerPage)
            .removeClass('off-screen');

        let $pagingLink = $('#pagination a');
        $pagingLink.on('click', function (evt) {
            evt.preventDefault();
            let $this = $(this);
            if ($this.hasClass('active')) {
                return;
            }
            $pagingLink.removeClass('active');
            $this.addClass('active');

            // 시작 행 = 페이지 번호 * 페이지당 행수
            // 끝 행 = 시작 행 + 페이지당 행수

            let currPage = $this.attr('rel');
            let startItem = currPage * rowPerPage;
            let endItem = startItem + rowPerPage;

            $tr.css('opacity', '0.0')
                .addClass('off-screen')
                .slice(startItem, endItem)
                .removeClass('off-screen')
                .animate({opacity: 1}, 300);

        });

        $pagingLink.filter(':first').addClass('active');

    });


    $setRows.submit();
}

