
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80) center/55% repeat-x #000;
    height: 90vh;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 40px;
    font-weight: bold;
    font-family: inherit;
    color: black;
    line-height: 1;
    margin-bottom: 10px;
`;

const SubHeading = styled(Typography)`
    font-family: inherit;
    font-size: 25px;
    color: black;
    line-height: 1
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>Publish your passions, your way</Heading>
            <SubHeading>Create a unique and beautiful blog easily.</SubHeading>
        </Image>
    )
}

export default Banner;