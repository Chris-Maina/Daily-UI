import React from 'react';
import classes from './App.module.scss';
import { NikeSvg } from './assets/svgs';
import { useCaraousel } from './helpers/caraousel';

function App() {
  const images = [
    {
      text: <>&nbsp;M&nbsp;<sup>O</sup> <sup>F</sup>A<sup>R</sup>AH</>,
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/01.png'
    },
    {
      text: <><sup>Z</sup>&nbsp;<sub>O</sub>&nbsp;O<br />&nbsp;M</>,
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/02.png'
    },
    {
      text: <>PEG<br />ASU</>,
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/03.png'
    },
    {
      text: <>&nbsp;3<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3</>,
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/04.png'
    },
    {
      text: <><sub>S</sub>&nbsp;P<br />R&nbsp;<sub>I</sub>&nbsp;NT</>,
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/05.png'
    },
    {
      text: <>R&nbsp;<sub>U</sub><br />&nbsp;&nbsp;&nbsp;N</>,
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/06.png'
    }
  ]

  const { active, handlers, setActive, style } = useCaraousel(images.length);
  const description = `
    Mo Farah running shoes Nike Air Zoom Pegasus 33 \t
    ID combines perfect fit and fast feel with responsive \t
    cushioning keeps you comfortable for long.
    \n
    This version honors Gen. historic six gold medals that \t
    he had taken two at a time in three different \t 
    championships in the world, with a hairmarke in gold \t
    metallic, specialty printing and more.
  `;
  return (
    <div className={classes.App}>
      <div className={classes.App_Product}>
        <div className={classes.App_Product_Header}>
            <NikeSvg className={classes.App_Product_Header_Logo} />
            <h4>NIKE + RUNNING</h4>
        </div>

        <div className={classes.App_Product_Content}>
            <div className={classes.App_Product_Content_Right}>
              <h1>Mo Farah Nike Air Zoom Pegasus 33 1D</h1>
              <h5>1550 SEK</h5>
              <p>{description}</p>
              <button>+ Add to Cart</button>
            </div>
            <div className={classes.App_Product_Content_Left}>
              <div className={classes.App_Product_Content_Left_Dots}>
                {images.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setActive(index)}
                    className={active === index ?
                      `${classes.App_Product_Content_Left_Dots_Active} ${classes.App_Product_Content_Left_Dots_Dot}`
                      : classes.App_Product_Content_Left_Dots_Dot
                    }
                  />
                ))}
              </div>
              <div className={classes.App_Product_Content_Left_Wrapper} {...handlers} style={style}>
                <div className={classes.App_Product_Content_Left_Wrapper_Image}>
                  <div className={classes.App_Product_Content_Left_Wrapper_Image_Text}>{images[images.length -1].text}</div>
                  <img src={images[images.length - 1].image} alt={`Product ${images.length}`} />
                </div>
                {images.map((el, index) => (
                  <div key={index} className={classes.App_Product_Content_Left_Wrapper_Image}>
                      <div className={classes.App_Product_Content_Left_Wrapper_Image_Text}>{el.text}</div>
                      <img src={el.image} alt={`Product ${index}`} />
                    </div>
                  )
                )}
                <div className={classes.App_Product_Content_Left_Wrapper_Image}>
                  <div className={classes.App_Product_Content_Left_Wrapper_Image_Text}>{images[0].text}</div>
                  <img src={images[0].image} alt={`Product ${0}`} />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
