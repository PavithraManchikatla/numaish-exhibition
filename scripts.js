// Example JavaScript for dynamic elements in the future
console.log("Numaish website loaded successfully!");
// Function to handle comment submission
function submitComment() {
    const comment = document.getElementById('comment-box').value;
    if (comment.trim()) {
        alert("Thank you for your idea!");
        document.getElementById('comment-box').value = ''; // Clear the comment box
    } else {
        alert("Please enter a comment before submitting.");
    }
}
// Function to handle review submission
function submitReview() {
    const review = document.getElementById('review-input').value;
    const reviewList = document.getElementById('review-list');

    if (review.trim()) {
        const newReview = document.createElement('p');
        newReview.textContent = review;
        reviewList.appendChild(newReview);
        document.getElementById('review-input').value = ''; // Clear the input
    } else {
        alert("Please enter a review before submitting.");
    }
}
// Function to handle memory image submission
function addMemory() {
    const input = document.getElementById('memory-image');
    const gallery = document.getElementById('memories-gallery');

    if (input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            gallery.appendChild(img);
        }

        reader.readAsDataURL(file);
        input.value = ''; // Clear the input
    } else {
        alert("Please select an image to upload.");
    }
}



