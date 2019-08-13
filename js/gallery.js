$(function(){
    if (typeof ($.fn.justifiedGallery) === 'function') {
      let justifiedGallery = $('.justified-gallery')
      if(justifiedGallery.length > 0) {
        for (let i = 0; i < justifiedGallery.length; i ++){
          let html = justifiedGallery[i].childNodes[0].innerHTML
          console.log(html)
          justifiedGallery[i].innerHTML = html
        }
      }
      justifiedGallery.justifiedGallery({
        cssAnimation: true,
        imagesAnimationDuration: 1000
      });
    }
    if (typeof ($.fn.lightGallery) === 'function') {
        $('.article').lightGallery({ selector: '.gallery-item' });
    }
    $('p:has(.gallery-item)').css({'text-align': 'center'});
})
