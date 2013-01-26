// Generated by IcedCoffeeScript 1.4.0a
(function() {
  var APP, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  APP = {
    m: {},
    v: {},
    c: {},
    r: {},
    g: []
  };

  Handlebars.registerHelper('each_arr', function(items, fn) {
    return _.map(items, function(v) {
      var output;
      output = {
        value: v
      };
      return fn(output);
    }).join('');
  });

  View = (function(_super) {

    __extends(View, _super);

    function View() {
      this.read_ls = __bind(this.read_ls, this);
      this.read_cookie = __bind(this.read_cookie, this);
      this.set_cookie = __bind(this.set_cookie, this);
      this.screen_append = __bind(this.screen_append, this);
      this.kill = __bind(this.kill, this);
      this.render = __bind(this.render, this);      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.render = function() {
      if (this.template === void 0) {
        this.template = this.constructor.name.toLowerCase() + '.html';
      }
      if (this.model) this.options.model = this.model.toJSON();
      this.el.innerHTML = Handlebars.templates[this.template](this.options);
      return this;
    };

    View.prototype.kill = function() {
      var child, _i, _len, _ref;
      if (this.children && this.children.length) {
        _ref = this.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          child.kill();
        }
      }
      this.remove();
      return this.unbind();
    };

    View.prototype.screen_append = function() {
      $('#screen').append(this.render().el);
      return true;
    };

    View.prototype.set_cookie = function(value) {
      var c_value, currentDate, exdate;
      currentDate = new Date();
      exdate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
      c_value = escape(value) + ("; expires=" + exdate.toUTCString());
      document.cookie = app_config.ck + "=" + c_value;
      return localStorage.setItem(app_config.ck, value);
    };

    View.prototype.read_cookie = function() {
      var c, ca, i, name, nameEQ;
      name = app_config.ck;
      nameEQ = name + "=";
      ca = document.cookie.split(";");
      i = 0;
      while (i < ca.length) {
        c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        i++;
      }
      return null;
    };

    View.prototype.read_ls = function() {
      var ls;
      return ls = decodeURIComponent(localStorage.getItem(app_config.ck));
    };

    return View;

  })(Backbone.View);

  /* Log client errors
  window.onerror = (msg, file, line) ->
  	error =
  		user_agent	: navigator.userAgent
  		message 	: msg
  		filename	: file
  		line 		: line
  		timestamp 	: Math.floor(+new Date() / 1000)
  	$.post window.app_config.base_url + 'api/errors', error : error
  */


  APP.r.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      'example': 'example'
    };

    return Router;

  })(Backbone.Router);

  window.APP = APP;

  APP.v.InnerApp = (function(_super) {

    __extends(InnerApp, _super);

    function InnerApp() {
      this.load_view = __bind(this.load_view, this);
      this.initialize = __bind(this.initialize, this);      return InnerApp.__super__.constructor.apply(this, arguments);
    }

    InnerApp.prototype.el = 'screen';

    InnerApp.prototype.initialize = function() {
      return PubSub.on('load_view', this.load_view);
    };

    InnerApp.prototype.load_view = function(view, data) {
      var previous_view;
      previous_view = this.current_view;
      window.current_view = view;
      this.current_view = new APP.v[view](data);
      return previous_view && previous_view.kill();
    };

    return InnerApp;

  })(View);

  APP.v.Home = (function(_super) {

    __extends(Home, _super);

    function Home() {
      this.initialize = __bind(this.initialize, this);      return Home.__super__.constructor.apply(this, arguments);
    }

    Home.prototype.initialize = function() {
      this.template = 'home.html';
      return this.screen_append();
    };

    return Home;

  })(View);

  APP.v.App = (function(_super) {

    __extends(App, _super);

    function App() {
      this.initialize = __bind(this.initialize, this);      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.el = '#app';

    App.prototype.initialize = function() {
      $.ajaxSetup({
        cache: false
      });
      jQuery.support.cors = true;
      window.PubSub = _.extend({}, Backbone.Events);
      new APP.v.InnerApp;
      return PubSub.trigger('load_view', 'Home');
    };

    return App;

  })(View);

}).call(this);
