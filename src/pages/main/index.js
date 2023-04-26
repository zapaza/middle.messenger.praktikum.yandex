import template from './index.hbs';
import app from './../../app.hbs';
import  { links } from '../../mocks';

document.body.innerHTML = app(
    {
        page : template({links: links}),
    });
