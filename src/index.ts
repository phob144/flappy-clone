function init() {
	const element = document.createElement('div');

	element.innerHTML = 'Hello world!';

	return element;
}

document.body.appendChild(init());
