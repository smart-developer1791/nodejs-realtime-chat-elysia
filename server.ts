import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { html } from '@elysiajs/html'

// ----------------------------
// HTML Chat Interface
// ----------------------------
const chatHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <!-- Ensure proper scaling on mobile devices -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Real-time Chat</title>
  <!-- TailwindCSS CDN for styling -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-200 flex items-center justify-center h-screen">

  <!-- Nickname Modal -->
  <div id="nicknameModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-8 w-80 shadow-lg flex flex-col items-center">
      <h2 class="text-xl font-bold mb-4">Enter your name</h2>
      <input id="nicknameInput" type="text" placeholder="Your name"
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"/>
      <button id="nicknameBtn" class="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-semibold">Join Chat</button>
    </div>
  </div>

  <!-- Chat Container -->
  <div id="chatContainer" class="hidden flex flex-col h-[80vh] w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
    <!-- Messages will appear here -->
    <div id="chat" class="flex-1 p-4 overflow-y-auto flex flex-col gap-2"></div>
    <!-- Message input area -->
    <div class="flex p-4 bg-gray-100">
      <input id="msg" type="text" placeholder="Type a message..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      <button onclick="sendMessage()"
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-full hover:bg-blue-600 transition-colors">Send</button>
    </div>
  </div>

  <script>
    // ----------------------------
    // Client-side variables
    // ----------------------------
    let username = '';
    const nicknameModal = document.getElementById('nicknameModal');
    const nicknameInput = document.getElementById('nicknameInput');
    const nicknameBtn = document.getElementById('nicknameBtn');
    const chatContainer = document.getElementById('chatContainer');
    const chatDiv = document.getElementById('chat');

    // Object to assign unique colors to each user
    const colors = {};

    function getColor(user) {
      if (!colors[user]) {
        colors[user] = 'hsl(' + (Math.random() * 360) + ', 70%, 80%)';
      }
      return colors[user];
    }

    let ws; // WebSocket instance

    // ----------------------------
    // Handle nickname modal
    // ----------------------------
    nicknameBtn.addEventListener('click', () => {
      const value = nicknameInput.value.trim();
      if (!value) return; // Do not allow empty name
      username = value;
      // Hide modal and show chat container
      nicknameModal.classList.add('hidden');
      chatContainer.classList.remove('hidden');
      initWebSocket();
    });

    // ----------------------------
    // Initialize WebSocket
    // ----------------------------
    function initWebSocket() {
      const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
      ws = new WebSocket(protocol + "//" + location.host + "/ws");

      // Handle incoming messages
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        const div = document.createElement("div");

        // Align message: own messages to right, others to left
        const align = msg.user === username ? "self-end" : "self-start";

        div.className = "p-3 rounded-xl max-w-[70%] break-words " + align;
        div.style.background = getColor(msg.user);
        div.style.transition = "all 0.3s ease";
        div.style.opacity = "0"; // start transparent for fade-in effect
        div.innerHTML = '<span class="font-bold">' + msg.user + ':</span> ' + msg.text;

        chatDiv.appendChild(div);
        setTimeout(() => div.style.opacity = "1", 50); // fade-in animation
        chatDiv.scrollTop = chatDiv.scrollHeight; // auto-scroll to bottom
      };
    }

    // ----------------------------
    // Send message function
    // ----------------------------
    function sendMessage() {
      const input = document.getElementById("msg");
      if (!input.value || !ws) return;
      ws.send(JSON.stringify({ user: username, text: input.value }));
      input.value = "";
    }

    // Send message on Enter key press
    document.getElementById("msg").addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  </script>

</body>
</html>
`

// ----------------------------
// Server-side variables
// ----------------------------

// Set of connected WebSocket clients
const clients = new Set<any>()

// Store chat history for new connections
const history: { user: string; text: string }[] = []

// ----------------------------
// Create Elysia server with Node adapter
// ----------------------------
const app = new Elysia({ adapter: node() }).use(html())

// Serve the chat HTML page
app.get('/', () => chatHTML)

// ----------------------------
// WebSocket endpoint
// ----------------------------
app.ws('/ws', {
  open(ws) {
    // Save raw WebSocket object
    clients.add(ws.raw)

    // Send chat history to newly connected client
    for (const msg of history) {
      ws.raw.send(JSON.stringify(msg))
    }
  },

  message(_ws, message) {
    const msg = JSON.parse(message as string)

    history.push(msg) // store message in history

    // Broadcast message to all connected clients
    for (const client of clients) {
      if (client && client.send) {
        client.send(JSON.stringify(msg))
      }
    }
  },

  close(ws) {
    clients.delete(ws.raw) // remove client on disconnect
  }
})

// ----------------------------
// Start server
// ----------------------------

// Port configuration with environment variable fallback
const PORT = Number(process.env.PORT) || 8080

// Start the HTTP server
app.listen(PORT, () => {
  console.log('='.repeat(60))
  console.log('  💬 REAL-TIME CHAT')
  console.log('='.repeat(60))
  console.log(`  🚀 Server:       http://localhost:${PORT}`)
  console.log(`  📝 Frontend SPA: http://localhost:${PORT}`)
  console.log('='.repeat(60))
  console.log("  Runtime: Node.js via @elysiajs/node adapter")
  console.log('  Press Ctrl+C to stop')
  console.log('='.repeat(60))
})
