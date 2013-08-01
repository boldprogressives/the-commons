
      function processActionkitFormResponse(data) {
        $("iframe#crossdomain").remove();
        if( data.result == "error" ) {
          handleActionkitError && handleActionkitError(data.errors);
        } else if( data.result == "success" ) {
           handleActionkitSuccess && handleActionkitSuccess(data.redirect);
        } else {
          console && console.log && console.log(data);
        }
      } 

      window.addEventListener("message", function(response) { 
        var data = response.data;
        // The data is a jsonp style string so let's just extract out the json data from within it.
        data = data.substr(29).replace(/\)$/, "");
        data = JSON.parse(data);
        processActionkitFormResponse && processActionkitFormResponse(data);
      });

      function submitActionkitForm(pageName, data) {
        $("<iframe />").attr("name", "crossdomain")
                       .attr("id", "crossdomain")
              .hide().appendTo("body");
        var form = $("<form />").attr("method", "POST")
                                .attr("target", "crossdomain")
                                .hide().appendTo("body");
        $.each(data, function(i, n) {
          $("<input>").attr("name", i).attr("value", n).appendTo(form);
        });
        $("<input>").attr("name", "js").attr("value", "1").appendTo(form);
        $("<input>").attr("name", "callback")
                    .attr("value", 
                          window.location.href.replace(
                            window.location.hash, "").replace(/\#$/, "") + 
                          "#processActionkitFormResponse")
                    .appendTo(form);
        $("<input>").attr("name", "page").attr("value", pageName).appendTo(form);
        form.attr("action", "https://act.boldprogressives.org/act/");
        form.submit();
        form.remove();
      };
