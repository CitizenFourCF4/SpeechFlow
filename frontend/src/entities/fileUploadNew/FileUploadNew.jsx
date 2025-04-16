import React, { useState } from "react";
import { sendAudio } from 'src/app/store/slices/waveSurferSlice'
import { useDispatch, useSelector } from 'react-redux'
import {  selectIsLoading, setSelectedFile, selectSelectedFile } from 'src/app/store/slices/waveSurferSlice'
import "./app.css";

const FileUploadNew = () => {

  const dispatch = useDispatch();

  const [dragActive, setDragActive] = useState(false);
  const isLoading = useSelector(selectIsLoading)
  const selectedFile = useSelector(selectSelectedFile)

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      console.log(file)
      dispatch(setSelectedFile(file))
    }
  };

  const handleReset = () => {
    dispatch(setSelectedFile(null));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(sendAudio({selectedFile}))
  };

  const handleDrag = function (e) {
    e.preventDefault();
    setDragActive(true);
  };

  const handleLive = function (e) {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = function (e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      dispatch(setSelectedFile(file))
    }
  };

  return (
    <div className="wrapper">
      <h1>Транскрибирование речи</h1>
      <form
        className={`form ${dragActive ? "drag" : ""}`}
        onReset={handleReset}
        onSubmit={handleSubmit}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleLive}
        onDrop={handleDrop}
      >
        {
          selectedFile ? (
            <>
              {isLoading 
              ? <div>Ожидайте! Сервер обрабатывает Ваш запрос</div>
              : <>
                <div className="media_name_wrapper">
                  <div className="media_item">{selectedFile.name}</div>
                </div>
                <button className="button-reset" type="reset">
                Отменить
              </button>
              <button className="button-submit" type="submit">
                Отправить
              </button>
                </>
            }              
            </>
          ) :
          <>
          <h2>Перетащите файлы сюда</h2>
          <p>или</p>
          <label className="label">
            <span>Загрузите файл</span>
            <input
              className="input"
              type="file"
              multiple={true}
              onChange={handleChange}
            />
          </label>
          </>
        }
      </form>
    </div>
  );
}

export default FileUploadNew;