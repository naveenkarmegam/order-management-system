import React, { useEffect, useRef } from 'react';
import Layout from './layout/Layout';

import { SendFill } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { ftechFeedback, postFeedback,  } from '../features/UserReducer';
import useInterval from './chat/useInterval';


const Community = () => {
  const { feedback } = useSelector((state) => state.users_info);
  const dispatch = useDispatch();
  const messagesContainerRef = useRef();

  const formik = useFormik({
    initialValues: {
      messages: '',
    },
    onSubmit: async (values) => {
      try {
        // const response = await axios.post('https://65615e6adcd355c08323c948.mockapi.io/users', values);
        // dispatch(setFeedback(response.data));
        dispatch(postFeedback(values));
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const fetchFeedbackData = () => {
    dispatch(ftechFeedback());
  };

  useEffect(() => {
    fetchFeedbackData();
  }, []);
  useInterval(() => {
    fetchFeedbackData();
  }, 4000); 
  useEffect(() => {
    if (feedback.length > 0) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [feedback]);

  return (
    <Layout>
      
        <article className='row justify-content-center'>
          <section className='col-lg-8'>
            <div className='card shadow mb-4' style={{ height: '85vh' }}>
              <header className='card-header py-2 text-center bg-orange'>
                <h5 className='m-0 font-weight-bold text-white'>Enjoy with our community</h5>
              </header>
              <main className='card-body overflow-y-auto' ref={messagesContainerRef}>
                {feedback.map((item) => (
                  <div key={item.id} className='mb-3'  >
                    <span className='bg-grey' style={{ display: 'inline-block' }}>{item.messages}</span>
                  </div>
                ))}
              </main>
              <footer className='card-footer p-0 py-3 m-0'>
                <form onSubmit={formik.handleSubmit}>
                  <fieldset className='form-group row justify-content-center m-0'>
                    <div className='col-lg-7'>
                      <input
                        type='text'
                        className='form-control'
                        value={formik.values.messages}
                        onChange={formik.handleChange}
                        name='messages'
                        id='messages'
                      />
                    </div>
                    <button className='col-lg-1 btn bg-orange border-0' disabled={formik.values.messages === ''} type='submit'>
                      <SendFill className='text-white' />
                    </button>
                  </fieldset>
                </form>
              </footer>
            </div>
          </section>
        </article>
     
    </Layout>
  );
};

export default Community;
