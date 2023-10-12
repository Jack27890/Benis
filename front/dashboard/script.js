let password = prompt("Password", "")

let socket = io();

function sendMessage() {
  const id = document.getElementById("id").value
  const message = document.getElementById("text").value
  const type = document.getElementById("type").value

  socket.emit('message', { id: id, message: message, type: type, password: password });
}
