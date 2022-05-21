const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const userOnChatRoom = document.getElementById("userOnChat");
const RoomList = document.getElementById("RoomList");
const userNameProfile = document.getElementById("userNameProfile");

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// console.log(room);
const socket = io();

// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Print other room to right side bar
socket.on("otherRooms", ({ room_name }) => {
  outputOtherRoom(room_name);
});

// Message from server
socket.on("message", (message) => {
  outputMessage(message);
  userNameProfile.innerText = username;

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Print other room in the list to DOM
const outputOtherRoom = (room_name) => {
  RoomList.innerText = "";
  room_name.forEach((r) => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    const i = document.createElement("i");
    i.classList.add("fa");
    i.classList.add("fa-layer-group");

    const span = document.createElement("span");
    span.innerText = r;
    // console.log(room);
    if (r === room) {
      li.classList.add("item");
      li.classList.add("active");
      a.href = "#";
    } else {
      a.href = `/chat.html?username=${username}&room=${r}`;
      li.classList.add("item");
    }
    a.appendChild(i);
    a.appendChild(span);
    li.appendChild(a);
    RoomList.appendChild(li);
  });
};

// Output message to DOM
const outputMessage = (message) => {
  const li = document.createElement("li");
  if (username === message.username) {
    li.classList.add("me");
  }
  const divName = document.createElement("div");
  const divMessage = document.createElement("div");
  const p = document.createElement("p");
  const spanName = document.createElement("span");
  const spanTime = document.createElement("span");
  spanName.innerText = message.username;
  divName.classList.add("name");
  divName.appendChild(spanName);
  li.appendChild(divName);
  divMessage.classList.add("message");
  p.innerText = message.text;
  spanTime.classList.add("msg-time");
  spanTime.innerText = message.time;
  divMessage.appendChild(p);
  divMessage.appendChild(spanTime);
  li.appendChild(divMessage);
  userList.appendChild(li);
};

// Add room name to DOM
const outputRoomName = (room) => {
  roomName.innerText = room;
};

// Add users to DOM
const outputUsers = (users) => {
  userOnChatRoom.innerText = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const i = document.createElement("i");
    const spanUserName = document.createElement("span");
    i.classList.add("far");
    i.classList.add("fa-check-circle");
    span.classList.add("status");
    span.classList.add("online");

    span.appendChild(i);
    spanUserName.innerText = user.username;
    li.appendChild(span);
    li.appendChild(spanUserName);
    userOnChatRoom.appendChild(li);
  });
};

// Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "../index.html";
  } else {
  }
});
