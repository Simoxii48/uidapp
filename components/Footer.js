import tw from "tailwind-styled-components"

const Footer = () => {
  return (
    <Container>
      <FooterContainer>
        A limited NFT Collection 
      </FooterContainer>
    </Container>
  )
}

export default Footer

const FooterContainer = tw.div`
max-w-screen-md
w-full
`

const Container = tw.div`
flex
justify-center
my-5
`