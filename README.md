# Chat App with Gemma 2

This is a simple chat application that integrates with the Gemma 2 model from Hugging Face. The application allows users to chat with the Gemma 2 model in real-time, with support for both light and dark themes.

## Features

- Real-time chat with the Gemma 2 model
- Light and dark theme toggle
- Responsive design for mobile and desktop

## Development

This project is currently under development. To run the application locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/chat-app-gemma2.git
    cd chat-app-gemma2
    ```

2. Open 

index.html

 in your browser to view the application.

## Hugging Face API Key

To use the Gemma 2 model, you need to provide your Hugging Face API key. For security reasons, do not hardcode your API key directly in the code. Instead, consider using environment variables or a configuration file that is not included in version control.

In 

script.js

, replace `YOUR_HUGGING_FACE_API_KEY` with your actual API key:
```js
const response = await fetch('https://api-inference.huggingface.co/models/google/gemma-2', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_HUGGING_FACE_API_KEY' // Replace with your API key
    },
    body: JSON.stringify({
        inputs: userMessage,
    }),
});
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

**Note:** The website works, but you need to implement the Hugging Face API key securely to avoid exposing it publicly.