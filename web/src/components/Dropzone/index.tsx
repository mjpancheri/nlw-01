import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

import {FiUpload, FiTrash2} from 'react-icons/fi';
import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}
const Dropzone: React.FC<Props> = ({onFileUploaded}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} accept="image/*"/>
        { selectedFileUrl ?
          <img src={selectedFileUrl} alt="Imagem do estabelecimento" /> : 
          isDragActive ?
            <p>Solte o arquivo aqui ...</p> :
            <p><FiUpload/>Imagem do estabelecimento</p>
        }
      </div>
      {selectedFileUrl ?
        <FiTrash2 size={32} className="dropzoneIcon" onClick={() => {setSelectedFileUrl('')}}/> :
        <span></span>
      }
    </div>
  )
}

export default Dropzone;