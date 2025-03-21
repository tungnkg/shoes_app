import classNames from 'classnames/bind';
import styles from './CreatedOrUpdatedCategory.module.scss';
import TextField from '@mui/material/TextField';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Select } from 'antd';

const cx = classNames.bind(styles);

function CreatedOrUpdatedCategory(
  { handleCreatedOrUpdated, handleClose, selectedCategory, isEditing, btn, brand }
) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const data = {
    id: isEditing ? selectedCategory.id : null,
    name,
    image,
    description,
  }
  useEffect(() => {
    if (isEditing) {
      setName(selectedCategory.name);
      setImage(selectedCategory.image);
      setDescription(selectedCategory.description);
    }
  }, [isEditing, selectedCategory]);


  console.log(selectedCategory)

  return (
    <>
      <DialogTitle>Thêm danh mục</DialogTitle>
      <DialogContent>
        <div className={cx('container')}>
          <div className={cx('row-form')}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              value={name}
              placeholder="Tên danh mục"
              label="Tên danh mục"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={cx('row-form')}>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              placeholder="Mô tả"
              label="Mô tả"
              type="text"
              fullWidth
              value={description}
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={cx('row-form')}>
            <TextField
              autoFocus
              margin="dense"
              id="image"
              name="image"
              placeholder="Logo"
              label="Logo"
              type="text"
              fullWidth
              value={image}
              variant="standard"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Hủy</Button>
        <Button variant="contained" onClick={() => handleCreatedOrUpdated(data)}>{btn}</Button>
      </DialogActions>
    </>
  );
}

export default CreatedOrUpdatedCategory;
