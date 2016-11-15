class WikipediaViewer {
    constructor() {
        this.$articles = $(".article-js");
        this.cardTemplate = '<div class="col s12 m12 l6">\
                <div class="card horizontal hoverable">\
                    <div class="card-stacked">\
                        <div class="card-content">\
                            <p></p>\
                        </div>\
                        <div class="card-action">\
                            <a href="#" target="_blank"></a>\
                        </div>\
                    </div>\
                </div>\
            </div>';
        this.apiLink = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=6&prop=pageimages|extracts&pilimit=max&pithumbsize=80&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    }
    cleanArticles() {
        this.$articles.empty();
    }
    insertToast(message) {
        let $toastContent = $("<span>" + message + "</span>");
        Materialize.toast($toastContent, 5000);
    }
    insertNewCard() {
        this.$articles.append(this.cardTemplate);
    }
    getWikiArticles()  {
        let searchValue = $("#search").val(),
            apiUrl = this.apiLink + searchValue,
            goTo = "https://en.wikipedia.org/?curid=",
            _this = this;
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                let i = 0;
                _this.cleanArticles();
                for (var id in data.query.pages) {
                    _this.insertNewCard();
                    $(".card-content:eq(" + i + ")").children().text(data.query.pages[id].extract);
                    $(".card-action:eq(" + i + ")").children().attr("href", goTo + id).text(data.query.pages[id].title);
                    $(".card-content:eq(" + i + ")").children().shave(30);
                    $(".card-action:eq(" + i + ")").children().shave(20);
                    ++i;
                }
            },
            error: function () {
                _this.insertToast("We couldn't get any article");
            }
        });
    }
    searchArticles() {
        let _this = this;
        $("#search").bind("input", function (e) {
            e.preventDefault();
            if ($("#search").val() !== "") {
                _this.cleanArticles();
                _this.getWikiArticles();
            } else {
                _this.insertToast("Insert some text");
                _this.cleanArticles();
            }
        });
    }
}

$(() => {
    let wikipediaViewer = new WikipediaViewer();
    wikipediaViewer.searchArticles();
});