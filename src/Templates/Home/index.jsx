import { Component } from 'react';
import { Button } from '../../Components/Button';
import { InputText } from '../../Components/InputText';
import { Posts } from '../../Components/Posts';
import { loadPost } from '../../Utils/load-post';
import './styles.css';

export default class Home extends Component{
  state = {
    posts: [],
    allPosts:[],
    pg:0,
    ptsperpg: 10,
    searchValue: ''
  }

  componentDidMount(){
    //executa apenas uma vez o conteudo, useEffect ancestral
    this.loadPosts()
  }
  componentDidUpdate(){
    //executa toda vez q o conteudo é atualizado
  }
  loadPosts = async () =>{
    const {pg, ptsperpg} = this.state
    const postAndPhotos = await loadPost()
    this.setState({
      posts: postAndPhotos.slice(pg, ptsperpg) ,
      allPosts: postAndPhotos
    
    })
  }
  loadMorePost = () =>{
    const {
      posts,
      allPosts,
      pg,
      ptsperpg
    } = this.state
    const nextpg = pg + ptsperpg
    const nextsposts = allPosts.slice(nextpg, nextpg + ptsperpg)
    posts.push(...nextsposts)
    this.setState({posts, pg:nextpg})
  }
  handleChange = (e) =>{
    const {value} = e.target
    this.setState({searchValue: value})
  }
  render(){
    const {posts, pg, ptsperpg, allPosts, searchValue} = this.state
    const noMorePost = pg + ptsperpg >=allPosts.length

    const filtered = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts
    return(
      <section className='container' >
        <div className="search-container">
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}
          <InputText handleChange={this.handleChange} searchValue={searchValue} />
        </div>

        {filtered.length > 0 && (
        <Posts posts={filtered}/>
        )}

        {filtered.length === 0 && (
         <p>Não achamos o post que queria</p>
        )}

        {!searchValue && (
        <div className="button-container">
          <Button disabled={noMorePost} onclick={this.loadMorePost} />
        
        </div>
        )}
      </section>
    )
  }
}
