import React, {Component} from 'react';
import Header from '../views/header.js';
import Footer from '../views/footer.js';
import {Link} from 'react-router-dom';



function getArticles(){
  const req = new XMLHttpRequest();
  var articles = null;

req.onreadystatechange = function(event) {
  if (this.readyState === XMLHttpRequest.DONE) {
    if (this.status === 200) {
      var res = JSON.parse(this.responseText);
      console.log(res);
      articles = res;
      displayArticles(articles);
    } else {
      console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
    }
  }
};

req.open('GET', 'http://localhost:8080/articles', true);
req.send(null);
}

function displayArticles(articles) {
  var html = "";
  for (var i = 0; i < articles.length; i++) {
    console.log(articles[i]);
    var myDate = new Date(articles[i].date)
    html += "<div class='article'><h1>"+articles[i].title+"</h1><cite>"+myDate.toLocaleDateString()+"</cite><p>"+articles[i].authors+"</p><p>"+articles[i].content+"</p></div>"
  }
  document.getElementById("articleList").innerHTML = html;
}

export default class Blog extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div id="grid_page" class="grid-page">
          <h1 class="title">Blog</h1>
          <Link to="/addArticle">
          <button>Add +</button>
          </Link>
          {getArticles()}
          <div id="articleList"></div>
        </div>
        <Footer/>
      </div>
    );
  }
};

