const BookCard = ({ data, handleModal, handleRead, handleEditModal }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-5 mb-5 border mx-2 shadow rounded p-3 text-light bg-dark bg-opacity-80 bg-gradient">
        <div>
          <h5 className={data.isRead ? "text-decoration-line-through" : ""}>
            {data.title}
          </h5>

          <p>{new Date(data.date).toLocaleString()}</p>
        </div>
        <div className="btn-group gap-1">
          <button
            onClick={() => handleModal(data.id)}
            className="card-btn btn btn-danger rounded-3"
          >
            Delete
          </button>
          <button
            onClick={() => handleEditModal(data)}
            className="card-btn btn btn-primary rounded-3"
          >
            Edit
          </button>
          <button
            onClick={() => handleRead(data)}
            className="card-btn btn btn-success rounded-3"
          >
            {data.isRead ? "Read" : "Unread"}
          </button>
        </div>
      </div>
    </>
  );
};

export default BookCard;
