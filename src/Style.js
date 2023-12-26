
import { getBoxValue } from './utils/functions';

const Style = ({ attributes, clientId }) => {
  const {padding, alignment } = attributes;

  console.log(alignment);

  //.eael-wcpc-wrapper .eael-wcpc-table th, .eael-wcpc-wrapper .eael-wcpc-table td
 

  const mainSl = `#bBlocks-p-compare-${clientId}`;
  const mainCt = `${mainSl} .eael-wcpc-table th, .eael-wcpc-wrapper .eael-wcpc-table td`; 

  return (
    <style dangerouslySetInnerHTML={{
      __html: `      
     
      // ${mainSl}{ 
      //   // text-align:${alignment};
      // }

      ${mainCt}{
        text-align:${alignment};
        padding:${getBoxValue(padding)}; 
      }`,
    }}
    />
  );
};

export default Style;
