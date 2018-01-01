
  function validate(){ // validate and send form data
    var form = document.getElementById('needs-validation');
    var useremail = document.getElementById("email").value;
        var userinterest = document.getElementById("interest").value;
        var xhttp = new XMLHttpRequest();
        if (form.checkValidity() === false | useremail == "" ) 
        {
          event.preventDefault();
          event.stopPropagation();
          document.getElementById('validationmessage').innerHTML = "Please enter a valid email address";
        }
        else if(userinterest == "Interested in...") 
        {
          event.preventDefault();
          event.stopPropagation();
          document.getElementById('validationmessage').innerHTML = "Please choose an interest";
        }
        else
        {
           var formData = GetMessageBody(form);
           //formData.append("email", useremail);
           //formData.append("interest", userinterest);
           event.preventDefault();//not refreshing the page

           xhttp.open("POST", "form.html");
           xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       xhttp.send(formData);
        }
  }
  

  function GetMessageBody (form) {
    var data = "";
    for (var i = 0; i < form.elements.length; i++) {
        var elem = form.elements[i];
        if (elem.name) {
            var nodeName = elem.nodeName.toLowerCase ();
            var type = elem.type ? elem.type.toLowerCase () : "";

                // if an input:checked or input:radio is not checked, skip it
            if (nodeName === "input" && (type === "checkbox" || type === "radio")) {
                if (!elem.checked) {
                    continue;
                }
            }

            var param = "";
                // select element is special, if no value is specified the text must be sent
            if (nodeName === "select") {
                for (var j = 0; j < elem.options.length; j++) {
                    var option = elem.options[j];
                    if (option.selected) {
                        var valueAttr = option.getAttributeNode ("value");
                        var value = (valueAttr && valueAttr.specified) ? option.value : option.text;
                        if (param != "") {
                            param += "&";
                        }
                        param += encodeURIComponent (elem.name) + "=" + encodeURIComponent (value);
                    }
                }
            }
            else {
                param = encodeURIComponent (elem.name) + "=" + encodeURIComponent (elem.value);
            }

            if (data != "") {
                data += "&";
            }
            data += param;                  
        }
    }
    return data;
}
