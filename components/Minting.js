import tw from 'tailwind-styled-components'
import { useAddress, useDisconnect, useMetamask, useEditionDrop } from "@thirdweb-dev/react";
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';


const Minting = () => {
    const [totalSupply, setTotalSupply] = useState(0);
    const [inProgress, setInProgress] = useState(false);
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();
    const editionDrop = useEditionDrop("0xB4CaD2a49be498B7C9d5B9E941e7ac3f53Ec4DeB");
    console.log(address);

    const mint = async () => {
      setInProgress(true);
        if (editionDrop && address) {
            const tx = await editionDrop.claimTo(address, 0, 1)
            console.log(tx);
            setInProgress(false)
        }
    }

    const startOver = ()=> {
      setInProgress(false);
      disconnectWallet();
    }

    useEffect(() => {
        const getTotal = async () => {
          if(editionDrop){
            const total = await editionDrop.totalSupply(0);
            setTotalSupply(total.toNumber());
          }
        }

        getTotal();
    }, [editionDrop])

  return (
      <Container>
          <Mint>
              <TitleContainer>
                  <Title>Welcome To<br /> The Popcat <br />Main Club</Title>
                  <Count>
                    { address && totalSupply }
                  </Count>
              </TitleContainer>
              <ButtonContainer>
                {
                    address 
                    ? <> 
                    <FilledButton 
                      disabled={inProgress}
                       onClick={mint}>
                      {
                        inProgress 
                        ? <ReactLoading type="bubbles" color="#000" height={70} />
                        :<>Mint</>
                      }

                  </FilledButton>
                  <UnfilledButton 
                  disabled={inProgress}
                  onClick={disconnectWallet}>
                      DISCONNECT
                  </UnfilledButton>
                </>
                :<FilledButton onClick={connectWithMetamask}>
                Enter Now
            </FilledButton>
                }
                  
              </ButtonContainer>
          </Mint>
      </Container>
  )
}

export default Minting

const Count = tw.div`
flex
grow
items-center
justify-center

`

const ButtonContainer = tw.div`
mt-3
flex
gap-1
`
const FilledButton = tw.button`
flex
justify-center
items-center
flex-1
bg-[#bfc500] hover:bg-white text-black font-bold py-2 px-1 rounded uppercase h-14
`

const UnfilledButton = tw(FilledButton)`
bg-black
text-[#bfc500]
border-2
border-[#bfc500]
hover:bg-[#bfc500]
hover:text-black
`

const Mint = tw.div`
max-w-screen-sm
lg:w-1/3
md:w-1/2
bg-black
lg:mt-[-200px]
flex
flex-col
pb-4
pr-4
`
const Title = tw.h2`
uppercase
text-3xl
italic
font-bold
mt-2
`

const TitleContainer = tw.div`
flex

`



const Container = tw.div`
max-w-screen-md
w-full
z-50
`