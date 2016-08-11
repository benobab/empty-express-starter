function setup(app,handlers,authorisationPolicy){
  app.get('/api/profiles/:userId',authorisationPolicy,handlers.account.getAccount);
  app.get('/api/polls/:pollId',authorisationPolicy,handlers.polls.getPoll);
  app.del('/api/polls/delete/:pollId',authorisationPolicy,handlers.polls.delPoll);
  //...
}
module.exports.setup = setup;