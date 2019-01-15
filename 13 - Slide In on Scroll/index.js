document.addEventListener('DOMContentLoaded', e => {
    const imagesToSlideIn = document.querySelectorAll('.slide-in');
    const activeClassName = 'active';
    
    function debounce(fn) {
        let timer = null;
        return function() {
            let context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, 20); 
        }
    }
    
    function checkSlide(e) {   
        imagesToSlideIn.forEach(img => {
            // Detect position of scroll relative to the bottom of the page.
            // Image must not be shown after the bottom offset (window.scrollY + window.innerHeight) of the page
            // reached the top offset of image. So (img.height / 2) was added to have a half shown image and only then slide it in.
            const slideInAt = (window.scrollY + window.innerHeight) - img.height / 2;
            const isImgHalfShown = slideInAt > img.offsetTop;
    
            const imgBottom = img.offsetTop + img.height;
            const isNotScrolledPast = window.scrollY < imgBottom;
    
            if (isImgHalfShown && isNotScrolledPast) {
                img.classList.add(activeClassName);
            } else {
                img.classList.remove(activeClassName);
            }
        });
    }
    
    window.addEventListener('scroll', debounce(checkSlide));
});

