import React from 'react';
import './App.scss';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: 'my state',
      author: 'current author',
      color: '',
    };
    this.getColor = this.getColor.bind(this);
    this.getQuote = this.getQuote.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTwitter = this.handleTwitter.bind(this);
    this.handleTumblr = this.handleTumblr.bind(this);
  }
  
  componentWillMount() {
    this.getColor();
    this.getQuote();
  }
  
  handleChange() {
    this.getColor();
    this.getQuote();
  }
  
  getColor() {
    let colors = ['#EE4858', '#1B7F79', '#11AAC1', '#747F7F', '#6C5B7B', '#355C7D', '#C06C84', '#2A6652', '#A32E97', '#B32949', '#0C7F8C', '#005999', '#EB8630']
    let newColor = colors[Math.floor(Math.random() * colors.length)]
    document.body.style.backgroundColor = newColor;
    this.setState({
      previousColor: this.state.color,
      color: newColor
    });  
  }
  
  getQuote() {
    let _this = this;
    _this.serverRequest = 
      axios
        .get("https://raw.githubusercontent.com/dwgillette/quotes/master/library")
        .then(function(response) { 
          let quotesData = response.data;
          let newQuote = quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
          _this.setState({
            quote: newQuote.quote,
            author: newQuote.author
          });
      return( newQuote.author );
        }) 
  }
  
  handleTwitter() {
    let url = "https://twitter.com/intent/tweet?hashtags=quotes&text="+encodeURIComponent('"' + this.state.quote + '"' + " -" + this.state.author);
    window.open(url, "_blank");
  }
  
  handleTumblr() {
    let url = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption="+encodeURIComponent(this.state.author)+"&content=" +encodeURIComponent(this.state.quote)+"&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";
    window.open(url, "_blank");
  }
  
  render() {
    return (
        <div className='box'>
          <Quote 
            color={this.state.color} 
            quote={this.state.quote} 
            author={this.state.author} />
          <div className='button-row'>
            <div className='social'>
              <button 
                id='social-btn' 
                style={{backgroundColor: this.state.color}} 
                title="Tweet this quote!"
                onClick={this.handleTwitter}>
                  <i className="fa fa-twitter"/>
              </button>
              <button 
                id='social-btn' 
                style={{backgroundColor: this.state.color}} 
                title="Post this quote to Tumblr!"
                onClick={this.handleTumblr}>
                  <i className="fa fa-tumblr"/>
              </button>
            </div>
            <button 
              id='quote-btn'
              onClick={this.handleChange} 
              style={{backgroundColor: this.state.color}} 
              title="Get a new quote!">
                New quote
            </button>
          </div>
        </div>
    );
  }
}

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      transition: {
        opacity: 0,
        transition: 'opacity 1s ease'
      }
    }
    this.mountStyle = this.mountStyle.bind(this);
    this.unMountStyle = this.unMountStyle.bind(this);
    this.renderQuote = this.renderQuote.bind(this);
  }
  
  componentWillReceiveProps() {
    this.unMountStyle(); // call exit animation
    this.renderQuote(); // takes new props and renders quote
    setTimeout(this.mountStyle, 510); // call enter animation
  }
  
  unMountStyle() { // css for unmount animation
    this.setState({
      transition: {
        opacity: 0,
        transition: 'opacity .5s ease'
      }
    })
  }
  
  mountStyle() { // css for mount animation
    this.setState({
      transition: {
        opacity: 1,
        transition: 'opacity 1s ease'
      }
    })
  }
  
  renderQuote() {
    setTimeout(()=>{
      this.setState({
        quote: this.props.quote,
        author: this.props.author
      })
    }, 505)
  }
  
  render() {
    return (
      <div className='quote-container' style={this.state.transition} >
        <div className='quote' style={{color: this.props.color}}>
          <i className="fa fa-quote-left"/> {this.state.quote}
        </div>        
        <div className='author' style={{color: this.props.color}}>- {this.state.author}</div>
      </div>
    );
  }
}


export default App;
