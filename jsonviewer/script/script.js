function colorizeJson(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

var selectText = function(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
};



/** Code Segment that requires jQuery **/
$(document).ready(function() {

  var smoothScroll = function(element) {

     // animate
     $('html, body').animate({
         scrollTop: $(element).offset().top
       }, 300);
  }

  $("#btn-copy").on('click', function() {
    selectText($("pre")[0]);
  });

  $('#btn-beautify').on('click', function() {
    var input = $("#input textarea").val();
    try {
      var jsonObj = JSON.parse(input);
      $("#output-json").html(colorizeJson(JSON.stringify(jsonObj, null, 2)));
      $("#error").hide();
      $("#output").fadeIn(function(){
        smoothScroll("#output");
      });
    } catch (e) {
      $("#error-message").text(e);
      $("#output").hide();
      $("#error").fadeIn(function(){
        smoothScroll("#error");
      });
      
    }
  });

});

