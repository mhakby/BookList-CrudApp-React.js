const DeleteModal = (props) => {
  return (
    <div className="delete-modal">
      <div className="modal-inner">
        Do you confirm the deletion?
        <button
          onClick={() => props.handleDelete()}
          className="btn btn-danger rounded-3 mt-3"
        >
          Confirm
        </button>
        <button
          onClick={() => props.setShowDelete(false)}
          className="btn btn-dark rounded-3"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
