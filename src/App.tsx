import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Content from './containers/Content/Content';
import NewMeal from './containers/NewMeal/NewMeal';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/new-meal" element={<NewMeal />} />
          <Route path="/edit-meal/:id" element={<NewMeal />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;