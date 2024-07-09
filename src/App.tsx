import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Content from './containers/Content/Content';
import NewMeal from './containers/NewMeal/NewMeal';
import NotFound from './containers/NotFound/NotFound';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/new-meal" element={<NewMeal />} />
          <Route path="/edit-meal/:id" element={<NewMeal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;