const deleteButtons = document.querySelectorAll('.delete-btn');

deleteButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const id = button.getAttribute('data-id');

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete post');
    }
  });
});


  const editButton = document.querySelector('.edit-btn');

editButton.addEventListener('click', async () => {
  const postId = editButton.dataset.id;

  try {
    const response = await fetch(`/api/posts/${postId}/edit`, {
      method: 'PUT',
      body: JSON.stringify({ /* updated post data */ }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const post = await response.json();
      // update post on the client side with new data
      // e.g. update the post title, content, etc.
    } else {
      alert('Failed to update post');
    }
  } catch (err) {
    console.error(err);
    alert('Failed to update post');
  }
});

