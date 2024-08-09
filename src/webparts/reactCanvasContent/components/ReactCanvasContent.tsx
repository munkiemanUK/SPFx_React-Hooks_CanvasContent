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
  //const [webPartTitle, setWebPartTitle] = useState('');
  
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
      const canvasContent = jsonResponse.value[0].CanvasContent1;
      const webPartData = JSON.parse(canvasContent);
      const title = webPartData.Title;
      console.log("response json",jsonResponse,title);

      //setWebPartTitle(title);
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