import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

//components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                console.log("API response:", response);
                if (response.isSuccess) {
                    const data = response.data;
                    if (Array.isArray(data)) {
                        setComments(data);
                    } else {
                        console.warn("API returned data is not an array:", data);
                        setComments([]);
                    }
                } else {
                    console.warn("API call was not successful:", response);
                    setComments([]);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
                setComments([]);
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        try {
            await API.newComment(comment);
            setComment(initialValue);
            setToggle(prev => !prev);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsmin={5} 
                    placeholder="what's on your mind?"
                    onChange={handleChange} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={addComment}
                >Post</Button>             
            </Container>
            <Box>
                {
                    Array.isArray(comments) && comments.length > 0 ? (
                        comments.map(comment => (
                            <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                        ))
                    ) : (
                        <p>No comments yet</p>
                    )
                }
            </Box>
        </Box>
    )
}

export default Comments;
