import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/spinner';

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:4444/books/${id}`)
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching book:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='p-4'>
      <BackButton destination='/' />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (<Spinner />) :( 
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Id</span>
                <span>{book._id}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Title</span>
                <span>{book.title}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Author</span>
                <span>{book.author}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                <span>{book.publishYear}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Created At</span>
                <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Updated At</span>
                <span>{new Date(book.updatedAt).toString()}</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;