
  $().ready(function(){

    hideErrorAlerts();

    $("#personalLink a").click(function(){
      showPersonalDetails(); 
      return false;
    });

    $("#carLink a").click(function(){
      showCarDetails(); 
      return false;
    });

    $("#quoteLink a").click(function(){
      showQuoteDetails(); 
      return false;
    });
  });

//##################### NAVIGATION ##########################

  function showPersonalDetails() {
      // Hide personal details
      $("#dvCarDetails").hide();
      $("#dvQuoteDetails").hide();
      hideErrorAlerts();

      // Proceed to car details step of process
      $("#dvPersonalDetails").show();
      setActiveNavigation("personalLink");
  }


  function showCarDetails() {
    hideErrorAlerts();

    var emptyFields = validateFields("dvPersonalDetails");

    if(emptyFields > 0) {
      $("#dvPersonalDetailsAlert").show();
    }
    else { 
      // Hide personal details
      $("#dvPersonalDetails").hide();
      $("#dvQuoteDetails").hide();
      // Proceed to car details step of process
      $("#dvCarDetails").show();
      setActiveNavigation("carLink");
    }         
  }

  function showQuoteDetails() {
    hideErrorAlerts();

    var emptyFields = validateFields("dvPersonalDetails") + validateFields("dvCarDetails") + validateFields("dvQuoteDetails");

    if (emptyFields === 0)
    {
      $("#dvCarDetails").hide();
      $("#dvPersonalDetails").hide();

       $("#dvQuoteDetails").show();
       setActiveNavigation("quoteLink");
    }
    else
    {
      $("#dvQuoteDetailsAlert").show();
    }
  }

  function getQuote() {
    //reset error message
    $("#dvCarDetailsAlert").hide();

    var emptyFields = validateFields("dvCarDetails");

    if (emptyFields === 0)
    {
      var gender = $("#dvPersonalDetails input:radio[name=rdoGender]:checked").val();
      var age = $("#txtAge").val();
      var yearsNoClaims = $("#ddlNCB option:selected").val();
      var costOfCar = $("#txtModelEstValue").val();
      var carStorage = $("#ddlModelStorage option:selected").val();

      $.ajax({
          type: "GET",
          url: "http://lit-wrkexp-01.lit.lmig.com:8080/api/calculateRates",
          data: {gender:gender, age:age, noClaimsBonus:yearsNoClaims, costOfCar:costOfCar, carStorage:carStorage}
        }).done(function(msg) {
          $("#txtQuote").text(msg.result.toFixed(2));
          showQuoteDetails();
      });
    }
    else
    {
      $("#dvCarDetailsAlert").show();
    }
  }

  //##################### HELPERS ##########################

  function hideErrorAlerts()
  {
    $("#dvPersonalDetailsAlert").hide();
    $("#dvCarDetailsAlert").hide();
    $("#dvQuoteDetailsAlert").hide();
  }

  function setActiveNavigation(activeTab) {
    $(".nav li").removeClass("active");

    $("#" + activeTab).addClass("active");
  }


//##################### VALIDATION ##########################

  function compareValueAgainstRegex(regex, value)
  {
    if (regex.test(value))
    {
      return false;
    }
    return true;
  }

  function isFieldAlphaNumeric(value) {
    return compareValueAgainstRegex(/^[a-z0-9]+$/i, value);
  }

  function isFieldNumeric(value) {
    return compareValueAgainstRegex(/^[0-9]+$/i, value);
  }

  function validateSection(section, isContentsCorrect)
  {
    var errors = 0;
    $(section).each(function(){

      var fieldValue = $(this).val();

      if (fieldValue === "")
        errors++;

      if (isContentsCorrect(fieldValue))
        errors++;

    });
    return errors;
  }

  function validateFields(sectionToValidate) {

    var errors = 0;

    errors = errors + validateSection("#" + sectionToValidate + " input:text", isFieldAlphaNumeric) 
                    + validateSection('#' + sectionToValidate + ' input[type="number"]', isFieldNumeric);

    // Check radio buttons for content: use length tester to ensure that radio button exists
    if ($("#" + sectionToValidate + " input:radio").length && $("#" + sectionToValidate + " input:radio").is(':checked') != true)
      errors++;

    // Check dropdowns have been set
    $("#" + sectionToValidate + " option:selected").each(function(){
      if (this.value === "Select"){
        errors++;
      }
    });

    $("#" + sectionToValidate + " .emailVal").each(function() {
      if (compareValueAgainstRegex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, $(this).val()))
        errors++;
    });

    return errors;
  }

  
