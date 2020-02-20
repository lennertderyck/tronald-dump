

let fetchDataFromURl = (url, format) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = format;
    xhr.open('GET', url);
    xhr.send();
    xhr.onerror = () => {console.log(`Jammer mut`)}
    xhr.onprogress = (event) => {console.log(`Geduld mut`)}
    xhr.onload = () => {
        console.log('Ajjuu chaud mut');
        let status = xhr.status;
        console.log(status);
        if (status == 200) {
            result = xhr.response;
            generateQuoteUI(result)
        } else {
            console.log(`Dedju mut`);
        }
    }
}

document.querySelector('[data-label="reloadQuotes"]').addEventListener('click', () => (reloadQuotes(5)))
let tempStr = '', quoteContent = '', quoteIndex = 0;

function generateQuoteUI(result) {
    let div = document.createElement('a');
    div.classList.add('quote', 'animated','fadeInUp', 'faster');
    div.href = `${result._links.self.href}`
    div.target = '_blank'
    // div.setAttribute('style', `transition-dalay: ${.2}s`);
    div.innerHTML = `
        <div class="row">
            <div class="profile">
                <img class="profile-avatar" src="https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_reasonably_small.jpg">
            </div>
            <div class="tweet">
                <p class="profile-detail">
                    <strong class="profile-detail-name">Donald J. Trump</strong>
                    <svg viewBox="0 0 24 24" aria-label="Verified account" class="profile-verified-icon"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>
                    <span class="profile-detail-username">@realDonaldTrump</span>
                    <span class="time">&nbsp;·&nbsp;${showDate(result.appeared_at)}</span>
                </p>
                <p class="tweet-body">
                    ${result.value}
                </p>
            </div>
        </div>
    `
    document.querySelector('[data-label="quotes"]').appendChild(div);
}
function loadQuotes(n) {
    // console.warn('logged');
    document.querySelector('[data-label="quotes"]').innerHTML = '';
    
    for (let i = 0; i < n; i++) {
        fetchDataFromURl('https://tronalddump.io/random/quote', 'json');
    }
}
loadQuotes(5);


console.log(new Date("July 21, 1983 01:15:00:195").getMilliseconds());

function reloadQuotes(n) {
    setTimeout(() => {window.scrollTo({top: 0, behavior: 'smooth'})}, 1000);
    let quoteElements = document.querySelector('[data-label="quotes"]').getElementsByClassName('quote');

    for (let i = 0; i < n; i++) {
        quoteElements[i].setAttribute('style', `animation-delay: ${.2*i}s`); 
    }
    
    setTimeout(() => {
        for (let i = 0; i < n; i++) {
            quoteElements[i].classList.remove('fadeInUp')
            quoteElements[i].classList.add('fadeOutUp')
            console.log('euuhjjj');
        }
    }, 700);
    
    quoteElements[4].addEventListener('animationend', function() {
        loadQuotes(n);
        // window.scrollTo({top: window.innerHeight, behavior: 'smooth'});
    });
    
}

function timeDiff(input) {    
    const date1 = new Date(input); // 9:00 AM
    const date2 = new Date(); // 5:00 PM
    
    if (date2 < date1) {
        date2.setDate(date2.getDate() + 1);
    }
    
    let diff = date2 - date1;
    
    // var hh = Math.floor(diff / 1000 / 60 / 60);
    // diff -= hh * 1000 * 60 * 60;
    
    diff = Math.floor(diff / 1000 / 60 / 60 / 24 / 365) + 'y'
    
    return diff
}

function showDate(inputDate) {
    new Date(inputDate)
    let month = new Date(inputDate).getMonth();
    switch(month) {
        case 0:
            month = 'Jan'
            break;
        case 1:
            month = 'Feb'
            break;
        case 2:
            month = 'Mar'
            break;
        case 3:
            month = 'Apr'
            break;
        case 4:
            month = 'May'
            break;
        case 5:
            month = 'Jun'
            break;
        case 6:
            month = 'Jul'
            break;
        case 7:
            month = 'Aug'
            break;
        case 8:
            month = 'Sep'
            break;
        case 9:
            month = 'Oct'
            break;
        case 10:
            month = 'Nov'
            break;
        case 11:
            month = 'Dec'
            break;
    }
    let day = new Date(inputDate).getDate();
    let year = new Date(inputDate).getFullYear();
    return `${month} ${day}, ${year}`
}



