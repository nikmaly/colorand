const
	IDS = {
		CANVAS: "cr-canvas",
		INTRO: "cr-intro",
		CODE: "cr-code",
		COPY_BUTTON: "cr-copy-button",
		COPY_ALERT: "cr-copy-alert"
	},
	CLASSES = {
		LIGHT_ICON: "icon-light",
		HIDDEN: "hidden"
	}


/**
 * @function doColor
 * generate a new color, and the text color if needed for high contrast
 */
function doColor(colorCanvas, colorCode, introText, btnCopy) {
	var color,
		rgb,
		r,
		g,
		b,
		luma;

	color = '';

	while (color.length !== 7) {
		color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
	}

	colorCanvas.style.background = color;
	colorCode.innerHTML = color;

	color = color.substring(1);
	rgb = parseInt(color, 16);
	r = (rgb >> 16) & 0xff;
	g = (rgb >> 8) & 0xff;
	b = (rgb >> 0) & 0xff;

	luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	if (luma < 100) {
		colorCode.style.color = '#EEE';
		btnCopy.classList.add(CLASSES.LIGHT_ICON);
	} else {
		colorCode.style.color = '#222';
		btnCopy.classList.remove(CLASSES.LIGHT_ICON);
	}
}


/**
 * @function copyToClipboard
 * copy the color value to clipboard
 */
function copyToClipboard(alertCopy) {
	let virtualCopy = document.createElement('input'),
		_color = document.getElementById(IDS.CODE).innerHTML;

	alertCopy.style.opacity = "1";
	setTimeout(function() {
		alertCopy.style.opacity = "0";
	}, 1500);

	virtualCopy.setAttribute('value', _color);
	document.body.appendChild(virtualCopy);
	virtualCopy.select();
	document.execCommand('copy');
	document.body.removeChild(virtualCopy);
}

/**
 * @function initListeners
 * setup the listeners for page resize and mouse interactivity
 */
function initListeners(colorCanvas, colorCode, introText, btnCopy, alertCopy) {
	document.body.onkeydown = function (e) {
		if (e.keyCode === 32) {
			e.preventDefault();
			introText.classList.add(CLASSES.HIDDEN);
			doColor(colorCanvas, colorCode, introText, btnCopy);
		}
	};

	btnCopy.addEventListener('click', function(e) {
		e.stopPropagation();
		copyToClipboard(alertCopy);
	});

	colorCanvas.addEventListener("click", function() {
		introText.classList.add(CLASSES.HIDDEN);
		doColor(colorCanvas, colorCode, introText, btnCopy);
	});
}

/**
 * @function init
 * Initialise code
 */
export default function init() {
	var	colorCanvas = document.getElementById(IDS.CANVAS),
		introText = document.getElementById(IDS.INTRO),
		colorCode = document.getElementById(IDS.CODE),
		btnCopy = document.getElementById(IDS.COPY_BUTTON),
		alertCopy = document.getElementById(IDS.COPY_ALERT);

	initListeners(colorCanvas, colorCode, introText, btnCopy, alertCopy);
}