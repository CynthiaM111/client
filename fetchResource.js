fetch('https://corneredu.s3.us-east-1.amazonaws.com/64e3e6f4206db7467fe78062/modules/1693942439932_Cynthia_Resume.pdf?x-id=PutObject', {
  method: 'GET',
  mode: 'no-cors', // Set the mode to 'no-cors'
})
  .then(response => {
    // Handle the response here
    if (response.ok) {
      // Successful response (status code 200)
      return response.blob(); // You can use response.text() for text-based content
    } else {
      // Handle errors here
      console.error('Fetch request failed with status: ' + response.status);
    }
  })
  .then(data => {
    // Handle the fetched data here
    console.log('Fetched data:', data);
  })
  .catch(error => {
    // Handle any fetch errors here
    console.error('Fetch error:', error);
  });
