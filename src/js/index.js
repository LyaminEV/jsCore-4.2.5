import '../scss/style.scss';


const liveList = document.querySelector('.live-list'),
saveList = document.querySelector('.save-list');


const debounce = (callback) => {
    let timeout;
    return (argument) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(argument), 250);
    };
};

const addItem = (el) => {
    let item = document.createElement("li");
    item.innerHTML = `<div><p>Name: ${el.name}</p><p>Owner: ${el.owner.login}</p><p>Stars: ${el.stargazers_count}</p></div><button class="delete"></button>`;
    saveList.append(item);
    clearLiveResults();
    input.value = '';
    input.focus();
    item.querySelector('.delete').addEventListener('click', () => {
        const btn = item.querySelector('button')
        btn.parentElement.remove();
    })
}

const liveResults = (data) => {
    data.forEach(el =>  {
        let li = document.createElement('li');
        li.innerHTML = `<p>${el.name}</p>`;
        liveList.append(li);
        li.addEventListener('click', () => {
            addItem(el)
        })
    })
}

const clearLiveResults = () => {
    liveList.querySelectorAll('li').forEach(el => {
        el.remove();
    })
}

const onInput = ({ target }) => {
    clearLiveResults();

    if (target.value.length >= 2) {
        fetch(`https://api.github.com/search/repositories?q=${target.value}&per_page=5`)
            .then(responsive => {
                return responsive.json();
            })
            .then(obj => {
                const data = obj.items
                liveResults(data);
            })
    }
};

const input = document.querySelector('#search');
const debouncedOnInput = debounce(onInput);
input.addEventListener('input', debouncedOnInput);
input.addEventListener('mouseenter', function(event) {
    event.target.setAttribute('autocomplete', 'off')
});
