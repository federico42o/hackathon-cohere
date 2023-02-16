

export const updateEvent = new Event('update');

export function addChat(user, message) {
  if (user.trim() !== '' && message.trim() !== '') {
    const chat = [...JSON.parse(localStorage.getItem('chats')), { user, message, time: new Date().toLocaleString() }];
    localStorage.setItem('chats', JSON.stringify(chat));
    window.dispatchEvent(updateEvent);
  }
}
