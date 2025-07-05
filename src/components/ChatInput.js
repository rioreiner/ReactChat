const ChatInput = ({ input, setInput, loading, sendMessage, inputRef, handleUserInteract }) => (
  <form onSubmit={sendMessage} className="chat-input-area">
    <input
      ref={inputRef}
      value={input}
      onChange={e => { setInput(e.target.value); handleUserInteract(); }}
      placeholder="Type your message..."
      disabled={loading}
      autoComplete="off"
    />
    <button type="submit" disabled={loading || !input.trim()}>
      {loading ? '...' : 'Send'}
    </button>
  </form>
);

export default ChatInput;