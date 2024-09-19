const itemsPerPage = 12;
let currentPage = 1;

function displayCategories(categories, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = categories.slice(startIndex, endIndex);

    const list = document.getElementById('categoriesList');
    list.innerHTML = '';
    paginatedItems.forEach(category => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = category;
        list.appendChild(listItem);
    });
}

function setupPagination(categories, itemsPerPage) {
    const paginationUl = document.getElementById('pagination');
    paginationUl.innerHTML = '';
    const pageCount = Math.ceil(categories.length / itemsPerPage);

    // Previous Button
    const prevLi = document.createElement('li');
    prevLi.className = 'page-item';
    const prevLink = document.createElement('a');
    prevLink.className = 'page-link';
    prevLink.href = '#';
    prevLink.setAttribute('aria-label', 'Previous');
    prevLink.innerHTML = '<span aria-hidden="true">&laquo;</span>';
    prevLink.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCategories(categories, currentPage);
        }
    });
    prevLi.appendChild(prevLink);
    paginationUl.appendChild(prevLi);

    // Page Numbers
    for (let i = 1; i <= pageCount; i++) {
        const pageLi = document.createElement('li');
        pageLi.className = 'page-item';
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            currentPage = i;
            displayCategories(categories, currentPage);
        });
        pageLi.appendChild(pageLink);
        paginationUl.appendChild(pageLi);
    }

    // Next Button
    const nextLi = document.createElement('li');
    nextLi.className = 'page-item';
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.href = '#';
    nextLink.setAttribute('aria-label', 'Next');
    nextLink.innerHTML = '<span aria-hidden="true">&raquo;</span>';
    nextLink.addEventListener('click', () => {
        if (currentPage < pageCount) {
            currentPage++;
            displayCategories(categories, currentPage);
        }
    });
    nextLi.appendChild(nextLink);
    paginationUl.appendChild(nextLi);
}


///////////////////

function populateCategoriesList() {
    const list = document.getElementById('categoriesList');
    foodCategories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = category;
        list.appendChild(listItem);
    });
}

function displayPredictions(data) {
    const resultDiv = document.getElementById('result');
    const top5PredictionsCard = document.getElementById('top5PredictionsCard');
    const top5PredictionsList = document.getElementById('top5PredictionsList');

    // Clear previous content
    resultDiv.innerHTML = '';
    top5PredictionsList.innerHTML = '';

    // Display the predicted class
    resultDiv.className = 'alert alert-success';
    resultDiv.textContent = "Predicted Class: " + data.predicted_class;

    // Populate and display the top 5 predictions card
    if (data.top_5_predictions && data.top_5_predictions.length > 0) {
        data.top_5_predictions.forEach(prediction => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

            const text = document.createElement('span');
            text.textContent = `${prediction.class}: ${prediction.probability.toFixed(2)}%`;
            listItem.appendChild(text);

            const bar = document.createElement('div');
            bar.className = 'progress';
            bar.style.width = '50%';

            const barFill = document.createElement('div');
            barFill.className = 'progress-bar bg-success';
            barFill.style.width = `${prediction.probability.toFixed(2)}%`;
            bar.appendChild(barFill);

            listItem.appendChild(bar);
            top5PredictionsList.appendChild(listItem);
        });
        top5PredictionsCard.classList.remove('d-none');
    } else {
        top5PredictionsCard.classList.add('d-none');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    populateCategoriesList();  // Assuming this function populates the full list
    displayCategories(foodCategories, 1);  // Display first page
    setupPagination(foodCategories, itemsPerPage);  // Setup initial pagination
});

document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCategories = foodCategories.filter(cat => cat.toLowerCase().includes(searchTerm));
    displayCategories(filteredCategories, 1); // Display the first page of filtered results
    setupPagination(filteredCategories, itemsPerPage); // Update pagination based on filtered results
});

document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const imagePreviewCard = document.getElementById('imagePreviewCard');
    const imagePreview = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreviewCard.classList.replace('d-none', 'd-block');
        };
        reader.readAsDataURL(file);
    } else {
        imagePreviewCard.classList.replace('d-block', 'd-none');
    }
});

document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const submitBtn = document.getElementById('submitBtn');
    const resultDiv = document.getElementById('result');
    const spinner = document.getElementById('spinner');
    const buttonText = document.getElementById('buttonText');

    // Clear previous results
    resultDiv.className = 'alert d-none';
    resultDiv.textContent = '';

    // Check if the image is selected
    if (!imageInput.files || imageInput.files.length === 0) {
        resultDiv.className = 'alert alert-danger';
        resultDiv.textContent = 'Please select an image.';
        return;
    }

    // Disable button and show loading
    spinner.classList.remove('d-none');
    submitBtn.disabled = true;
    buttonText.textContent = 'Loading...';


    // Read the image file and convert to base64
    const reader = new FileReader();
    reader.onload = function () {
        const base64Image = reader.result.split(',')[1]; // Remove the prefix "data:image/*;base64,"

        // Function to handle API request
        function makeRequest(attempt) {
            fetch('https://z6hubwmjj8.execute-api.us-east-1.amazonaws.com/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: base64Image }),
                mode: 'cors'
            })
                .then(response => {
                    if (response.ok && response.headers.get("content-type").includes("application/json")) {
                        return response.json();
                    } else {
                        throw new Error('Invalid response format');
                    }
                })
                .then(data => {
                    submitBtn.disabled = false;
                    buttonText.textContent = 'Classify Image';
                    spinner.classList.add('d-none');
                    if (data.predicted_class) {
                        displayPredictions(data);
                    } else {
                        throw new Error('Prediction not found in response');
                    }
                })
                .catch(error => {
                    if (attempt < 2) {
                        makeRequest(attempt + 1); // Retry
                    } else {
                        submitBtn.disabled = false;
                        buttonText.textContent = 'Classify Image';
                        resultDiv.className = 'alert alert-danger';
                        resultDiv.textContent = 'Error: ' + error.message;
                    }
                })
                .finally(() => {
                    // Hide spinner and enable button
                    spinner.classList.add('d-none');
                    submitBtn.disabled = false;
                    buttonText.textContent = 'Classify Image';
                });
        }

        // Initial API request
        makeRequest(0);
    };

    reader.readAsDataURL(imageInput.files[0]);
});