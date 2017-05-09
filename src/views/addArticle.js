import React, {Component} from 'react';
import Header from '../views/header.js';
import Footer from '../views/footer.js';
import {Link} from 'react-router-dom';


function sendArticle() {
	var title = document.getElementById("title").value;
	var authors = document.getElementById("authors").value;
	var content = document.getElementById("content").value;
	var date = new Date();
	var data = {
		title: title,
		authors: authors,
		content: content,
		date: date
	};
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8080/articles", true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(JSON.stringify(data));
	xhr.onreadystatechange = function(event) {
		if (this.readyState === XMLHttpRequest.DONE) {
			if (this.status === 200) {

			} else {
				console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
			}
		}
	};
}


export default class addArticle extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div id="grid_page" class="grid-page">
          <h1 class="title">Add Article</h1>
          <div class="form">
            <label>Title :</label>
            <input type="text" id="title"/>
            <label>Authors :</label>
            <input type="text" id="authors"/>
            <label>Content :</label>
            <textarea id="content" rows="20">
            </textarea>
            <input type="button" id="send" value="Envoyer" onClick={sendArticle}/>
          </div>  
          <Link to="/Blog">
          <p>Back</p>
          </Link>
        </div>
        <Footer/>
      </div>
    );
  }
};
