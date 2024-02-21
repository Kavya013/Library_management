import React, { useState } from 'react';

function LibraryTable({ books, onBorrow, onRemove, isAdmin }) {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const handleClickNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleClickPrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: '#0b3259', color: 'white', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Title</th>
                        <th style={{ backgroundColor: '#0b3259', color: 'white', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Author</th>
                        <th style={{ backgroundColor: '#0b3259', color: 'white', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Subject</th>
                        <th style={{ backgroundColor: '#0b3259', color: 'white', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Publish Date</th>
                        <th style={{ backgroundColor: '#0b3259', color: 'white', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Available Copies</th>
                        {isAdmin && <th style={{ backgroundColor: '#4CAF50', color: 'white', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentBooks.map((book) => (
                        <tr key={book.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{book.title}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{book.author}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{book.subject}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{book.publishDate}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{book.availableCopies}</td>
                            {isAdmin ? (
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                                    <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} onClick={() => onRemove(book.id)}>Remove</button>
                                </td>
                            ) : (
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                                    <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} onClick={() => onBorrow(book.id)}>Borrow</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {currentPage > 1 && (
                    <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} onClick={handleClickPrev}>Previous</button>
                )}
                {currentBooks.length === itemsPerPage && (
                    <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} onClick={handleClickNext}>Next</button>
                )}
            </div>
        </div>
    );
}

export default LibraryTable;

