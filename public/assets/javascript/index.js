$(document).ready(function () {
  var articleContainer = $(".article-container")
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);

  initPage();

  function initPage() {

    articleContainer.empty();
    $.get("/api/headlines?saved=false")
      .then(function (data) {
        if (data && data.length) {
          renderArticles(data);
        }
        else {
          renderEmpty();
        }
      });

  }


  function renderArticles(articles) {
    var articlePanels = [];

    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }


  function createPanel(article) {

    var panel =
      $(["<div class='card'>",
        "<div class= 'panel-heading'>",
        "<h5 class='card-header'>",
        article.headline,
        "</h5>",
        "<p class='card-text'>",
        article.summary,
        "</p>",
        "<a class='btn btn-warning save'>",
        "Save Article",
        "</a>",
        "</div>",
        "</div>"
      ].join(""));

    panel.data("_id", article._id);
    return panel;
  }

  function renderEmpty() {
    var emptyAlert =
      $(["<div class= 'alert alert-warning text-center'>",
        "<h4> No new articles </h4>",
        "</div>",
        "<div class = 'panel panel-default'>",
        "<div class= 'panel-heading text-center'>",

        "<h3> What would you like to do?</h3>",
        "</div>",

        "<div class = 'panel-body text-center'>",
        "<h4><a class= 'scrape-new'> Try Scraping New Articles</a></h4>",
        "<h4><a href= '/saved'> Go to Saved Articles</a></h4",
        "</div>",
        "</div>"
      ].join(""));
    articleContainer.append(emptyAlert);

  }

  function handleArticleSave() {

    var articleToSave = $(this).parents(".panel-heading").data();
    articleToSave.saved = true;
    $.ajax({
      method: "UPDATE",
      url: "/api/headlines",
      data: articleToSave
    })
      .then(function (data) {
        if (data.ok) {
          initPage();
        }
      });
     
      
  }

  function handleArticleScrape() {
    $.get("/api/fetch")
      .then(function (data) {
        initPage();
        //bootbox.alert("<h3 class = 'text-center m-top-80'>" + data.message + "<h3>");

      });


  }


})