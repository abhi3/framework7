// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
		testJson();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
$$('#test').on('click', function () {
	testJson();
	
});

function testJson(){
	$$.ajax({
   url: "https://api.mongolab.com/api/1/databases/db1/collections/track1?apiKey=kfwBENyPOcWuvHAaGsP3XPcjrknn2Wor",
  // headers: {"X-Parse-Application-Id":applicationId,"X-Parse-REST-API-Key":restApiKey},
   type: "GET",
   // if successful response received (http 2xx)
   success: function(data, textStatus ){
 
     // We have received response and can hide activity indicator
    // myApp.hideIndicator();
	
    var data = JSON.parse(data);
	 var html='';
	 for(var i=0;i<data.length;i++){
		 html+=data[i].c1;
	 }
	 
	 $$("#testHtml").html(html);
     
     
  },
  error: function(xhr, textStatus, errorThrown){ 
    // We have received response and can hide activity indicator
   // myApp.hideIndicator(); 
    myApp.alert('Login was unsuccessful, please verify username and password and try again');

    $$('#login-email').val('');
    $$('#login-password').val('');
  }
});
	
}
