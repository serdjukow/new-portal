const sources = () => {
	const sourcesUrl = `../../all-sources.json`
	async function sourcesRequest() {
		const response = await fetch(sourcesUrl, {
			method: 'GET',
			mode: 'cors',
		})
		try {
			const sourceItems = await response.json()
			if (sourceItems.status === 'ok') {
				sourceToHtml(sourceItems.sources)
				findLanguage(sourceItems.sources)
				localStorage.setItem('source', JSON.stringify(sourceItems.sources))
			}
			if (sourceItems.status === 'error') {
				console.error('Status:', sourceItems.status)
				console.error('Code', sourceItems.code)
				console.error('Message', sourceItems.message)
			}
		} catch (er) {
			console.error(er.message)
		}
	}
	sourcesRequest()

	const headerNav = document.querySelector('.header__nav')
	const sourceToHtml = sorces => {
		const sorcesContainer = document.createElement('div')
		sorcesContainer.classList.add('sorces')
		app.innerHTML = ''
		sorces.forEach(el => {
			sorcesContainer.innerHTML += `
			<a href="${el.url || ''}" class="sorces__card" target="_blank">
				<div class="sorces__body">
					<h5 class="sorces__title">${el.name || ''}</h5>
					<div class="sorces__country">${el.country || ''} - ${el.language || ''}<figure class="sorces__country-img"><img src="${coumtryObj[el.country]}"></figure></div>
					<p class="sorces__description">${el.description || ''}</p>
			    </div>
		  	</a>
			`
			app.append(sorcesContainer)
		})
	}

	const findLanguage = sorces => {
		const languageAll = []
		sorces.forEach(source => languageAll.push(source.language))
		const languageArr = new Set(languageAll)
		languageArr.add('All')
		createLanguegeInput(languageArr)
	}

	const languageInput = document.createElement('select')
	const createLanguegeInput = languageArr => {
		languageInput.classList.add('language-input')
		for (let value of languageArr) {
			languageInput.innerHTML += `<option ${value === 'All' ? 'selected=true' : ''} value='${value}'>${value}</option>`
		}
		headerNav.append(languageInput)
	}

	languageInput.addEventListener('change', event => {
		event.preventDefault()
		let elememt = event.target
		getSources(elememt.value)
	})

	const getSources = inputValue => {
		if (localStorage.key('sourcea')) {
			let localSources = JSON.parse(localStorage.getItem('source'))
			sourceToHtml(inputValue === 'All' ? localSources : localSources.filter(el => el.language === inputValue))
		}
	}
}
sources()
