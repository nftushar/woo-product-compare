
import { getBoxValue } from './utils/functions';

const Style = ({ attributes, clientId }) => {
  const {padding, alignment } = attributes;


  const mainSl = `#bBlocks-fb-button-${clientId}`;
  const mainCt = `${mainSl} .fb-button-container`; 

  return (
    <style dangerouslySetInnerHTML={{
      __html: `      
     
      ${mainSl}{
        display: grid;
        justify-content:${alignment};
      }

      ${mainCt}{
        padding:${getBoxValue(padding)}; 
      }`,
    }}
    />
  );
};

export default Style;
