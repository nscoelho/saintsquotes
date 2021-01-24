import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [saintChosen, setSaintChosen] = useState(false);
  const [saint, setSaint] = useState({
    year: "",
    country: "",
    patron: "",
    saintday: "",
    img: "",
    quote: "",
    prayer: "",
    url: "",
    saint: ""
  });

  const randomQuote = () => {
    const min = Math.ceil(1)
    const max = Math.floor(838)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const searchSaint = () => {

    // Reads the API
    Axios.get('https://gospeloftheday.herokuapp.com/saints/' + randomQuote())
    .then((response) => {
      console.log(response);
      setSaint({
        year: response.data.year,
        country: response.data.country,
        patron: response.data.patron,
        saintday: response.data.saintday,
        img: response.data.img,
        quote: response.data.quote,
        prayer: response.data.prayer,
        url: response.data.url,
        saint: response.data.saint
      });

      setSaintChosen(true);
    });
    addNewLines(saint);
  };

  // Adds a new line after "."
  const addNewLines = (saint) => {
    saint.prayer = saint.prayer.replaceAll(/\. /g, '.\n');
  };

  return (
    <div className="App">
    <div className="TitleSection">
      <h1>Saint's Quotes</h1>

      <button onClick={searchSaint}>Get a quote</button>
    </div>
    <div className="DisplaySection">
      {!saintChosen ?
      (<h3> Click the button to get your gospel of the day </h3>)
      :
      (
      <>
      <img src={saint.img} alt="Her/His likeness"/>
      <h3>{saint.saint}</h3>
      <h4>{saint.year}</h4>
      <h4>Native to: {saint.country}</h4>
      <h4>Saint Day: {saint.saintday}</h4>
      <h4>{saint.patron}</h4>

      <div className="lineBreak">
        <div className="card">
          <h4>Quote:</h4>
          <h6>{saint.quote}</h6>
          <h4>Prayer:</h4>
          <h6>{saint.prayer}</h6>
        </div>

      </div>

      <h4><a target="_blank" rel="noreferrer" href={saint.url}>Learn more about the Saint</a></h4>
      <h4><a target="_blank" rel="noreferrer" href="https://www.amazon.com/Mystical-City-God-Mary-Agreda/dp/0895558254?ref_=Oct_s9_apbd_otopr_hd_bw_b3CS&amp;pf_rd_r=3P75YE8B72XAP47RKC58&amp;pf_rd_p=edf6274d-b68b-51a2-880c-a417c5d966dc&amp;pf_rd_s=merchandised-search-10&amp;pf_rd_t=BROWSE&amp;pf_rd_i=12304&_encoding=UTF8&tag=nelsonsc-20&linkCode=ur2&linkId=d97b70545217d50128eb34d702e3ef1e&camp=1789&creative=9325">Learn more about the life of Mary</a></h4>
      <h4><a target="_blank" rel="noreferrer" href="http://www.miracleoftheday.org">Visit our sister website MiracleOfTheDay.org</a></h4>
      <h4><a target="_blank" rel="noreferrer" href="http://www.biblepassage.org">Visit our sister website BiblePassage.org</a></h4>
      </>
      )}

    </div>
  </div>
  );
}

export default App;
