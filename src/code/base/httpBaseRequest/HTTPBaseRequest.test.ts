import {HTTPBaseRequest} from './HTTPBaseRequest';


const http = new HTTPBaseRequest();
describe('HTTP CLIENT', () => {
  it('SIGN IN', (done) => {
    http.post('https://ya-praktikum.tech/api/v2/auth/signin', {
      withCredentials: true,
      data: JSON.stringify({login: 'as', password: 'as'}),

    })
      .then(() => {
        done();
      })
      .catch(() => {
        done(new Error('Request failed'));
      });
  });
});
