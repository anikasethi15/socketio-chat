const socket = io("http://localhost:5000");

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");
const usernameInput = document.getElementById("username");

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

socket.on("chatMessage", (data) => {
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
});

function sendMessage() {
  const user = usernameInput.value || "Anonymous";
  const message = messageInput.value;
  if (message.trim()) {
    socket.emit("chatMessage", { user, message });
    messageInput.value = "";
  }
}
