import { useContext, useEffect, useState } from 'react';
import styles from '../styles/Guides.module.css';
import Image from 'next/image';

import AuthContext from '../stores/authContext';
export default function Guides() {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (authReady) {
      fetch(
        '/.netlify/functions/guides',
        user && {
          headers: {
            Authorization: 'Bearer ' + user.token.access_token,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error('You must be logged in');
          }
          return res.json();
        })
        .then((data) => {
          setGuides(data);
          setError(null);
        })
        .catch((e) => {
          setError(e.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);
  return (
    <div className={styles.guides}>
      <h2>Secrets...</h2>
      {!authReady && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {guides && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '100%',
              height: '300px',
              position: 'relative',
            }}
          >
            <Image src={'/cat.jpg'} objectFit="cover" layout="fill" />
          </div>
          <span>Now you know what that I mean</span>
        </div>
      )}
      {guides &&
        guides.map((item) => (
          <div
            key={item.title}
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              background: 'pink',
              padding: '.5rem',
              margin: '.5rem 0',
              borderRadius: '.3rem',
            }}
          >
            <div>{item.title}</div>
            <div>written by {item.author}</div>
          </div>
        ))}
    </div>
  );
}
