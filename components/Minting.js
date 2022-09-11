import tw from 'tailwind-styled-components'
import { useAddress, useDisconnect, useMetamask, useEditionDrop } from "@thirdweb-dev/react";
import { useEffect, useState } from 'react';


const minting = () => {
    const [totalSupply, setTotalSupply] = useState(0);
    const address = useAddress();
    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();
    const editionDrop = useEditionDrop("0xD8Da9C2a267f59901d7D96ccAE6C0c204199bC8D");
    console.log(address);

    const mint = async () => {
        if (editionDrop && address) {
            const tx = await editionDrop.claimTo(address, 0, 1)
            console.log(tx);
        }
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
                    <FilledButton onClick={mint}>
                      MINT
                  </FilledButton>
                  <UnfilledButton onClick={disconnectWallet}>
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

export default minting

const Count = tw.div`
flex
grow
items-center
justify-center

`

const ButtonContainer = tw.div`
mt-2
flex
gap-4
`
const FilledButton = tw.button`
flex-1
bg-[#bfc500] hover:bg-white text-black font-bold py-2 px-4 rounded uppercase h-14
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
w-1/3
bg-black
mt-[-200px]
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