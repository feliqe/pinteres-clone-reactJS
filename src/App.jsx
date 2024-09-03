import { useState, useEffect, useRef } from 'react'
import { createApi } from "unsplash-js";

import Masonry from '@mui/lab/Masonry';
import InfiniteScroll from 'react-infinite-scroll-component';

import Header from './components/Header'
import Card from "./components/Card";
import { useBookStore } from './store/bookStore';
import './App.css'

const api = createApi({
  //donde se ingresa el access key
  accessKey: "cFOaoeM4H7kuBR_Ok2OS9J-YUBzv-2V3nrGKKjYZONI"
    // import.meta.env.VITE_ACCESKEY
});

function App() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let index = useRef(1);

  const val = useBookStore(state => state.value)

  //se ejecutara al inicio la primera carga
  useEffect(() => {
    index.current = 1;
    setHasMore(true);

    //enviara la consulta al api de la palabra  ingresada
    // perPage - indicamos la cantidad de registro a cargar
    api.search
      .getPhotos({ query: val, perPage: 20, page: index.current })
      .then(result => {
        setData(result.response.results);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [val]);

  //condicion para limitar la carga de imagnes indefinidas (tenemos 50 imagens por 1 hora, para no limitar la consulta)
  const moreData = () => {
    index.current = index.current + 1;
    if (index.current === 3) {
      setHasMore(false);
    }

    api.search
      .getPhotos({ query: val, perPage: 20, page: index.current })
      .then(result => {
        setData(data.concat(result.response.results));
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }

  return (
    <div className="container">
      <Header />
      {/* usamor la libreria de scroll */}
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasMore}
        next={moreData}
        loader={<h4>Loading...</h4>}
        style={{ overflow: 'none' }}
      >
        {/* estilo de formato de las imagenes usando masonry */}
        <Masonry
          columns={{ xs: 2, sm: 3, md: 5 }}
          spacing={{ xs: 1, sm: 2, md: 3 }}
          className='masonry'
        >
          {/* usamoa la data de Card.jsx por medio de item */}
          {data.map(item => (
            <Card key={item.id} item={item}/>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  )
}

export default App