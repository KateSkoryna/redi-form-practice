const Message = ({ children}: {children: string}) => {
    return (
        <p className="error">
            {children}
        </p>
    )
}

export default Message;