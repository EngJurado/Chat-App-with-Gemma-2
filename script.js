document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Function to update the toggle button text based on the current theme
    function updateToggleButton() {
        if (document.body.classList.contains('dark-theme')) {
            themeToggleBtn.textContent = 'Switch to Light Mode ☀️';
        } else {
            themeToggleBtn.textContent = 'Switch to Dark Mode 🌙';
        }
    }

    // Initial call to set the correct toggle button text on page load
    updateToggleButton();

    // Toggle between light and dark themes
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        }

        // Update the toggle button text after switching themes
        updateToggleButton();
    });

    // Function to add a message to the chat box
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        
        if (sender === 'You') {
            messageElement.classList.add('user-message');
        } else {
            messageElement.classList.add('bot-message');
        }

        messageElement.textContent = message;
        chatBox.appendChild(messageElement);

        // Auto-scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;

        // Adjust chat box height dynamically
        adjustChatBoxHeight();
    }

    // Function to adjust chat box height dynamically
    function adjustChatBoxHeight() {
        const messages = chatBox.querySelectorAll('.message');
        const totalHeight = Array.from(messages).reduce((acc, msg) => acc + msg.offsetHeight, 0);

        // Set a minimum height of 100px and a maximum height of 400px
        const newHeight = Math.min(Math.max(totalHeight + 20, 100), 400);
        chatBox.style.height = `${newHeight}px`;
    }

    // Function to send user input to Gemma 2 model
    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        // Add user message to chat
        addMessage('You', userMessage);

        // Clear input field
        userInput.value = '';

        // Send message to Gemma 2 model
        try {
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

            const data = await response.json();

            if (response.ok) {
                const botMessage = data[0]?.generated_text || "Sorry, I couldn't understand that.";
                addMessage('Gemma 2', botMessage);
            } else {
                addMessage('Gemma 2', "Oops! Something went wrong.");
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage('Gemma 2', "An error occurred while processing your request.");
        }
    }

    // Event listener for send button
    sendBtn.addEventListener('click', sendMessage);

    // Allow sending message by pressing Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});