import templateApp from './app.hbs';

import './styles/index.css';


document.body.innerHTML = templateApp({ page: `<div class="page__index">hello</div>` });