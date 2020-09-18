const quoteContainer = document.getElementById('quote-container');

const quoteText = document.getElementById('quote');

const authorText = document.getElementById('author');

const twitterBtn = document.getElementById('twitter');

const newQuoteBtn = document.getElementById('new-quote');

const goodreadsBtn = document.getElementById('goodreads');

const loader = document.getElementById('loader');

// Show Loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  loading();
  const proxyUrl = 'https://stark-harbor-26908.herokuapp.com/';
  //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = `- ${data.quoteAuthor}`;
    }

    // Reduce font size for ling quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;

    // Stop Loader, Show Quote
    complete();
  } catch (error) {
    getQuote();
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Goodread
function goodreadClick() {
  const goodreadLink = 'https://www.goodreads.com/';
  window.open(goodreadLink, '_blank');
}
// Event Listerners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
goodreadsBtn.addEventListener('click', goodreadClick);

// On Load
getQuote();
