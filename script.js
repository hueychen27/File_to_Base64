document.getElementById("file").addEventListener('change', (e) => {
	const container = document.getElementById("container");
	const fileElement = document.getElementById("file").files[0];
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = () => {
		console.log(reader.result);
		document.getElementById("result").innerText = reader.result;
		if (fileElement.type.includes("image")) {
			const el = `<object data="${reader.result}" type="${fileElement.type}"></object>`;
			container.innerHTML = el;
		} else if (fileElement.type.includes("audio/")) {
			const el = `<audio controls src="${reader.result}" type="${fileElement.type}">Your browser doesn't support the audio element :|</audio>`;
			container.innerHTML = el;
		} else if (fileElement.type.includes("video/")) {
			const el = `<video controls src="${reader.result}" type="${fileElement.type}">Your browser doesn't support the video element :|</video>`;
			container.innerHTML = el;
		} else if (fileElement.type.includes("text/")) {
			reader.readAsText(file);
			reader.onloadend = () => {
				const el = `<pre id="el">${reader.result}</pre>`;
				container.innerHTML = el;
			}
		} else {
			container.innerHTML = "";
		}
	}
});

function selectText(nodeId) {
	const node = document.getElementById(nodeId);

	if (document.body.createTextRange) {
		const range = document.body.createTextRange();
		range.moveToElementText(node);
		range.select();
	} else if (window.getSelection) {
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(node);
		selection.removeAllRanges();
		selection.addRange(range);
	} else {
		console.warn("Could not select text in node: Unsupported browser.");
	}
}

function copy(el) {
	const text = document.getElementById(el);
	if (text.nodeName == "TEXTAREA") {
		text.select();
	}
	else {
		selectText(el)
	}
	navigator.clipboard.writeText(text.value);
}