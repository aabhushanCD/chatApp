function ChatBase() {
  return (
    <div className="h-screen w-full flex text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-200 dark:bg-gray-800 shadow-md p-4 border-r border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300 mb-6">ChatApp</h1>

        {/* List of chats/users */}
        <div className="space-y-4">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-700 rounded-lg cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-600">
            Friend 1
          </div>
          <div className="p-3 bg-indigo-100 dark:bg-indigo-700 rounded-lg cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-600">
            Friend 2
          </div>
          <div className="p-3 bg-indigo-100 dark:bg-indigo-700 rounded-lg cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-600">
            Friend 3
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-white dark:bg-gray-800 shadow flex items-center justify-between">
          <h2 className="text-xl font-semibold">Friend 1</h2>
          <span className="text-green-500 text-sm">Online</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 dark:bg-gray-900">
          <div className="bg-indigo-200 dark:bg-indigo-600 p-3 rounded-lg w-fit max-w-xs">
            Hey there!
          </div>
          <div className="bg-white dark:bg-gray-700 p-3 rounded-lg w-fit max-w-xs self-end ml-auto">
            Hello! How are you?
          </div>
          <div className="bg-indigo-200 dark:bg-indigo-600 p-3 rounded-lg w-fit max-w-xs">
            I'm good. What about you?
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-blue-300 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 outline-none mr-2 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBase;
