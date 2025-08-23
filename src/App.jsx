import './App.css';
import MainHeader from './ui/main-header/MainHeader';
import { StartPage } from './ui/start-page/StartPage';
import { FilesWelcome } from './ui/files/FilesWelcome';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AdminPage } from './ui/admin/AdminPage';
import { UserFilesForAdmin } from './ui/admin/UserFilesForAdmin';
import { ShareFilePage } from './ui/share-file-page/ShareFilePage';

function App() {
  // mainRoute = "/diploma_fpy_frontend_web/";

  return (
    <div className="main-container">
      <MainHeader />
      <BrowserRouter>
        <Routes>
          <Route path={`${import.meta.env.VITE_APP_BASE_MAIN_PATH}`} element={<StartPage />} />
          <Route path={`${import.meta.env.VITE_APP_BASE_MAIN_PATH}/files`} element={<FilesWelcome />} />
          <Route path={`${import.meta.env.VITE_APP_BASE_MAIN_PATH}/admin`} element={<AdminPage />} />
          <Route path={`${import.meta.env.VITE_APP_BASE_MAIN_PATH}/user_files`} element={<UserFilesForAdmin />} />
          <Route path={`${import.meta.env.VITE_APP_BASE_MAIN_PATH}/share/:fileLink`} element={<ShareFilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
