import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LibraryTable from './LibraryTable';

function AdminPage() {
    const [books, setBooks] = useState({
        title: '',
        author: '',
        subject: '',
        publishDate: '',
        availableCopies: '', // Make availableCopies a string for flexibility
    });

    const [bookList, setBookList] = useState([]);

    const handleInput = (event) => {
        setBooks((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('https://library-management-0gvn.onrender.com/addBook', books)
            .then((response) => {
                console.log(response.data);
                setBookList((prevBooks) => [...prevBooks, response.data]);
                setBooks({
                    title: '',
                    author: '',
                    subject: '',
                    publishDate: '',
                    availableCopies: '',
                });
            })
            .catch((error) => {
                console.error('Error adding book:', error);
            });
    };

    const handleRemove = (bookId) => {
        axios.post('https://library-management-0gvn.onrender.com/removeBook', { id: bookId })
            .then((response) => {
                if (response.data.success) {
                    setBookList((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
                } else {
                    console.error('Error removing book:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error removing book:', error);
            });
    };

    useEffect(() => {
        axios.get('https://library-management-0gvn.onrender.com/getBooks')
            .then((response) => {
                setBookList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });
    }, []);

    return (
        <div style={{ background: '#1e1e1e', color: '#fff', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h1>Welcome, Admin!</h1>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Add Book</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" value={books.title} onChange={handleInput} style={{ marginLeft: '10px', padding: '5px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="author">Author</label>
                        <input type="text" name="author" value={books.author} onChange={handleInput} style={{ marginLeft: '10px', padding: '5px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="subject">Subject</label>
                        <input type="text" name="subject" value={books.subject} onChange={handleInput} style={{ marginLeft: '10px', padding: '5px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="publishDate">Publish Date</label>
                        <input type="text" name="publishDate" value={books.publishDate} onChange={handleInput} style={{ marginLeft: '10px', padding: '5px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input type="text" name="availableCopies" value={books.availableCopies} onChange={handleInput} style={{ marginLeft: '10px', padding: '5px' }} />
                    </div>
                    <button type='submit' style={{ marginLeft: '10px', padding: '5px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                        Add Book
                    </button>
                </form>
            </div>

            <div>
                <h2>Book List</h2>
                <LibraryTable
                    books={bookList}
                    onRemove={handleRemove}
                    isAdmin={true}
                />
            </div>
        </div>
    );
}

export default AdminPage;


