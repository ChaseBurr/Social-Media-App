import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import PostForm from "./../components/PostForm";
import PostCard from "./../components/PostCard";

import { AuthContext } from "./../context/auth";
import { FETCH_POSTS_QUERY } from "./../util/graphql";

export default function Home() {
     const { user } = useContext(AuthContext);
     const { loading, data: { getPosts: posts } = {} } = useQuery(
          FETCH_POSTS_QUERY
     );

     return (
          <div className="posts">
               {
                    // let user add post if logged in
                    user && <PostForm />
               }

               {loading ? (
                    <h1>Loading posts..</h1>
               ) : (
                    <Transition.Group>
                         {posts &&
                              posts.map((post) => (
                                   <Grid.Column key={post.id}>
                                        <PostCard post={post} />
                                   </Grid.Column>
                              ))}
                    </Transition.Group>
               )}
          </div>
     );
}
