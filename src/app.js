var express = require('express');
const cors = require('cors');
const axios = require('axios');
var app = express();

app.use(
  cors({
    origin: 'https://www.dumpert.nl',
    credentials: true,
  })
);

app.get('/mobile_api/json/login', (req, res) => {
  res.json({ gentime: 1, success: true });
});

app.get('/mobile_api/json/viewed/:id/', (req, res) => {
  res.json({ gentime: 1, success: true });
});

app.get('/mobile_api/json/info/:id/', (req, res) => {
  axios.get(`https://api-live.dumpert.nl/mobile_api/json/info/${req.params.id}`).then((r) => {
    r.data.items = r.data.items.map((i) => {
      i.nsfw = false;
      return i;
    });
    res.json(r.data);
  });
});

app.get('/mobile_api/json/related/:id/', (req, res) => {
  axios.get(`https://api-live.dumpert.nl/mobile_api/json/related/${req.params.id}`).then((r) => {
    res.json(r.data);
  });
});

app.get('/json/latest/:p/', (req, res) => {
  axios.get(`https://api-live.dumpert.nl/json/latest/${req.params.p}/`).then((r) => {
    res.json(r.data);
  });
});

app.get('/json/toppers/:p/', (req, res) => {
  axios.get(`https://api-live.dumpert.nl/json/toppers/${req.params.p}/`).then((r) => {
    res.json(r.data);
  });
});

app.get('/json/dumperttv/:p/', (req, res) => {
  axios.get(`https://api-live.dumpert.nl/json/dumperttv/${req.params.p}/`).then((r) => {
    res.json(r.data);
  });
});

app.get('/api/v1.1/articles/:id/:hash/comments/', (req, res) => {
  axios.get(`https://comments.dumpert.nl/api/v1.1/articles/${req.params.id}/${req.params.hash}/comments/?includeitems=1`).then((r) => {
    res.json(r.data);
  });
});

app.get('/api/v1.1/user/articles/*', (req, res) => {
  res.json({
    data: {
      userArticle: {
        id: null,
        username: 'Jeroen',
        commentaryState: null,
        commentaryEndBan: null,
        commentaryBanReason: null,
        highlightedUsernames: [],
        hiddenUsernames: [],
        canComment: true,
        isPremium: true,
        isLoggedIn: true,
        isAdmin: false,
        isModerator: false,
        lastVisited: null,
        lastVisitCommentCount: null,
        links: {
          loginURL:
            'https://reaguurder.nl/login_ext?target_site=http%3A%2F%2Fcomments.dumpert.nl&client_final_url=http%3A%2F%2Fcomments.dumpert.nl%2F',
          logoutURL: '/sso_logout?client_final_url=http%3A%2F%2Fcomments.dumpert.nl%2Fapi%2Fv1.1%2Fuser%2Farticles%2F100023664%2F',
          registrationURL: 'https://reaguurder.nl/user/register',
        },
      },
      bannedComments: [],
    },
  });
});

app.get('/message', function (req, res) {
  res.send(process.env.MESSAGE);
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
