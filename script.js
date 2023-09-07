function setupObserverWhenHeadersReady() {
    const headers = document.querySelectorAll("h2");
    const imageHolders = document.querySelectorAll("div.image");
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 0.1) {
                entry.target.classList.add("in-view");
            } else {
                entry.target.classList.remove("in-view");
            }
        });
    }, {
        threshold: [0, 0.1, 1]
    });

    headers.forEach(header => {
        observer.observe(header);
    });

    imageHolders.forEach(holder => {
        observer.observe(holder);
    });
}