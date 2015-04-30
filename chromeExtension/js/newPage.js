function walkBookmarkTree(root,bmNode,depth,step){
    var a = $("<a>").data("start",step);
    $("<img>")
        .attr("src","http://www.google.com/s2/favicons?domain="+encodeURIComponent(bmNode.url))
        .appendTo(a)

    if (bmNode.children){
        for(var i=0;i<bmNode.children.length;i++){
            step = walkBookmarkTree(root,bmNode.children[i],depth+1,step);
        }
    }
    if (bmNode.url){
        step++;
        a.attr("href",bmNode.url)
    }
    a.data("depth",depth).data("end",step).appendTo(root);
    return step;
}

function addBookmarksToTree(bookmarkNode){
    var size = walkBookmarkTree($("#bookmarks"),bookmarkNode[0],1,0),
        step = 360/size;
    $("#bookmarks a").each(function(){
        var t = $(this),
            iR = t.data("depth")*32-16,
            from = t.data("start")*step,
            to = t.data("end")*step,
            iA = Math.PI*(from+to)/360,
            href = t.data("url");
        console.log(t.data("start"),t.data("end"),step)
        t.css({
            "top":250+iR*Math.sin(iA)-8,
            "left":250+iR*Math.cos(iA)-8,
        });
    })
}

chrome.bookmarks.getTree(addBookmarksToTree)

navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
});
