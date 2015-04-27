# Kick off the application.
require ["app", "router"], (app, Router) ->
  app.router = new Router

  Backbone.history.start { pushState: true, root: app.root }

  $(document).on "click", "a[href]:not([data-bypass])", (evt) ->
    $this = $ this
    root = location.protocol + "//" + location.host + app.root
    href =
      prop: $this.prop "href"
      attr: $this.attr "href"

    if href.prop.slice(0, root.length) == root
      evt.preventDefault()
      Backbone.history.navigate href.attr, true
