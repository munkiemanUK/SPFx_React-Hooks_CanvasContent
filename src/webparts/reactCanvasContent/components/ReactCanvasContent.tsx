import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './ReactCanvasContent.module.scss';
import type { IReactCanvasContentProps } from './IReactCanvasContentProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient} from '@microsoft/sp-http';

const ReactCanvasContent: React.FC<IReactCanvasContentProps> = (props) => {
  const {
    description,
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
    userDisplayName,
    siteUrl,
    spHttpClient    
  } = props;

  const [counter, setCounter] = useState<number>(0);
  const [evenOdd, setEvenOdd] = useState<string>('');  
  //const [siteLists, setSiteLists] = useState<string[]>([]);
  const [webPartTitle, setWebPartTitle] = useState('');
  const [grouptitle1, setGroupTitle1] = useState('');
  const [grouptitle2, setGroupTitle2] = useState('');
  const [grouptitle3, setGroupTitle3] = useState('');
  const [grouptitle4, setGroupTitle4] = useState('');
  const [grouptitle5, setGroupTitle5] = useState('');
  
  //componentDidMount
  /*
  useEffect(() => {
    console.log("componentDidMount called.");
    (async () => {
    const endpoint: string = `${siteUrl}/_api/web/lists?$select=Title&$filter=Hidden eq false&$orderby=Title&$top=10`;
    const rawResponse: SPHttpClientResponse = await spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
      setSiteLists(
        (await rawResponse.json()).value.map((list: { Title: string }) => {
          return list.Title;
        })
      );
    })();
  }, []);
  */

  useEffect(() => {
    console.log("componentDidMount called.");
    console.log("Fetching CanvasContent1 WebPartData Title.");
    (async () => {
      const endpoint = `${siteUrl}/_api/sitepages/pages(1)?$select=CanvasContent1&expand=CanvasContent1`;
      const rawResponse = await spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
      const jsonResponse = await rawResponse.json();
      const jsonCanvasContent = jsonResponse.CanvasContent1;
      const parseCanvasContent = JSON.parse(jsonCanvasContent);
      //const webpartData = canvasContent.webPartData;
      //console.log("canvascontent json",jsonCanvasContent);
      console.log("canvascontent parse",parseCanvasContent);
      //parseCanvasContent.forEach((item:any,index:number) => {
      //let index : number = 0;
      for(const item of parseCanvasContent){
        console.log("webPartData Title",item.webPartData.title);
        let itemTitle : string = item.webPartData.title;
        let itemGroup1 : string = item.webPartData.properties.Group1Title;
        let itemGroup2 : string = item.webPartData.properties.Group2Title;
        let itemGroup3 : string = item.webPartData.properties.Group3Title;
        let itemGroup4 : string = item.webPartData.properties.Group4Title;
        let itemGroup5 : string = item.webPartData.properties.Group5Title;

        if(item.webPartData.title === "Important Links"){
          setWebPartTitle(itemTitle);
          setGroupTitle1(itemGroup1);
          setGroupTitle2(itemGroup2);
          setGroupTitle3(itemGroup3);
          setGroupTitle4(itemGroup4);
          setGroupTitle5(itemGroup5);
          //break;          
        }
        //index++;
      }
      //})
    })();
  },[siteUrl,spHttpClient]);

  //componentDidUpdate
  useEffect(() => {
    console.log("componentDidUpdate called.");
    setEvenOdd((counter % 2 === 0) ? 'even' : 'odd');
  }, [counter]);

  //componentWillUnmount
  useEffect(() => {
    return () => {
      console.log("componentWillUnmount called.");
    };
  }, [counter]);  

  const onButtonClick = (): void => {
    setCounter(counter + 1);
  }

  return (
    <section className={`${styles.reactCanvasContent} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>{environmentMessage}</div>
        <div>Counter: <strong>{counter}</strong> is <strong>{evenOdd}</strong></div>
        <button onClick={() => onButtonClick()}>+</button>
        <div>siteURL : {escape(siteUrl)}</div>
        <div>Web part property value: <strong>{escape(description)}</strong></div>
      </div>
      <div>
        <h1>{webPartTitle}</h1>
        <h1>{grouptitle1}</h1>
        <h1>{grouptitle2}</h1>
        <h1>{grouptitle3}</h1>
        <h1>{grouptitle4}</h1>
        <h1>{grouptitle5}</h1>
      </div>        
    </section>
  );
}

export default ReactCanvasContent;

/*
    
      <div>
        <h3>Site Lists</h3>
        <ul>
          {
            siteLists.map((list: string) => (
              <li key={list}>{list}</li>
            ))
          }
        </ul>
      </div>
        <div>
          <h1>{webPartTitle}</h1>
        </div>
    
*/