import { applyReplacements, setAttributeForAll } from "$lib/common";

export const removeElementsByClass = (className: string) => {
	const elements = document.getElementsByClassName(className);
	while (elements.length > 0) {
		elements[0].parentNode?.removeChild(elements[0]);
	}
};

export const convertOlToUl = (block: Element) => {
	if (!!block.querySelector('[data-list="bullet"]')) {
		const ul = document.createElement('ul');
		ul.innerHTML = block.innerHTML;
		block.insertAdjacentElement('afterend', ul);
		block.remove();
	}
};

export const replaceCodeBlock = (block: Element) => {
	const language = block.querySelector('.ql-code-block')?.getAttribute('data-language');
	block.outerHTML = `<div class="ql-code-block-container"><pre class="ql-code-block"><code class="language-${language}">${block.textContent}</code></pre></div>`;
};

export const addClass = (block: Element, classNames: string[]) => block.classList.add(...classNames);

export const recoverOriginalTags = (content: string): string =>
	content ? applyReplacements(content, [
		[`<ul`, `<ol`],
		[`ul>`, `ol>`],
		[`<pre`, `<div`],
		[`pre>`, `div>`]
	]) : '';

export const removeQuillUIElements = () => {
	['ql-ui', 'ql-tooltip'].forEach(removeElementsByClass);
};

export const setEditorContentEditable = (editable: boolean) => {
	setAttributeForAll(document.getElementsByClassName('ql-editor'), 'contenteditable', editable ? 'true' : 'false');
};

export const formatLists = () => {
	document.querySelectorAll('ol').forEach(convertOlToUl);
	document.querySelectorAll('ol').forEach(el => addClass(el, ['list-decimal', 'list-inside']));
	document.querySelectorAll('ul').forEach(el => addClass(el, ['list-disc', 'list-inside']));
};

export const formatCodeBlocks = () => {
	document.querySelectorAll('.ql-code-block-container').forEach(replaceCodeBlock);
};
