'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WikipediaViewer = function () {
    function WikipediaViewer() {
        _classCallCheck(this, WikipediaViewer);

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

    _createClass(WikipediaViewer, [{
        key: 'cleanArticles',
        value: function cleanArticles() {
            this.$articles.empty();
        }
    }, {
        key: 'insertToast',
        value: function insertToast(message) {
            var $toastContent = $("<span>" + message + "</span>");
            Materialize.toast($toastContent, 5000);
        }
    }, {
        key: 'insertNewCard',
        value: function insertNewCard() {
            this.$articles.append(this.cardTemplate);
        }
    }, {
        key: 'getWikiArticles',
        value: function getWikiArticles() {
            var searchValue = $("#search").val(),
                apiUrl = this.apiLink + searchValue,
                goTo = "https://en.wikipedia.org/?curid=",
                _this = this;
            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'jsonp',
                success: function success(data) {
                    var i = 0;
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
                error: function error() {
                    _this.insertToast("We couldn't get any article");
                }
            });
        }
    }, {
        key: 'searchArticles',
        value: function searchArticles() {
            var _this = this;
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
    }]);

    return WikipediaViewer;
}();

$(function () {
    var wikipediaViewer = new WikipediaViewer();
    wikipediaViewer.searchArticles();
});