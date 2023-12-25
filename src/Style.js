
import { getBoxValue } from './utils/functions';

const Style = ({ attributes, clientId }) => {
  const {padding, alignment } = attributes;


  const mainSl = `#bBlocks-p-compare-${clientId}`;
  const mainCt = `${mainSl} .p-compare-container`; 

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
