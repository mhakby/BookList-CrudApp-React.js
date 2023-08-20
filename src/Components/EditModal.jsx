const EditModal = (props) => {
  return (
    <div className="delete-modal">
      <div className="modal-inner">
        <h5>Edit The Book Name</h5>
        <input
          value={props.editingItem.title}
          className="form-control shadow"
          type="text"
          onChange={(e) =>
            props.setEditingItem({
              ...props.editingItem,
              title: e.target.value,
              date: new Date(),
            })
          }
        />
        <div className="d-flex justify-content-between mt-4">
          <button
            onClick={() => props.setShowEdit(false)}
            className="btn btn-dark"
          >
            Cancel
          </button>
          <button
            onClick={() => props.updateItem()}
            className="btn btn-success "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
