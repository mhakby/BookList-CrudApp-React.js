import { useState } from "react";
import { v4 as uniqId } from "uuid";
import BookCard from "./Components/BookCard";
import DeleteModal from "./Components/DeleteModal";
import EditModal from "./Components/EditModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [books, setBooks] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();

    // İnputtaki kitap ismine erişme
    const title = e.target[0].value;

    if (!title) {
      toast.error("Please enter a book name...");
      return;
    }

    // kitap için obje oluşturma
    const newBook = {
      id: uniqId(),
      title,
      date: new Date(),
      isRead: false,
    };

    setBooks([newBook, ...books]);

    // İnputu temizleme
    e.target[0].value = "";

    //kitap eklenince bildirim alma
    toast.success("The book has been added..");
  };

  // Silme modal'ı için fonk.
  const handleModal = (id) => {
    setShowDelete(true);

    setDeleteId(id);
  };

  // silme işlemini yapar
  const handleDelete = () => {
    const filtred = books.filter((book) => book.id !== deleteId);

    // State'i günceller
    setBooks(filtred);

    // Modal'ı kapat
    setShowDelete(false);

    // Bildirim verme
    toast.warn("The book has been deleted..");
  };

  // Okundu işleminde çalışacak fonk.
  const handleRead = (editItem) => {
    const updatedRead = { ...editItem, isRead: !editItem.isRead };

    // State'in kopyasını alma
    const clone = [...books];

    // düzenlenecek elemanın sırasını bulma
    const index = books.findIndex((book) => book.id === updatedRead.id);

    // Clone diziyi güncelleme
    clone[index] = updatedRead;

    setBooks(clone);

    toast.info("The status of the book has been changed..");
  };

  // Hangi elemanı düzenleyeceğimizin fonk.
  const handleEditModal = (item) => {
    setShowEdit(true);

    setEditingItem(item);
  };

  // Editlenen elemanı güncelleme
  const updateItem = () => {
    // kitaplar dizisindeki bir elemanı güncelleme
    const newBooks = books.map((book) =>
      book.id !== editingItem.id ? book : editingItem
    );

    // state'i güncelleme
    setBooks(newBooks);

    // modal'ı kapatma
    setShowEdit(false);

    // bildirim
    toast.info("The book has been edited..");
  };

  return (
    <div className="App bg-dark bg-gradient">
      <div className="center-area border border-black border-3 border-top-0">
        <header className="bg-dark bg-gradient text-light py-2 fs-5 text-center">
          Book List
        </header>
        {/* Main */}
        <main className="container main">
          <form onSubmit={handleSubmit} className="d-flex gap-3 mt-5 p-4 mx-2">
            <input
              placeholder="Enter a book name..."
              className="form-control shadow"
              type="text"
            />
            <button className="btn btn-warning ">Add</button>
          </form>

          {/* Kitaplar dizisi boşsa*/}
          {books.length === 0 && (
            <h5 className="mt-5 text-center text-body-secondary opacity-50">
              Please make time for reading books :)
            </h5>
          )}

          {/* Kitaplar Listesi doluysa */}
          {books.map((book) => (
            <BookCard
              key={book.id}
              handleModal={handleModal}
              data={book}
              handleRead={handleRead}
              handleEditModal={handleEditModal}
            />
          ))}
        </main>

        {/* Modal */}
        {showDelete && (
          <DeleteModal
            setShowDelete={setShowDelete}
            handleDelete={handleDelete}
          />
        )}

        {showEdit && (
          <EditModal
            editingItem={editingItem}
            setShowEdit={setShowEdit}
            setEditingItem={setEditingItem}
            updateItem={updateItem}
          />
        )}

        {/* Bildirimler için  */}
        <ToastContainer autoClose={2500} />
      </div>
    </div>
  );
}

export default App;
