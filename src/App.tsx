import { useState, useEffect } from 'react';
import $ from 'jquery';

import './App.css';

interface Quote {
  quote: string;
  author: string;
}

function App() {
  const [quotesData, setQuotesData] = useState<{ quotes: Quote[] }>({ quotes: [] });

  const colors: string[] = [
    '#3d5478',
    '#5e3d78',
    '#783d3d',
    '#78663d',
    '#3d7858',
    '#3d7873',
    '#283369',
    '#342224',
    '#472E32',
    '#3b2869',
    '#5b1c5e',
    '#5e1c3a'
  ];
  let currentQuote: string = '';
  let currentAuthor: string = '';

  useEffect(() => {
    getQuotes();
  }, []);

  async function getQuotes(): Promise<void> {
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      );
      const jsonQuotes: { quotes: Quote[] } = await response.json();
      setQuotesData(jsonQuotes);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  }

  function getRandomQuote(): Quote | undefined {
    return quotesData.quotes[
      Math.floor(Math.random() * quotesData.quotes.length)
    ];
  }

  function getQuote(): void {
    const randomQuote: Quote | undefined = getRandomQuote();

    if (randomQuote) {
      currentQuote = randomQuote.quote;
      currentAuthor = randomQuote.author;

      $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
          encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
      );

      $('#tumblr-quote').attr(
        'href',
        'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
          encodeURIComponent(currentAuthor) +
          '&content=' +
          encodeURIComponent(currentQuote) +
          '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
      );

      $('.quote-text').animate({ opacity: 0 }, 600, function () {
        $(this).animate({ opacity: 1 }, 600);
        $('#text').text(randomQuote.quote);
      });

      $('.quote-author').animate({ opacity: 0 }, 600, function () {
        $(this).animate({ opacity: 1 }, 600);
        $('#author').html(randomQuote.author);
      });

      const color: number = Math.floor(Math.random() * colors.length);
      $('html body').animate(
        {
          backgroundColor: colors[color],
          color: colors[color]
        },
        1200
      );
      $('.button').animate(
        {
          backgroundColor: colors[color]
        },
        1000
      );
    }
  }

  useEffect(() => {
    if (quotesData.quotes.length > 0) {
      getQuote();
    }
  }, [quotesData]);

  return (
    <>
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text">
            <i className="fa fa-quote-left"> </i>
            <span id="text"></span> <i className="fa fa-quote-right"></i>
          </div>
          <div className="quote-author">
            - <span id="author"></span>
          </div>
          <div className="buttons">
            <button className="button" id="new-quote" onClick={getQuote}>
              New quote
            </button>
            <a
              className="button"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_top"
            >
              <i className="fa fa-twitter"></i>
            </a>
            <a
              className="button"
              id="tumblr-quote"
              title="Post this quote on tumblr!"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-tumblr"></i>
            </a>
          </div>
        </div>
        <div className="footer">
          <p>Developed by </p>
          <a href="https://codepen.io/malanski/">
            <i className="fa fa-codepen"></i> Malanski
          </a>
          <a href="https://github.com/malanski">
            <i className="fa fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/ulisses-malanski">
            <i className="fa fa-linkedin"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
