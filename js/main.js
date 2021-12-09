const app = document.querySelector('.app')
let country = 'ru'
let from = 'from=2021-12-07&'
let sortBy = 'sortBy=popularity&'
let theme = 'q=Apple&'
const apiKey = 'apiKey=4a11823c76cb48a788a1fd56c280c7c6'

const url = `
https://newsapi.org/v2/top-headlines?country=ru&apiKey=4a11823c76cb48a788a1fd56c280c7c6
`
const coumtry = [
	'ae',
	'ar',
	'at',
	'au',
	'be',
	'bg',
	'br',
	'ca',
	'ch',
	'cn',
	'co',
	'cu',
	'cz',
	'de',
	'eg',
	'fr',
	'gb',
	'gr',
	'hk',
	'hu',
	'id',
	'ie',
	'il',
	'in',
	'it',
	'jp',
	'kr',
	'lt',
	'lv',
	'ma',
	'mx',
	'my',
	'ng',
	'nl',
	'no',
	'nz',
	'ph',
	'pl',
	'pt',
	'ro',
	'rs',
	'ru',
	'sa',
	'se',
	'sg',
	'si',
	'sk',
	'th',
	'tr',
	'tw',
	'ua',
	'us',
	've',
	'za',
]

const coumtryObj = {}
for (let item of coumtry) {
	let key = item
	let value = `../../images/countries/${item}.svg`
	coumtryObj[key] = value
}
console.log(coumtryObj);
window.onload = function () {
	// set up our WebGL context and append the canvas to our wrapper
	var webGLCurtain = new Curtains({
		container: 'canvas',
	})

	// if there's any error during init, we're going to catch it here
	webGLCurtain.onError(function () {
		// we will add a class to the document body to display original images
		document.body.classList.add('no-curtains')
	})

	// get our plane element
	var planeElement = document.getElementsByClassName('plane')[0]

	// set our initial parameters (basic uniforms)
	var params = {
		vertexShaderID: 'plane-vs', // our vertex shader ID
		fragmentShaderID: 'plane-fs', // our framgent shader ID
		//crossOrigin: "", // codepen specific
		uniforms: {
			time: {
				name: 'uTime', // uniform name that will be passed to our shaders
				type: '1f', // this means our uniform is a float
				value: 0,
			},
		},
	}

	// create our plane mesh
	var plane = webGLCurtain.addPlane(planeElement, params)

	// if our plane has been successfully created
	// we use the onRender method of our plane fired at each requestAnimationFrame call
	plane &&
		plane.onRender(function () {
			plane.uniforms.time.value++ // update our time uniform value
		})
}
