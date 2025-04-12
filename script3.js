const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

let conversationHistory = [
    { role: "assistant", content: "Hello! How can I help you today?" }
];

// Function to add a message to the chatbox
function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
    messageElement.textContent = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Function to show/hide typing indicator
function showTypingIndicator(show) {
    let indicator = chatbox.querySelector('.typing-indicator');
    if (show) {
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.classList.add('message', 'ai-message', 'typing-indicator');
            indicator.textContent = 'AI is typing...';
            chatbox.appendChild(indicator);
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    } else {
        if (indicator) {
            indicator.remove();
        }
    }
}

// Function to handle sending a message
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    displayMessage('user', userMessage);
    conversationHistory.push({ role: 'user', content: userMessage });
    conversationHistory = conversationHistory.slice(-11);

    userInput.value = '';
    sendButton.disabled = true;
    userInput.disabled = true;
    showTypingIndicator(true);

    try {
        // Simulate AI thinking delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock responses
        const responses = {
            "hello": "Hi there! How can I assist you today?",
            "how are you": "I'm just code, but I'm doing great!",
            "what is your name": "I'm your MedLife assistant.",
            "bye": "Goodbye! Take care!",
        };

        const fallbackResponses = [
            "Can you tell me more?",
            "Interesting! Let's explore that.",
            "I'm still learning to answer that.",
            "Hmm... not sure yet, but I'll try!"
        ];

        const lowerCaseMsg = userMessage.toLowerCase();
        const aiResponse = responses[lowerCaseMsg] || fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

        conversationHistory.push({ role: 'assistant', content: aiResponse });

        showTypingIndicator(false);
        displayMessage('ai', aiResponse);

    } catch (error) {
        console.error("Error in mock response:", error);
        showTypingIndicator(false);
        displayMessage('ai', "Oops! Something went wrong.");
    } finally {
        sendButton.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Initial assistant message
window.addEventListener('load', () => {
    displayMessage('ai', "Hello! How can I help you today?");
    userInput.focus();
});
