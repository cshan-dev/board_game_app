var Game = Backbone.Model.extend({
    defaults : { "game" : "This is a game"}
});

var Games = Backbone.Collection.extend({
    model : Game,
    url : "api/games"
});

var GameView = Backbone.View.extend({
    tagName: "li",
    className: "game",
    render : function(){
        this.$el.html(this.model.get('game'));
        return this;
    }
});

var GameApp = Backbone.View.extend({
    initialize : function(){
        this.games = new Games();
        this.listenTo(this.games, 'sync', this.displayGames, this);
        this.games.fetch();
    },
    
    displayGames : function(){
        this.games.each(function(game){
            var gameView = new GameView({model: game});
            console.log(gameView);
            $("#game-list").append(gameView.render().el);
        });
    }
});

var myApp = new GameApp();