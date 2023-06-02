    // await axios.get(url)
    //     .then(response => {
    //         const { data } = response;
    //         const imagesAll = data.hits;
    //         const totalHits = data.totalHits;

    //         if (imagesAll.length === 0) {
    //             if (page === 1) {
    //                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again!')
    //             }
    //         } else {
    //             Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`)
    //             renderDataImage(imagesAll);
    //         }
    //         if (imagesAll.length < totalHits) {
    //             observer.observe(guard);
    //         } else if (imagesAll.length === totalHits) {
    //             // Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    //             observer.unobserve(guard);
    //         }

    //     })
    //     .catch(error => {
    //         console.log(error)
    //     });