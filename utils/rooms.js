const rooms = ["JavaScript", "Python", "Rupy", "React JS"];

// Get room rooms
function getRooms(room) {
  return rooms.filter((userRoom) => userRoom !== room);
}

function getAllRooms() {
  return rooms;
}

module.exports = {
  getRooms,
  getAllRooms,
};
