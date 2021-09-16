import styled from 'styled-components';

export const Box = styled.div`
background: black;
position: relative;
bottom: 0;
width: 100%;
margin-top: 40px;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	position: relative;
    left: 50%;
    transform: translateX(-50%);
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 40px;
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: #fff;
margin-bottom: 20px;
font-size: 16px;
text-decoration: none;
font-family:Open Sans,sans-serif!important;

&:hover {
	color: green;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 20px;
color: #fff;
margin-bottom: 40px;
font-weight: bold;
font-family:Open Sans,sans-serif!important;
`;


