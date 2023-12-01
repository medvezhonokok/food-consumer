function Middle() {
    return (
        <div className='Middle-buttons'>
            <button onClick={() => {
                alert("notes")
            }}>notes
            </button>
            <button onClick={() => {
                alert("chats")
            }}>chats
            </button>
            <button onClick={() => {
                alert("news")
            }}>news
            </button>
        </div>
    );
}

export default Middle;