import React from 'react';
import { Spinner, ListGroup, ListGroupItem, Navbar, Pagination, Nav } from 'react-bootstrap';
import { connect } from 'react-redux'
import { actions } from './actions/index';

const mstp = (state) => ({
  state: {
    data: state.data,
    app: state.app,
  }
})

const shortenUrl = (url) => {
  if (url === undefined) {
    return 'news.ycombinator.com'
  }
  return url.split('/')[2]
}

const ListStories = connect(mstp)((props) => {
  const { storyIDs, stories } = props.state.data
  const { page } = props.state.app

  const navigate = (page) => {
    props.dispatch(actions.Navigate({
      storyIDs, stories, page
    }))
  }

  const isFirst = () => page === 1
  const isLast = () => page === stories.length
  return <div>
    {
      stories[page-1].map(s => (
        <ListGroupItem
          onClick={() => window.open(s.url)}
          className='listItem'
          key={s.id}>
          <h5>{s.title}</h5>
          <span>({shortenUrl(s.url)})</span>
          <p>{s.score} points by {s.by} | {s.descendants} comments</p>
        </ListGroupItem>
      ))
    }
    <ListGroupItem className='listItem'>
      <Pagination>
        <Pagination.First
          onClick={() => navigate(1)}
          disabled={isFirst()} />
        <Pagination.Prev
          onClick={() => navigate(page-1)}
          disabled={isFirst()} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next
          onClick={() => navigate(page+1)}
          disabled={isLast()} />
        <Pagination.Last
          onClick={() => navigate(stories.length)}
          disabled={isLast()} />
      </Pagination>
    </ListGroupItem>
  </div>
})

const Container = (props) => (
  <div id='container'>{props.children}</div>
)

const Heading = connect(mstp)((props) => {
  return (
    <Navbar sticky='top' bg='dark' variant='dark'>
      <Navbar.Brand>HackerNews</Navbar.Brand>
    </Navbar>
  )
})

const App = (props) => {
  const { isLoading, stories } = props.state.data
  const { page } = props.state.app

  const noStories = props.state.data.storyIDs.length === 0

  if (!isLoading && noStories) {
    props.dispatch(actions.FetchIDs({ page: 1 }))
  }

  if (noStories || isLoading) {
    return (
      <div className="App">
        <Heading />
        <Container>
          <ListGroup>
            <ListGroup.Item className='listItem'>
              <Spinner
                className='spinner'
                animation='border' />
            </ListGroup.Item>
          </ListGroup>
        </Container>
      </div>
    )
  }
  
  return (
    <div className="App">
      <Heading />
      <Container>
        <ListGroup>
          <ListStories
            currentPage={page}
          />
        </ListGroup>
      </Container>
    </div>
  )
}

export default connect(mstp)(App);