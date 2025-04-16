import { Route, Routes } from "react-router-dom";
import MainPage from "src/pages/main-page/MainPage";
import OnlinePage from "src/pages/online-page/OnlinePage";
import OfflinePage from "src/pages/offline-page/OfflinePage";
import TestPage from "src/pages/test-page/TestPage";

const Routing = () => {
  return(
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/online" element={<OnlinePage/>} />
      <Route path="/offline" element={<OfflinePage/>} />
      <Route path="/test" element={<TestPage/>} />
    </Routes>
  )
}

export default Routing