var assert = require('assert');

describe('ABC NEWS PAGE', function() {


  before(function() {
      browser.url('http://www.abc.net.au/news/')
  });

  // 1) Verify that page loads successfully
  it('News page should resolve', function () {

      assert.equal(browser.getUrl(), 'http://www.abc.net.au/news/');
  });

  // 2) Verify that news banner loads
  it('Should news banner be existed', function () {

    var isExisting = browser.isExisting('#header');
    assert.equal(isExisting, true);
  })

  // 3) Verify that user can navigate to "just-in" page
  it('Should navigate to just-in', function () {

    browser.click('#n-justin');
    assert.equal(browser.getUrl(), 'http://www.abc.net.au/news/justin/');
  })

  // 4) Verify that on the ‘Just In’ page (http://www.abc.net.au/news/justin/) that the content per article loads correctly, i.e. must contain:
  it('Should include title-timestamp-text', function () {

     var list = $('ul.article-index');
     var articles = $('ul.article-index li');
     var hasMissingFeature = {
       "titleMissing": false,
       "timeStampMissing" : false,
       "textMissing" : false
     };

     var expectedResult = {
       "titleMissing": false,
       "timeStampMissing" : false,
       "textMissing" : false
     };

     for (var i = 0; i < list.$$('li').length; i++) {

       if(list.$$('li')[i].getText('h3') === "" || list.$$('li')[i].getText('h3') === null || list.$$('li')[i].getText('h3') === undefined){
         hasMissinFeature.titleMissing = true;
       }

       if(list.$$('li')[i].$('p.published').getText('span.timestamp') === "" || list.$$('li')[i].$('p.published').getText('span.timestamp') === null || list.$$('li')[i].$('p.published').getText('span.timestamp') == undefined){
         hasMissinFeature.timeStampMissing = true;
       }

       if(list.$$('li')[i].getText('P:nth-last-child(2)') === "" || list.$$('li')[i].getText('P:nth-last-child(2)') === null || list.$$('li')[i].getText('P:nth-last-child(2)') === undefined){
         hasMissinFeature.textMissing = true;
       }
     }

     assert.equal(JSON.stringify(hasMissingFeature), JSON.stringify(expectedResult));

  })

  //5) Verify that a video loads and appears successfully on the following page:
  //http://www.abc.net.au/news/2018-05-22/ebola-outbreak-treatment-from-qld-could-help-contain-virus/9784290
  it('Video should exists', function () {
      browser.url('http://www.abc.net.au/news/2018-05-22/ebola-outbreak-treatment-from-qld-could-help-contain-virus/9784290')
      var videoExisted =  browser.isExisting('#jwplayer-video-0');
      assert.equal(videoExisted, true);

  });

  // 6) Verify that the Image Gallery successfully loads and images appear correctly:
  // http://www.abc.net.au/news/2017-02-10/abc-open-pic-of-the-week/8256256
  it('Image gallery should resolve', function () {
      browser.url('http://www.abc.net.au/news/2017-02-10/abc-open-pic-of-the-week/8256256');
      var images = $('ul.imageGallery');
      var hasBrokenLink = false;

      for (var i = 0; i < images.$$('li').length; i++){
        imageUrl = images.$$('li')[i].$('img').getAttribute('src');
        if(imageUrl === "" || imageUrl === null || imageUrl === undefined)
          hasBrokenLink = true;
      }

      assert.equal(hasBrokenLink, false);
  });


});
