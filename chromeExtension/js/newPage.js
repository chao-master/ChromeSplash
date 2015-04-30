function addBookmarksToTree(bookmarkNode,treeNode){
    var elem = $("<li>").appendTo(treeNode);
    if (bookmarkNode.url){
        $("<a>").attr("href",bookmarkNode.url).append(
            $("<img>").attr("src","http://www.google.com/s2/favicons?domain="+encodeURIComponent(bookmarkNode.url))
        ).appendTo(elem);
    } else {
        var icon = $('<i class="fa fa-folder"></i>')
            .appendTo(elem);
    }
    if (bookmarkNode.children){
        var list = $("<ul>").appendTo(elem)
        for(var i=0;i<bookmarkNode.children.length;i++){
            addBookmarksToTree(bookmarkNode.children[i],list);
        }
    }
}


chrome.bookmarks.getTree(function(results){
    var root = $("<ul>").appendTo("body");
    addBookmarksToTree(results[0],root);
})

navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
});
