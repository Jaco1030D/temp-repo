import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Button } from '../../Components/Button';
import { InputText } from '../../Components/InputText';
import { Posts } from '../../Components/Posts';
import { loadPost } from '../../Utils/load-post';
import './styles.css';

const Home = () =>{
  
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  const loadPosts = useCallback(async (page, postPerPage) =>{
    const postAndPhotos = await loadPost()
    setPosts(postAndPhotos.slice(page, postPerPage))
    setAllPosts(postAndPhotos)
  }, [])
  const loadMorePost = () =>{
    const nextpg = page + postsPerPage
    const nextsposts = allPosts.slice(nextpg, nextpg + postsPerPage)
    posts.push(...nextsposts)
    setPage(nextpg)
  }
  useEffect(() =>{
    loadPosts(0, postsPerPage)
  },[loadPosts, postsPerPage])
  const handleChange = (e) =>{
    const {value} = e.target
    setSearchValue(value)
  }
  const filtered = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts
  const result = filtered.length
  const noMorePost = page + postsPerPage >=allPosts.length
  return (
    <section className='container' >
        <div className="search-container">
          {!!searchValue && (
            <>
            <h1>Search value: {searchValue}</h1>
            <p>Encontramos {result} respostas</p>
            </>
          )}
          <InputText handleChange={handleChange} searchValue={searchValue} />
        </div>

        {filtered.length > 0 && (
        <Posts posts={filtered}/>
        )}

        {filtered.length === 0 && (
         <p>Não achamos o post que queria</p>
        )}

        {!searchValue && (
        <div className="button-container">
          <Button disabled={noMorePost} onclick={loadMorePost} />
        
        </div>
        )}
      </section>
  )
}
export default Home

