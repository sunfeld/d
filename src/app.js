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
    console.log(r.data);
  });
  res.json(r.data);
});

app.get('/mobile_api/json/related/:id/', (req, res) => {
  axios.get(`https://api-live.dumpert.nl/mobile_api/json/related/${req.params.id}`).then((r) => {
    console.log(r.data);
  });
  res.json(r.data);
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
        isAdmin: true,
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
