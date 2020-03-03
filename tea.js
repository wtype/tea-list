const teaElement = document.querySelector('#tea');
const input = document.querySelector('input');
const endpoint = './tea.json';
const tea = [];

function findMatches(word, tea) {
  return tea.filter(t => {
    const regex = new RegExp(word, 'gi');

    return t.name.match(regex) || t.ingredients.find(item => item.match(regex));
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, tea);
  const html = matchArray
    .map(t => {
      const regex = new RegExp(this.value, 'gi');
      const teaName = t.name.replace(
        regex,
        `<a href="${t.name}" class="glow">${this.value}</a>`
      );

      return `
        <li>
          <a href="${t.name}" class="h1">${teaName}</a>
        </li>
      `;
    })
    .join('');

  teaElement.innerHTML = html;
  if (!input.value) teaElement.innerHTML = '';
}

async function getTea() {
  const fetching = await fetch(endpoint);
  const response = await fetching.json();
  tea.push(...response);
}

input.addEventListener('change', displayMatches);
input.addEventListener('keyup', displayMatches);

getTea();
