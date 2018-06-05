var assert = require('assert');

describe('ABC RADIO PAGE', function() {

  before(function() {
        browser.url('http://www.abc.net.au/radionational/')
    });


  // 1) Verify can navigate to a ‘Program’ (‘The Economists’) from the Programs sub-menu.
  it('Economist program should be selected from sub-menu', function () {

      browser.execute(function() {document.getElementById('rn-programindex').style.display = "block";});
      var subMenu = $('#rn-programindex');
      var economistElement;
      for (var i = 0; i < subMenu.$$("li").length; i++) {
        if(subMenu.$$("li")[i].getText('a') == "The Economists"){
         economistElement = subMenu.$$("li")[i];
         break;
        }
      }
      browser.elementIdClick(economistElement.value.ELEMENT);

      assert.equal(browser.getUrl(), 'http://www.abc.net.au/radionational/programs/the-economists/');
  });

  // 2) Navigate to last program
  it('Should navigate to last program', function () {

      var isElementVisible = browser.isVisible('ul.at-a-glance > li:nth-last-child(2)');
      console.log(isElementVisible);

      function checkVisibility(){
        isElementVisible = browser.isVisible('ul.at-a-glance > li:nth-last-child(2)');
        console.log("checkVisibility() update: " + isElementVisible);
      }

      while(isElementVisible == false){
        browser.click('#right-arrow');
        checkVisibility();
      }

      browser.waitUntil(function () {
      return isElementVisible === true }, 10000);
      $('ul.at-a-glance').$('li:nth-last-child(2)').$('a').click();

  });

  // 3) Verify can search for content in the search bar and that content is returned.
  it('Economist program should be selected from sub-menu', function () {

      browser.setValue('input#search-simple-input-query', 'a')
      browser.elementIdClick($('input#search-simple-input-submit').value.ELEMENT);
      assert.equal(browser.getUrl(), 'http://www.abc.net.au/radionational/search/?query=a');
  });

  // 4) Verify you can click on Social media ‘Share’ icon and the correct pop-up appears:
  it('Facebook share button should work', function () {

      browser.url('http://www.abc.net.au/radionational/programs/bigideas/a-fortunate-universe/8076406');
      var fbIframe = $('div.fb_iframe_widget').$('iframe');
      browser.frame(fbIframe.value);
      browser.click('#u_0_2');
  });

  // 5) Verify that when you click on ‘Download audio’ you are directed to the mp3 file (will play in browser unless right click and select Download):
  it('Download audio button should direct to mp3 file', function () {

      browser.url('http://www.abc.net.au/radionational/programs/bigideas/a-fortunate-universe/8076406');
      var audioLink = browser.getAttribute('ul.cs-has-media > li > a ', 'href');
      var isHttpMp3 = false;
      // Check if a element has href attribute with mp3 url
      if(audioLink.includes("mp3") && audioLink.includes("http")){
        isHttpMp3 = true;
        //$('ul.cs-has-media').$('li').$('a').click();
      }

      assert.equal(isHttpMp3, true);

      // ***** THE FOLLOWING APPROACH INTENTED TO TEST AUDIO STREEAM BUT FAILED SINCE COULD NOT TAKE BROWSER CONTROL ON *.mp3 page
      // var currentURL = browser.getUrl();
      // var audio;
      // var currentState;
      // checkURLupdate();
      //
      // function checkURLupdate(){
      //   currentURL = browser.getUrl();
      // }

      // while(audioLink != currentURL){
      //     checkURLupdate();
      // }
      // Give 10 sec to be directed to mp3  page
      // browser.waitUntil(function () {
      // return audioLink == currentURL }, 10000);

      // getAudioELement();
      //
      // function getAudioELement(){
      //   audio = window.document.getElementsByName("media")[0];
      // }

     //currentState = audio.readyState;

     // States for html video element
     // 3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
     // 4 = HAVE_ENOUGH_DATA - enough data available to start playing
    //
    //  function checkStream(){
    //       currentState = audio.readyState;
    //  }
    //
    //  // Check current stream state until it 3 or 4
    // while((currentState != 3) || (currentState != 4)){
    //   checkStream();
    //
    // }
    //   //Give video 10 sec to play, throw error otherwise.
    //  browser.waitUntil(function () {
    //     return (audio.readyState != 3) || (audio.readyState != 4)}, 10000);
  });

  // // 6) Verify that the audio player loads successfully when you load url: http://radio.abc.net.au/stations/local_sydney/live
  it('Audio player should load successfully', function () {
      browser.url('http://radio.abc.net.au/stations/local_sydney/live');
      $('div.rp__playingItem__play').click();

      // FAILED => readystate is not defined
      // var videoReadyState = browser.elementIdProperty($('div.jw-media > video.jw-video'),readyState);
      // console.log(videoReadyState);

      // FAILED -> Could not get video readys status yet. Return webelement
      // var videoPlayer = browser.execute(function() {
      //   return document.querySelector('div.jw-media > video.jw-video');
      // });
      //
      // var videoPlayerStatus = browser.execute(function() {
      //   var video = document.querySelector('div.jw-media > video.jw-video');
      //   return video.readyState;
      // });
      //
      // console.log(videoPlayer);
      // console.log(videoPlayerStatus);
 });
});
