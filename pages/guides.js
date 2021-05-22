import { useContext, useEffect, useState } from 'react';
import styles from '../styles/Guides.module.css';
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
      <h2>All Guides</h2>
      {!authReady && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
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
              marginBottom: '.5rem',
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
