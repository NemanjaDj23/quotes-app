import React from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './AddQuoteModal.module.scss';
import { QuoteInput } from '../../http-services/quotes';

const initialFormData = {
  content: '',
  author: '',
  tags: '',
};

type AddModalProps = {
  onClose: () => void;
  onSubmit: (formData: QuoteInput) => void;
};

function AddQuoteModal(props: AddModalProps) {
  const { onClose, onSubmit } = props;
  const { values, handleChange } = useForm(initialFormData);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ ...values, tags: values.tags.split(', ') });
  };

  return (
    <div className={styles.addQuoteModal}>
      <div className={styles.overlay} onClick={onClose}></div>
      <form className={styles.content} onSubmit={handleSubmit}>
        <div className='formGroup'>
          <label>Content</label>
          <textarea rows={4} name='content' value={values.content} onChange={handleChange} />
        </div>
        <div className='formGroup'>
          <label>Author</label>
          <input type='text' name='author' value={values.author} onChange={handleChange} />
        </div>
        <div className='formGroup'>
          <label>Tags</label>
          <input type='text' name='tags' value={values.tags} onChange={handleChange} />
        </div>
        <button type='submit'>Add Quote</button>
      </form>
    </div>
  );
}

export default React.memo(AddQuoteModal);
