import React, {useState} from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './styles.module.css'

const FileUpload = ({setSelectedFile}) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file)
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.container}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUpload