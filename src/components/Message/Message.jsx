const Message = ({ notification }) => {
    return (
        <>
            <div
                id="notificationHeader"
                className="flex justify-around items-center text-2xl font-bold"
            >
                {notification.image && (
                    <div id="imageContainer" className="flex items-center h-24">
                        <img src={notification.image} width={100} className="object-contain" />
                    </div>
                )}
                <span>{notification.title}</span>
            </div>
            <div id="notificationBody" className="mt-2 text-center">
                {notification.body}
            </div>
        </>
    );
};

export default Message;