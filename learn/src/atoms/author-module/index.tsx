import * as React from 'react'

const AuthorModule = ({ avatarUrl, authorName, authorBio }) => {
  return (
    <div className="bg-black-90 pa5 br2 mv5">
      <div className="flex flex-column items-center content-center justify-center tc">
        <div>
          <h4 className="white-80 lato f5 mt0 mb3">Written By:</h4>
        </div>
        {avatarUrl && (
          <div
            className="avatar br-100 w4 h4 bg-white cover mb4"
            style={{
              border: '5px solid #ffffff',
              background: `#000000 url(${avatarUrl}) no-repeat center center`,
            }}
          />
        )}
        <div>
          <h4 className="white lato f3 mt0 mb1">{authorName}</h4>
          {authorBio && <p className="white lato f4 mv0">{authorBio}</p>}
        </div>
      </div>
    </div>
  )
}

export default AuthorModule
