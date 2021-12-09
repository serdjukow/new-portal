const topHeadlines = ladn => {
	const url2 = `../../top-headlines/top-headlines-${ladn}.json`
	let url3 = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=4a11823c76cb48a788a1fd56c280c7c6'

	async function newsRequest() {
		const response = await fetch(url2, {
			method: 'GET',
			mode: 'cors',
		})
		try {
			const news = await response.json()
			if (news.status === 'ok') {
				toHtml(news)
				localStorage.setItem('news', JSON.stringify(news))
			}
			if (news.status === 'error') {
				console.error('Code', news.code)
				console.error('Message', news.message)
			}
		} catch (er) {
			console.error(er.message)
		}
	}
	newsRequest()

	const toHtml = news => {
		const newsContainer = document.createElement('div')
		newsContainer.classList.add('news')
		app.innerHTML = ''
		news.articles.forEach(item => {
			newsContainer.innerHTML += `
		<div class="news__card card">
			<figure class="card__img">			
				<img src="${item.urlToImage || '../../images/default.png'}">
			</figure>			
		    <div class="card__body">
				<h5 class="card__title">${item.source.name || ''}</h5>
				<h5 class="card__title">${item.title || ''}</h5>
				<div class="card__date">${item.publishedAt || ''}</div>
				<p class="card__description">${item.description || ''}</p>			
				<a href="${item.url || ''}" class="card__link" target="_blank">More...</a>
		    </div>
	  	</div>
		`
			app.append(newsContainer)
		})
	}
}

//topHeadlines('us')
