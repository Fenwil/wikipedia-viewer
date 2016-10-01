$(function () {
    function cleanArticles() {
        $(".article-js").empty();
    }

    function insertToast(message) {
        var $toastContent = $("<span>" + message + "</span>");
        Materialize.toast($toastContent, 5000);
    }

    function insertNewCard() {
        var newCard = '<div class="col s12 m12 l6">\
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
        $(".article-js").append(newCard);
    }

    function getWikiArticles()  {
        var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=6&prop=pageimages|extracts&pilimit=max&pithumbsize=80&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=',
            searchValue = $("#search").val(),
            urlApi = url + searchValue,
            goTo = "https://en.wikipedia.org/?curid=";
        $.ajax({
            url: urlApi,
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                cleanArticles();
                var i = 0;
                for (var id in data.query.pages) {
                    insertNewCard();
                    $(".card-content").eq(i).children().text(data.query.pages[id].extract);
                    $(".card-action").eq(i).children().attr("href", goTo + id).text(data.query.pages[id].title);
                    $(".card-content").eq(i).children().trunk8();
                    $(".card-action").eq(i).children().trunk8();
                    ++i;
                }
            },
            error: function () {
                insertToast("We couldn't get any article");
            }
        });
    }

    function searchArticles() {
        $("#search").bind("input", function (e) {
            if ($("#search").val() != "") {
                getWikiArticles();
            } else {
                cleanArticles();
                insertToast("Insert some text");
            }
            return false;
        });
    }

    searchArticles();
});