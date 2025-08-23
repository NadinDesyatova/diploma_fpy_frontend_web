import { useEffect, useState } from 'react';
import UploadFile from './UploadFile';
import { OneFile } from './OneFile';
import { sortByDate } from '../../common/sortingDate';

export function ViewFilesStorage ({id}) {
  const [viewFiles, setViewFiles] = useState([]);
  const [lastFileUpload, setLastFileUpload] = useState(new Date());

  function sendFetchToGetUserFiles (id) {
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}get_user_files/${id}/`, { 
      method: 'GET',
      credentials: 'include' 
    })
    .then(response => {
      console.log(response);
      if (response.ok) {
        return response.json()
      } else {
        return false
      }
    })
    .then(data => {
      if (data) {
        setViewFiles(sortByDate(data));
      }
    })
  }

  useEffect(() => {
    sendFetchToGetUserFiles(id);
  }, []);
  
  useEffect(() => {
    sendFetchToGetUserFiles(id);
  }, [lastFileUpload]);

  return (
    <div className='container'>
      <button className='button-update-files' onClick={() => {setLastFileUpload(new Date())}}>Обновить список файлов</button>
      <UploadFile userId={id} setLastFileUpload={setLastFileUpload}/>
      <ul>
        {viewFiles.map(elem => {
          const fileLink = 
            elem.file_link 
              ? `${import.meta.env.VITE_APP_BASE_URL_WEBSITE}share/${elem.file_link}` 
              : ''
          return <OneFile elem={elem} fileLink={fileLink} setLastFileUpload={setLastFileUpload} />
        })}
      </ul>
    </div>
  );
}
