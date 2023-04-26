import './styles/index.css';
import app from './app.hbs'

document.body.innerHTML = app({page : `<div class="page__index">hello</div>`});